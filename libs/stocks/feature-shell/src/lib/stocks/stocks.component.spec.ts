import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StocksFeatureShellModule } from '../stocks-feature-shell.module';
import { PriceQueryFacade } from '../../../../data-access-price-query/src';
import { StocksComponent } from './stocks.component';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let priceQuery: PriceQueryFacade;
  let toDate = new Date();
  let fromDate = new Date(toDate);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StocksFeatureShellModule, StoreModule.forRoot({})],
      providers: [ PriceQueryFacade, { provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.debugElement.componentInstance;
    priceQuery = fixture.debugElement.injector.get(PriceQueryFacade);
  });

  describe('StocksComponent', () => {
    beforeEach(() => {
      fromDate.setMonth(fromDate.getMonth() - 1);
      component.stockPickerForm = formBuilder.group({
        symbol: ['AAPL', Validators.required],
        fromDate: [fromDate, Validators.required],
        toDate: [toDate, Validators.required]
      });
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('Should set quote details', () => {
      component.ngOnInit();
      expect(component.quotes$).toBeDefined();
    });
    it('Should update the date if toDate is < fromDate', () => {
      spyOn(component, 'updateDate');
      (component as any).updateDate();
      expect(component.updateDate).toHaveBeenCalled();
    });
    it('should invoke fetchQuote of priceQuery', async(() => {
      spyOn(priceQuery, 'fetchQuote');
      spyOn(priceQuery, 'fetchFilterQuoteByDate');
      (component as any).fetchQuote();
      expect(priceQuery.fetchQuote).toHaveBeenCalledTimes(1);
      expect(priceQuery.fetchFilterQuoteByDate).toHaveBeenCalledTimes(1);
    }));
    it('should not invoke fetchQuote of priceQuery if form is invalid', async(() => {
      component.stockPickerForm = formBuilder.group({
        symbol: [null, Validators.required],
        fromDate: [null, Validators.required],
        toDate: [null, Validators.required]
      });
      spyOn(priceQuery, 'fetchQuote');
      (component as any).fetchQuote();
      expect(priceQuery.fetchQuote).not.toHaveBeenCalled();
    }));
  });
});
