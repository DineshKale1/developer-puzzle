import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { STOCK_CONSTANT, STOCK_LABELS } from '../constant/stock.constant';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  public timePeriods = STOCK_CONSTANT.timePeriods;
  public stockLabels = STOCK_LABELS;
  public subscription: Subscription;

  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.subscription = this.stockPickerForm.valueChanges.pipe(takeWhile(() => true)).
    subscribe(() => {
      this.fetchQuote();
    });
  }

  /*
  * Method to get the stock quote details
  */
  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }

  /*
  * Method to unsubscribe the references
  */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
