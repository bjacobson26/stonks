// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { WatchlistProvider } from './WatchlistProvider';
import getQuote from './getQuote';
import addToWatchlist from './AddToWatchlist';
import removeFromWatchlist from './RemoveFromWatchlist';

export const watchlistProvider = new WatchlistProvider();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.window.registerTreeDataProvider('stonks-watchlist', watchlistProvider);
	vscode.commands.registerCommand('stonks-watchlist.refreshWatchlist', () => watchlistProvider.refresh());

	context.subscriptions.push(getQuote, addToWatchlist, removeFromWatchlist);
}

// this method is called when your extension is deactivated
export function deactivate() {}
