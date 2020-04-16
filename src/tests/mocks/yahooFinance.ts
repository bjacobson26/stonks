const yahooFinance: any = jest.genMockFromModule('yahoo-finance');

function quote() {
  return new Promise((resolve, reject) => {
    resolve({ foo: 'bar'});
  });
}

yahooFinance.quote = quote;

module.exports = yahooFinance;