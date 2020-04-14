import * as vscode from 'vscode';

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

  vscode.window.showInformationMessage(`Watchlist Updated`);
});

function removeSymbolFromWatchlist(symbol: string) {
  const pathToJson = path.resolve(__dirname, '../watchlist.json');

  let data = fs.readFileSync(pathToJson);
  let watchlist = JSON.parse(data);

  console.log('symbol to delete to watchlist', symbol);
  const index = watchlist.indexOf(symbol);
  watchlist.splice(index, 1);

  let newWatchlist = JSON.stringify(watchlist);

  fs.writeFile(pathToJson, newWatchlist, (err: any) => {
    if (err) { throw err; }
    console.log('watchlist updated:', newWatchlist); 
  }); 
}

export default removeFromWatchlist;