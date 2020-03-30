import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SharedUiChartModule } from '../shared-ui-chart.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { CHART_DATA } from '../mock/chart-data';
import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedUiChartModule, GoogleChartsModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit - should set chart data', () => {
    component.data$ = of([]);
    component.ngOnInit();
    expect(component.chart).toEqual(CHART_DATA);
  });
});
