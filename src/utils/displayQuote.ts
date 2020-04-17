const _: any = require('lodash');

export function displayQuote(quote: any) {
  let percentChange = (quote.price.regularMarketChangePercent * 100).toFixed(2);
  return `$${quote.price.regularMarketPrice} (${percentChange}%)`;
}