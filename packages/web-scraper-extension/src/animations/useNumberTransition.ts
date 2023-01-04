import { useSpring } from '@react-spring/web';

const useNumberTransition = (
  recent: number,
  prevResult: React.MutableRefObject<number>
) => {
  const { number } = useSpring({
    from: {
      number: prevResult.current
    },
    config: {
      mass: 10.1,
      frequency: 2,
      duration: 250
    },
    number: recent,
    onRest: () => {
      prevResult.current = recent;
    }
  });

  return number;
};

export default useNumberTransition;
