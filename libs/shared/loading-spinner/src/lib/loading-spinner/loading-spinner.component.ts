import { Component, Input } from '@angular/core';

@Component({
  selector: 'srm-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {

  @Input() spinnerText = '';
	@Input() textLocation = 'below';
	@Input() centerSpinner = true;
	@Input() smallerSpinner = false;
}
