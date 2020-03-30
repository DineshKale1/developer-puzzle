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
import { CHART_DATA } from '../mock/chart-data';

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

  constructor() {}

  ngOnInit() {
    this.chart = CHART_DATA;
  }
}
