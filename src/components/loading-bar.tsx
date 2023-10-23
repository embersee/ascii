import { useEffect, useState } from "react";

type LoadingProps = {
  length?: number;
  speed?: number;
  progress?: boolean;
};

const loadingStates = [".", "*", "O", "o"];

const LoadingBar = ({
  length = 16,
  speed = 100,
  progress = true,
}: LoadingProps) => {
  const [loop, setLoop] = useState(0);
  const [loading, setLoading] = useState<string[]>([]);
  const [prog, setProg] = useState<number>(0);

  const finalString = loadingStates.slice(-1)[0];
  const finalStatePixelLength = getMaxPixelsOfStrings(finalString) * length;

  useEffect(() => {
    const interval = setInterval(() => {
      const lastChar = loading.slice(-1)[0];
      const lastCharState = loadingStates.slice(-1)[0];

      if (lastChar == lastCharState) {
        if (loading.length > length - 1) return clearInterval(interval);

        setLoop(0);
        setLoading((prev) => [...prev, loadingStates[loop]]);
      } else {
        setProg((v) => v + 1);
        setLoop((l) => l + 1);
        setLoading((prev) => [
          ...prev.slice(0, prev.length - 1),
          loadingStates[loop],
        ]);
      }

      return;
    }, (length / 8) * speed);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="flex">
      <span>[</span>
      <div
        className=" text-left"
        style={{ width: finalStatePixelLength + "px" }}
      >
        {loading.map((v) => v)}
      </div>
      <span>] </span>
      {progress && (
        <span>
          {` `}
          {prog}/{length * loadingStates.length}
        </span>
      )}
    </div>
  );
};

const getMaxPixelsOfStrings = (string: string) => {
  const span: HTMLSpanElement = document.createElement("span");
  span.append(string);
  Object.assign(span.style, {
    position: "absolute",
    fontSize: "1em",
    fontWeight: 500,
  });

  document?.querySelector("html")?.prepend(span);
  const maxPixels = Math.max(span.getBoundingClientRect().width);

  span.remove(); //cleanup

  return maxPixels;
};

export default LoadingBar;
