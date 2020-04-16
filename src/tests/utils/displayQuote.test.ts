import { displayQuote } from "../../utils/displayQuote"

test('displayQuote', () => {
  const quote = {
    price: {
      regularMarketPrice: 200,
      regularMarketChangePercent: 0.1
    }
  };

  expect(displayQuote(quote)).toBe('$200 (10.00%)');
});