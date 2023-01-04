import generateUid from '../generateUid';

test('Unit testing of generateUid function', () => {
  expect(generateUid().length).toBe(8);
  expect(generateUid(7).length).toBe(7);
  expect(generateUid(6).length).toBe(6);
  expect(generateUid(5).length).toBe(5);
  expect(generateUid(4).length).toBe(4);
});
