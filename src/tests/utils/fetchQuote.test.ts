import '../mocks/yahooFinance';
import { fetchQuote } from "../../utils/fetchQuote";

jest.mock('yahoo-finance');

beforeEach(() => {
  require('yahoo-finance');
});

test('fetchQuote', () => {
  fetchQuote('TSLA').then((quote) => {
    expect(quote.foo).toBe('bar');
  });
});