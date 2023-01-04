import hexToHsl from '../hexToHsl';

test('Unit testing of hexToHsl function', () => {
  expect(hexToHsl('#828282')).toEqual({
    h: 0,
    s: 0,
    l: 51
  });
  expect(hexToHsl('#8b0fe9')).toEqual({
    h: 274,
    s: 88,
    l: 49
  });
  expect(hexToHsl('#cdc3d5')).toEqual({
    h: 273,
    s: 18,
    l: 80
  });
});
