import '../mocks/yahooFinance';
import { fetchQuote, yahooFinance } from "../../utils/fetchQuote";

jest.mock('yahoo-finance');

beforeEach(() => {
  require('yahoo-finance');
});

test('fetchQuote', () => {
  fetchQuote('TSLA');
  expect(yahooFinance).toBeCalledTimes(1);  
});