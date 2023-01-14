import makeSafeId from '../makeSafeId';

test('Unit test of the makeSafeId function', () => {
  expect(makeSafeId('#343656566')).toBe('[id="343656566"]');
  expect(makeSafeId('#34fdfsfg45')).toBe('[id="34fdfsfg45"]');
});
