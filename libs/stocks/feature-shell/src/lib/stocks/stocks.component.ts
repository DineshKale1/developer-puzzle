import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { STOCK_CONSTANT } from '../constant/stock.constant';
import { EStockLabels } from '../enum/stock-labels.enum';
import { EStocksPeriods } from '../enum/stocks-periods-enums';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  public isActive: boolean = true;
  public timePeriods = STOCK_CONSTANT.timePeriods;
  public stockLabels = EStockLabels;
  public stockPeriods = EStocksPeriods;
  public quotes$: Observable<(string | number)[][]>;


  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.quotes$ = this.priceQuery.priceQueries$;
  }

  /*
  * Name: updateDate
  * Desc: Method to change the toDate same as fromDate if toDate is less than fromDate 
  * Return: void
  */
  public updateDate(): void {
    if( this.stockPickerForm.value.fromDate !== null && this.stockPickerForm.value.toDate !== null &&
      this.stockPickerForm.value.fromDate.getTime() > this.stockPickerForm.value.toDate.getTime()){
      this.stockPickerForm.value.toDate = this.stockPickerForm.value.fromDate;
      this.stockPickerForm.controls.toDate.setValue(this.stockPickerForm.value.fromDate);
    }
  }

  /*
  * Name: fetchQuote
  * Desc: get the quote details
  * ReturnType: Void  
  */
  fetchQuote(): void {
    if (this.stockPickerForm.valid) {
      const { symbol, fromDate, toDate } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, EStocksPeriods.ALL_AVAILABLE_DATA);
      this.priceQuery.fetchFilterQuoteByDate(
        this.stockPickerForm.value.fromDate, this.stockPickerForm.value.toDate
      );
    }
  }
}
