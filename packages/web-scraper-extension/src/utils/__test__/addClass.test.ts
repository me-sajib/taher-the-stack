import addClass from '../addClass';

test('Unit test of the addClass function', () => {
  expect(
    addClass('easy', '', 'scraper')
  ).toBe('easy scraper');
  expect(
    addClass('easy', 'web', 'scraper')
  ).toBe('easy web scraper');
});
