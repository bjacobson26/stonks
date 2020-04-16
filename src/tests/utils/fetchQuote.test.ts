import { fetchQuote } from "../../utils/fetchQuote";

jest.mock('yahoo-finance');

beforeEach(() => {
  require('yahoo-finance');
});

test('fetchQuote returns quote pr data', async () => {
  const quote = await fetchQuote('TSLA');
  expect(quote.price.regularMarketPrice).toBe(123);
});