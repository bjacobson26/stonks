import * as vscode from 'vscode';
const yahooFinance: any = require('yahoo-finance');
const _: any = require('lodash');

let getQuote = vscode.commands.registerCommand('extension.stonksGetQuote', async () => {
  // The code you place here will be executed every time your command is executed
  let options: vscode.InputBoxOptions = {
    prompt: "Enter a stock ticker"
  };
  
  const input: any =  await vscode.window.showInputBox(options);

  yahooFinance.quote({
    symbol: input,
    modules: ['price']
  }, (err: any, quotes: any) => {
    if(err) {
      vscode.window.showErrorMessage(`Could not retrieve price for ${input}`);
    } else {
      let percentChange = (quotes.price.regularMarketChangePercent * 100).toFixed(2);
      vscode.window.showInformationMessage(`${_.toUpper(input)} $${quotes.price.regularMarketPrice} (${percentChange}%)`);
    }
  });
});

export default getQuote;