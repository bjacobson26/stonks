import * as vscode from 'vscode';
const _: any = require('lodash');
import { Stock } from './Stock';
import { fetchQuote } from './utils/fetchQuote';
import { displayQuote } from './utils/displayQuote';

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
    let watchlist = ['MSFT', 'TSLA', 'AAPL'];
  
    let results = await Promise.all(
      watchlist.map(async (symbol): Promise<Stock> => {
        return fetchQuote(symbol).then((quote) => {
          return new Stock(symbol, displayQuote(quote));
        }).catch((err) => {
          console.log(err);
          return new Stock(symbol, 'unable to fetch quote');
        });
      }
    ));
    
    return results;
  }
}
