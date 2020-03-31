// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const _: any = require('lodash');
const yahooFinance: any = require('yahoo-finance');


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "stonks" is now active!');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.stonks', async () => {
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
		        vscode.window.showInformationMessage(`${_.toUpper(input)} $${quotes.price.regularMarketPrice}`);
			}
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
