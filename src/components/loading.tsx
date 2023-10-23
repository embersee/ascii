import { useEffect, useState } from "react";

type LoadingProps = {
  length?: number;
  speed?: number;
};

const loadingStates = [".", "*", "O", "o"];

const Loading = ({ speed = 200 }: LoadingProps) => {
  const [loop, setLoop] = useState(0);
  const [loading, setLoading] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoop((l) => (l < 3 ? l + 1 : 0));
      setLoading(() => loadingStates[loop]);
    }, speed);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div>
      <span>({loading})</span>
    </div>
  );
};

export default Loading;
