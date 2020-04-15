import * as vscode from 'vscode';
import { watch } from 'fs';
import { watchlistProvider } from './extension';

const _: any = require('lodash');
const fs = require('fs');
const path = require('path');

let removeFromWatchlist = vscode.commands.registerCommand('extension.stonksRemoveFromWatchlist', async () => {
  // The code you place here will be executed every time your command is executed
  let options: vscode.InputBoxOptions = {
    prompt: "Enter a stock ticker"
  };
  
  const input: any =  await vscode.window.showInputBox(options);
  removeSymbolFromWatchlist(_.toUpper(input));
});

function removeSymbolFromWatchlist(symbol: string) {
  const pathToJson = path.resolve(__dirname, '../watchlist.json');

  let data = fs.readFileSync(pathToJson);
  let watchlist = JSON.parse(data);

  const index = watchlist.indexOf(symbol);
  watchlist.splice(index, 1);

  let newWatchlist = JSON.stringify(watchlist);

  fs.writeFile(pathToJson, newWatchlist, (err: any) => {
    if (err) { throw err; }
    watchlistProvider.refresh();
  }); 
}

export default removeFromWatchlist;