import { EXTENSION_TAG_NAME } from '../../global';
import isExtensionTagName from '../isExtensionTagName';

test('Unit test of isExtensionTagName', () => {
  expect(
    isExtensionTagName(
      EXTENSION_TAG_NAME
    )
  ).toBe(true);
  expect(
    isExtensionTagName(
      'I am not a extension'
    )
  ).toBe(false);
});
