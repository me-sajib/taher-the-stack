import generateUid from './generateUid';

interface ReturnType<T> {
  id: string;
  key: string;
  value: T;
}

const objectToArray = (
  obj: any
): ReturnType<any>[] =>
  Object.entries(obj).map(
    ([key, value]) => ({
      id: generateUid(),
      key: key,
      value: value
    })
  );

export default objectToArray;
