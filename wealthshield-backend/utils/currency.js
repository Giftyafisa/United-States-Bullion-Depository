const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"];

const SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "CA$",
  AUD: "A$"
};

const LABELS = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar"
};

const isCurrency = (value) => CURRENCIES.includes(value);

const symbolFor = (code) => SYMBOLS[code] || "$";

const formatMoney = (amount, code) => `${symbolFor(code)}${(Number(amount) || 0).toLocaleString()}`;

module.exports = {
  CURRENCIES,
  SYMBOLS,
  LABELS,
  isCurrency,
  symbolFor,
  formatMoney
};
