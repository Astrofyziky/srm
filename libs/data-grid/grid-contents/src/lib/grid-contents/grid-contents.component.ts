import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '@srm/shared/alert-dialog';

import { EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '@srm/data-grid/api-service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IFAEntity } from '../entities/ifa.entity';
import { PaginationShowList } from '../entities/pagination-show-list.entity';
import { Pagination } from '../entities/pagination.entity';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSelectionList } from '@angular/material/list';
import { IfaFilter } from '../entities/ifa-filter.entity';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'srm-grid-contents',
  templateUrl: './grid-contents.component.html',
  styleUrls: ['./grid-contents.component.scss']
})
export class GridContentsComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort | null = null;
  
  public importingData = true;
  public ifaData: Array<IFAEntity> = [];
  public ifaDetails: MatTableDataSource<IFAEntity> = new MatTableDataSource<IFAEntity>();
  public ifaCopiedDetails: MatTableDataSource<IFAEntity> = new MatTableDataSource<IFAEntity>();
  public tableHeaders: Array<string> = [
    'firstName',
    'lastName',
    'phone',
    'address',
    'state',
    'zip'
  ];

  public peopleList: Array<string> = [];
  public phoneList: Array<string> = [];
  public stateList: Array<string> = [];

  @ViewChild('peopleType', { static: true }) selectedPeople: MatSelectionList | undefined;
  @ViewChild('stateType', { static: true }) selectedStateType: MatSelectionList | undefined;
  @ViewChild('phoneType', { static: true }) selectedPhones: MatSelectionList | undefined;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null = null;

  currentPageSelected = 1;
  public pageList: Array<Pagination> = [];
  public showList: Array<PaginationShowList> = [];
  public defaultPageSize = 50;
  public pageSizeOptions: number[] = [50, 100, 150, 200];
  public totalDisplayedElements = 0;
  public totalRenderedElements = 0;

  public peopleFilter=new FormControl();
  public phoneFilter=new FormControl();
  public stateFilter=new FormControl();
  @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion = new MatAccordion();
  populateFilters = new EventEmitter(true);  

  constructor(public dialog: MatDialog,
    private service: ApiServiceService) { 
      
    }


  public openDialog(): void {
    this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: {
        Header: 'Hello',
        Message: 'I am a dialog being opened with Webpack',
        ConfirmButtonText: 'Okay'
      }
    });
  }

  
  ngOnInit(): void {
    this.pullIfaData();

    this.populateFilters.subscribe((e: string) => {
      console.log(e);
      this.populateAllFilters();
    })
  }


  public pullIfaData(): void {
    this.service.GetSampleData('').subscribe((x: Array<IFAEntity>) => {      
      
      this.ifaData = x;
      this.ifaDetails = new MatTableDataSource(this.ifaData);
      this.ifaCopiedDetails = new MatTableDataSource(x);

      this.ifaDetails.sort = this.sort;
      this.ifaDetails.paginator = this.paginator;
      this.totalDisplayedElements = this.ifaDetails.filteredData.length;

      this.ifaDetails.filterPredicate = this.createFilter();
      this.ConstructShowList();
      this.ConstructPagination();

      console.log('data rendered');

      this.importingData = false;
      //this.populateFilters.emit('');
      this.populateAllFilters();
    }, (e: any) => {
      this.importingData = false;
      console.log(e);
    }
    , () => {
      console.log('finally hit');
    });
  }


  populateAllFilters(): void {
    console.log('started');
      this.getFirstNames();
      console.log('getFirstNames');

      this.getPhoneList();
      console.log('getPhoneList');

      this.getStateTypeList();
      console.log('getState');
  }


  public ChangeItemsToShow(item: PaginationShowList): void {
    const a = this.showList.find(x => x.isSelected)
    if (a !== undefined) {
      a.isSelected = false;
    }
    
    const b = this.showList.find(x => x == item);
    if(b !== undefined) {
      b.isSelected = true;
    }

    this.ConstructPagination();
    
    if(this.ifaDetails.paginator !== null) {
    this.ifaDetails.paginator.pageSize = item.showNumber == 'All' ? this.ifaDetails.filteredData.length : +item.showNumber;
    this.ifaDetails.paginator._changePageSize(this.ifaDetails.paginator.pageSize);
    
    if(this.currentPageSelected > this.ifaDetails.paginator.getNumberOfPages()) {
      this.ifaDetails._updatePaginator(this.ifaDetails.filteredData.length);
    }

    this.currentPageSelected = this.ifaDetails.paginator.pageIndex + 1;
  }
  }

  public PageLists(): Array<Pagination> {
    return this.pageList.filter(x => {
      if(this.pageList.length < 50)
        return true;

      if(this.currentPageSelected < 7)
        return x.number < 11;

      const upperPages: Array<Pagination> = this.pageList.filter(y =>
        y.number > this.currentPageSelected &&
        y.number < this.currentPageSelected + 5);

      const lowerPages: Array<Pagination> = this.pageList.filter(y =>
        y.number < this.currentPageSelected &&
        y.number > this.currentPageSelected - (6 + (4 - upperPages.length)));

      return x.number == this.currentPageSelected ||
        upperPages.includes(x) ||
        lowerPages.includes(x);
    });
  }

  public ConstructPagination(): void {
    this.pageList = [];
    const list = this.showList.find(x => x.showNumber == 'All');

    if (list !== undefined && list.isSelected) {
      this.pageList = [{number: 1, isSelected: true}];
      return;
    }

    const selectedIndex = this.showList.find(x => x.isSelected);
    if(selectedIndex !== undefined) {
      const numberPage = Math.ceil((this.ifaDetails.filteredData.length / +selectedIndex.showNumber));
    
    
      for (let i = 0; i < numberPage; i++) {
        this.pageList.push({ number: i + 1, isSelected: false })

        if (this.currentPageSelected === (i + 1)) {
            this.pageList[this.pageList.length - 1].isSelected = true;
        }
      }
    }
  }




  public ConstructShowList(): void {
    this.showList = [];

    if(this.ifaDetails.filteredData.length > 50) {
      this.showList.push({showNumber: '50', isSelected: true});
    }

    if(this.ifaDetails.filteredData.length > 100) {
      // this.showList.find(x => x.showNumber == '50').isSelected = false;
      // this.showList.push({showNumber: '100', isSelected: true});
      
      this.showList.push({showNumber: '100', isSelected: false});
    }

    if(this.ifaDetails.filteredData.length > 150) {
      this.showList.push({showNumber: '150', isSelected: false});
    }

    const selected = this.showList.length == 0 || (this.showList.length > 0 && this.ifaDetails.filteredData.length < 100);

    this.showList.push({
      showNumber: 'All', 
      isSelected: selected
    });

    // if(selected && this.showList.find(x => x.showNumber == '50')) {
    //   this.showList.find(x => x.showNumber == '50').isSelected = false;
    // }

  }

  public NextPage(): void {
    if(this.ifaDetails.paginator !== null) {
      this.ifaDetails.paginator.nextPage();
      this.currentPageSelected = this.ifaDetails.paginator.pageIndex + 1;
    }
  }

  public PreviousPage(): void {
    if(this.ifaDetails.paginator !== null) {
    this.ifaDetails.paginator.previousPage();
    this.currentPageSelected = this.ifaDetails.paginator.pageIndex + 1;
    }
  }

  
  public SetPage(pageNumber: number): void {
    if(pageNumber > this.currentPageSelected) {
      for(let i = this.currentPageSelected; i < pageNumber; i++) {
        if(this.ifaDetails.paginator !== null) {
          this.ifaDetails.paginator.nextPage();
        }
      }
    } else {
      for(let i = this.currentPageSelected; i > pageNumber; i--) {
        if(this.ifaDetails.paginator !== null) {
          this.ifaDetails.paginator.previousPage();
        }
      }
    }

    this.currentPageSelected = pageNumber
  }


  async getFirstNames() : Promise<void> {
    this.peopleList =  this.ifaCopiedDetails.data
      .sort((x,y) => x.firstName.localeCompare(y.firstName))
      .map(item => item.firstName)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  async getStateTypeList() : Promise<void> {
    this.stateList =  this.ifaCopiedDetails.data
    .sort((x,y) => x.state.localeCompare(y.state))
    .map(item => item.state)
    .filter((value, index, self) => self.indexOf(value) === index);
  }


  async getPhoneList(): Promise<void> {
    this.phoneList =  this.ifaCopiedDetails.data
    .sort((x,y) => x.phone.localeCompare(y.phone))
    .map(item => item.phone)
    .filter((value, index, self) => self.indexOf(value) === index);
  }


  public filterByAdvisor(c: MatSelectChange): void {
    if(!c || c.value.length == 0) {
      this.ifaDetails.filter = "";
    } else {
      
      const v = JSON.stringify(c.value);

      
      this.ifaDetails.filter = v;
        
    }

    this.totalDisplayedElements = this.ifaDetails.filteredData.length;

    if (this.ifaDetails.paginator) {
      this.ConstructShowList();
      this.ConstructPagination();
      this.ifaDetails.paginator.firstPage();
    }
  }


  public filterResults(): void {

    const aL = this.peopleFilter.value === null ? 0 : this.peopleFilter.value.length;
    const uL = this.phoneFilter.value === null ? 0: this.phoneFilter.value.length;
    const icL = this.stateFilter.value === null ? 0 : this.stateFilter.value.length;

    //var max = Math.max(aL, uL, icL);
    const f: IfaFilter = {
      firstName: [],
      lastName: [],
      phone: [],
      address: [],
      state: [],
      zip: []
    };

    for(let i = 0; i < aL; i++) {
      f.firstName.push(this.peopleFilter.value[i]);
    }

    for(let i = 0; i < uL; i++) {
      f.phone.push(this.phoneFilter.value[i]);
    }

    for(let i = 0; i < icL; i++) {
      f.state.push(this.stateFilter.value[i]);
    }

    const filter = JSON.stringify(f);
    const searchTerms: IfaFilter = JSON.parse(filter);

    this.ifaDetails.filter = filter;

    this.totalDisplayedElements = this.ifaDetails.filteredData.length;

    if (this.ifaDetails.paginator) {
      this.ConstructShowList();
      this.ConstructPagination();
      this.ifaDetails.paginator.firstPage();
    }
  }

  createFilter() {
    const filterFunction = function (data: IFAEntity, filter: string): boolean {
      const searchTerms: IfaFilter = JSON.parse(filter);

      //console.log(searchTerms);


      const nameSearch = () => {
        let found = false;
          //for (const col in searchTerms) {

          searchTerms.firstName.forEach(x => {
            if(!x || x == null || x === '') {
              found = true;
            } else if (data.firstName == x) {
              found = true
            }
          });

          if(searchTerms.firstName.length === 0) {
            found = true;
          }

          if(!found) {
            return false;
          }

          searchTerms.phone.forEach(x => {
            if(!x || x == null || x === '') {
              found = found && true;
            } else if (data.phone == x) {
              found = found && true;
            } else {
              found = false;
            }
          });

          if(searchTerms.phone.length === 0) {
            found = found && true;
          }

          if(!found) {
            return false;
          }

          if(searchTerms.state.length === 0) {
            found = found && true;
          }

          searchTerms.state.forEach(x => {
            if(!x || x == null || x === '') {
              found = found && true;
            } else if (data.state == x) {
              found = found && true;
            } else {
              found = false;
            }
          });
          return found;
      }
      return nameSearch()
    }
    return filterFunction
  }

  public fireOpenEvent(): void {
    console.log('opened');
    this.accordion?.openAll();
  }
}
