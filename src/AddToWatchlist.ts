import * as vscode from 'vscode';
import { fetchQuote } from './utils/fetchQuote';
const _: any = require('lodash');
const fs = require('fs');
const path = require('path');

let addToWatchlist = vscode.commands.registerCommand('extension.stonksAddToWatchlist', async () => {
  // The code you place here will be executed every time your command is executed
  let options: vscode.InputBoxOptions = {
    prompt: "Enter a stock ticker"
  };
  
  const input: any =  await vscode.window.showInputBox(options);

  // fetch quote to validate it's a a fetchable stock
  fetchQuote(input).then(quote => {
    addSymbolToWatchlist(quote.price.symbol);
    vscode.window.showInformationMessage(`${quote.price.symbol} added to watchlist`);
  }).catch((err) => {
    vscode.window.showErrorMessage('Invalid stonk. Please try again.');
  });
});

function addSymbolToWatchlist(symbol: string) {
  const pathToJson = path.resolve(__dirname, '../watchlist.json');

  let data = fs.readFileSync(pathToJson);
  let watchlist = JSON.parse(data);

  console.log('symbol to add to watchlist', symbol);
  watchlist.push(symbol)
  let sortedUniqStonks = _.sortedUniq(watchlist);
  let newWatchlist = JSON.stringify(sortedUniqStonks);

  fs.writeFile(pathToJson, newWatchlist, (err: any) => {
    if (err) { throw err; }
    console.log('watchlist updated:', newWatchlist); 
  }); 
}

export default addToWatchlist;