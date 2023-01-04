import generateUid from './generateUid';

const makePerfectId = (...args: string[]) =>
  [...args, generateUid(5)].join('-');

export default makePerfectId;
