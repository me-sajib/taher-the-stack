import { EXTENSION_TAG_NAME } from '../global';

const isExtensionTagName = (
  name: string
): boolean =>
  EXTENSION_TAG_NAME === name;

export default isExtensionTagName;
