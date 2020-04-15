import * as vscode from 'vscode';
const _: any = require('lodash');
import { Stock } from './Stock';
import { fetchQuote } from './utils/fetchQuote';
import { displayQuote } from './utils/displayQuote';
import { promises as fs } from 'fs';

const path = require('path');

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
    const pathToJson = path.resolve(__dirname, '../watchlist.json');  
    const data = await fs.readFile(pathToJson, 'binary');
    let watchlist = JSON.parse(data);

    let results: Stock[];
    results = await Promise.all(
      watchlist.map(async (symbol: any): Promise<Stock> => {
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

  private _onDidChangeTreeData: vscode.EventEmitter<Stock | undefined> = new vscode.EventEmitter<Stock | undefined>();
  readonly onDidChangeTreeData: vscode.Event<Stock | undefined> = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
    vscode.window.showInformationMessage('Stonk watchlist updated');
  }
}
