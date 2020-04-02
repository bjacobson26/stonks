// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const _: any = require('lodash');
const yahooFinance: any = require('yahoo-finance');


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
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
				vscode.window.showInformationMessage(`Could not retrieve price for ${input}`);
			} else {
				let percentChange = (quotes.price.regularMarketChangePercent * 100).toFixed(2);
		        vscode.window.showInformationMessage(`${_.toUpper(input)} $${quotes.price.regularMarketPrice} (${percentChange}%)`);
			}
		});
	});

	context.subscriptions.push(getQuote);
}

// this method is called when your extension is deactivated
export function deactivate() {}
