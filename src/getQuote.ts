import * as vscode from 'vscode';
import { fetchQuote } from './utils/fetchQuote';
import { displayQuote } from './utils/displayQuote';
const _: any = require('lodash');

let getQuote = vscode.commands.registerCommand('extension.stonksGetQuote', async () => {
  // The code you place here will be executed every time your command is executed
  let options: vscode.InputBoxOptions = {
    prompt: "Enter a stock ticker"
  };
  
  const input: any =  await vscode.window.showInputBox(options);
  return fetchQuote(input).then((quote) => {
      vscode.window.showInformationMessage(`${_.toUpper(input)} ${displayQuote(quote)}`)
    }).catch((err: any) => {
      console.log(err);
      vscode.window.showErrorMessage(`Could not retrieve quote for ${input}`);
    });
});

export default getQuote;