import * as vscode from 'vscode';
import path = require("path");
import fs = require('fs');

const ViewStonkDetails = vscode.commands.registerCommand('extension.stonksViewStonkDetails', async (stonkTicker?: string) => {
  const panel = vscode.window.createWebviewPanel(
    'stonk_details', // Identifies the type of the webview. Used internally
    stonkTicker || "Stonks", // Title of the panel displayed to the user 
    vscode.ViewColumn.One, // Editor column to show the new webview panel in.
    {
      enableScripts: true
    } 
  );

  panel.webview.html = getWebviewContent(stonkTicker || "AAPL");
});

function getDashboardTemplate(): string {
  return path.join(__dirname, "../templates/stonk_details.html");
}

const fillTemplate = function (templateString: string, templateVars: any) {
  return new Function("return `" + templateString + "`;").call(templateVars);
};

function getWebviewContent(symbol: string) {
  const templateString = fs.readFileSync(getDashboardTemplate()).toString();
  const chartSrc = `http://api.stockdio.com/visualization/financial/charts/v1/HistoricalPrices?app-key=49717C2B4CA142C19E18BF7935DEF3C7&symbol=${symbol}&days=365&width=800&height=420`
  const newsSrc = `https://api.stockdio.com/visualization/financial/charts/v1/News?app-key=49717C2B4CA142C19E18BF7935DEF3C7&symbol=${symbol}&imageWidth=200&palette=Financial-Light&title=News&onload=st_a179a6a0cede41a3928cac241f5d9204`
  const templateVars = { symbol, chartSrc, newsSrc };
  const html = fillTemplate(templateString, templateVars);
  return html
}

export default ViewStonkDetails;