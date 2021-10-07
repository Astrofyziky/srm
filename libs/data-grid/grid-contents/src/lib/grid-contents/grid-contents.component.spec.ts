import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridContentsComponent } from './grid-contents.component';

describe('GridContentsComponent', () => {
  let component: GridContentsComponent;
  let fixture: ComponentFixture<GridContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridContentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
