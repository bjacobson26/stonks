import * as vscode from 'vscode';
const yahooFinance: any = require('yahoo-finance');
const _: any = require('lodash');

export class WatchlistProvider implements vscode.TreeDataProvider<Stock> {
  getTreeItem(element: Stock): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Stock): Thenable<Stock[]> {
    return Promise.resolve(
      this.getStocks()
    );
  }

  private async getStocks(): Promise<Stock[]> {
    let symbol = 'TSLA';

    let quote = await yahooFinance.quote({
      symbol: symbol,
      modules: ['price']
    });

    let percentChange = (quote.price.regularMarketChangePercent * 100).toFixed(2);
    let quoteString = `$${quote.price.regularMarketPrice} (${percentChange}%)`;
    let stock = new Stock(symbol, quoteString);

    return [stock];
  }
}
class Stock extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly quote: string
  ) {
    super(label);
  }

  get tooltip(): string {
    return `${this.label}`;
  }

  get description(): string {
    return `${this.quote}`;
  }
}