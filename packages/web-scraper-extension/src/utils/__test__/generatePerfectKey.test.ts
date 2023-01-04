import generatePerfectKey from '../generatePerfectKey';

test('Unit test of generatePerfectKey function', () => {
  const obj = {
    name: 'easy-scraper',
    type: 'scraper'
  };

  expect(generatePerfectKey(obj, 'name')).toBe('name__2');
  expect(generatePerfectKey(obj, 'type')).toBe('type__2');
});
