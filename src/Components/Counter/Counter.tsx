import React from "react";
import { useIsVisible } from "react-is-visible";

const Counter = ({
  start = 0,
  end,
  interval = 500,
}: {
  start: number;
  end: number;
  interval: number;
}) => {
  const [count, setCount] = React.useState<number>(start);

  const countNode = React.useRef<HTMLSpanElement>(null);

  const isVisible = useIsVisible(countNode);

  let countInterval: any = undefined;

  React.useEffect(() => {
    if (!isVisible) return;
    countInterval = setInterval(() => {
      if (count !== end) {
        setCount(count + 1);
      } else {
        clearInterval(countInterval);
      }
    }, interval);

    return () => clearInterval(countInterval);
  });
  return <span ref={countNode}>{count}</span>;
};
export default Counter;
