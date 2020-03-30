import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, Validators } from '@angular/forms';
import { StocksFeatureShellModule } from '../../../../../stocks/feature-shell/src/lib/stocks-feature-shell.module';
import { PriceQueryFacade } from '../../../../data-access-price-query/src';
import { StocksComponent } from './stocks.component';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let priceQuery: PriceQueryFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StocksFeatureShellModule, BrowserAnimationsModule, StoreModule.forRoot({})],
      providers: [ PriceQueryFacade, { provide: FormBuilder, useValue: formBuilder } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.debugElement.componentInstance;
    priceQuery = fixture.debugElement.injector.get(PriceQueryFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('StocksComponent', () => {
    beforeEach(() => {
      component.stockPickerForm = formBuilder.group({
        symbol: ['AAPL', Validators.required],
        period: ['One Month', Validators.required]
      });
    });
    it('should invoke ngOnInit', async(() => {
      spyOn(priceQuery, 'fetchQuote');
      component.ngOnInit();
      (component as any).fetchQuote();
      expect(priceQuery.fetchQuote).toHaveBeenCalled();
    }));
    it('should invoke fetchQuote of priceQuery', async(() => {
      spyOn(priceQuery, 'fetchQuote');
      (component as any).fetchQuote();
      expect(priceQuery.fetchQuote).toHaveBeenCalledTimes(1);
    }));
    it('should not invoke fetchQuote of priceQuery if form is invalid', async(() => {
      component.stockPickerForm = formBuilder.group({
        symbol: [null, Validators.required],
        period: [null, Validators.required]
      });
      spyOn(priceQuery, 'fetchQuote');
      (component as any).fetchQuote();
      expect(priceQuery.fetchQuote).not.toHaveBeenCalled();
    }));
  });
});
