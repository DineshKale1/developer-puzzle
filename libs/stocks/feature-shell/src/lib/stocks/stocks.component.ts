import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Subscription } from 'rxjs';
import { STOCK_CONSTANT } from '../constant/stock.constant';
import { StockLabels } from '../enum/stock-labels.enum';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  public subscription: Subscription;
  public timePeriods = STOCK_CONSTANT.timePeriods;
  public stockLabels = StockLabels;

  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.subscription = this.stockPickerForm.valueChanges.pipe().
    subscribe(() => {
      this.fetchQuote();
    });
  }

  /**
   * Name: fetchQuote
   * Desc: get the quote details
   * ReturnType: void
   */
  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
