export const yahooFinance: any = require('yahoo-finance');

export async function fetchQuote(symbol: string) {
  let resp = await yahooFinance.quote({
    symbol: symbol,
    modules: ['price']
  });

  return resp;
}