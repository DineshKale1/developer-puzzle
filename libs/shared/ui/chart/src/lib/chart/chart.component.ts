import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { IChart } from '../interfaces/chart.interface';
import { CHART_DATA_MOCK } from '../mock/chart-data-mock';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data$: Observable<(string | number)[][]>;
  chartData: any;
  public subscription : Subscription;
  public chart: IChart;

  ngOnInit() {
    this.chart = CHART_DATA_MOCK;
  }
}
