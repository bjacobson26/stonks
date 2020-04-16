import { fetchQuote } from "../../utils/fetchQuote";

jest.mock('yahoo-finance');

beforeEach(() => {
  require('yahoo-finance');
});

test('fetchQuote returns quote price data', async () => {
  const quote = await fetchQuote('TSLA');
  expect(quote.price.regularMarketPrice).toBe(123);
});