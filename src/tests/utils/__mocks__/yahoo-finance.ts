const yahooFinance: any = jest.genMockFromModule('yahoo-finance');

export function quote() {
  return new Promise((resolve) => {
    resolve({ price: { regularMarketPrice: 123 } });
  });
};

yahooFinance.quote = quote;

module.exports = yahooFinance;