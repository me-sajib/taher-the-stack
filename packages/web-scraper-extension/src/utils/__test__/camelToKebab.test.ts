import camelToKebabCase from '../camelToKebab';

test('Unit test of the camelToKebabCase function', () => {
  expect(
    camelToKebabCase('easyScraper')
  ).toBe('easy-scraper');
  expect(
    camelToKebabCase('easyWebScraper')
  ).toBe('easy-web-scraper');
});
