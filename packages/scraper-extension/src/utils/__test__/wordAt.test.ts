import wordAt from '../wordAt';

test('Unit test of wordAt function', () => {
  expect(wordAt('Hello, World')).toBe('Hello');
  expect(wordAt('Hello, World', -1)).toBe('World');
  expect(wordAt('JSON preview')).toBe('JSON');
  expect(wordAt('table preview')).toBe('table');
});
