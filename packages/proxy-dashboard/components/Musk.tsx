interface MuskType {
  by?: string;
  children: string;
}

const Musk = ({ by = '*', children }: MuskType) => (
  <div>{by.repeat(children.length)}</div>
);

export default Musk;
