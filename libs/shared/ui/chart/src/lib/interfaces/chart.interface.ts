import { IChartOptions } from './chart-options.interface';

/**
 * chart interface
 */
export interface IChart {
    title: string,
    type: string,
    data: any[],
    columnNames: string[],
    options: IChartOptions
}
