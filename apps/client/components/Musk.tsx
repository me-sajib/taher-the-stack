import { useState } from 'react';

interface MuskType {
  by?: string;
  delay?: number;
  children: string;
}

export default function Musk({ by = '*', delay = 5e3, children }: MuskType) {
  const [isWear, setMusk] = useState(true);

  const muskHandler = () => {
    if (isWear) {
      setMusk(false);

      setTimeout(() => setMusk(true), delay);
    }
  };

  return (
    <div onClick={muskHandler}>
      {isWear ? by.repeat(children.length) : children}
    </div>
  );
}
