import { useEffect, useState } from "react";

type LoadingProps = {
  length: number;
  speed?: number;
};

const loadingStates = [".", "*", "O", "o"];

const Loading = ({ length, speed = 200 }: LoadingProps) => {
  const [loop, setLoop] = useState(0);
  const [loading, setLoading] = useState<string[]>([]);

  const finalString = loadingStates.slice(-1)[0].repeat(length).split("");
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
        setLoop((l) => l + 1);
        setLoading((prev) => [
          ...prev.slice(0, prev.length - 1),
          loadingStates[loop],
        ]);
      }

      return;
    }, speed);

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
      <span>]</span>
    </div>
  );
};

const getMaxPixelsOfStrings = (strings: string[]) => {
  const spans = strings.map((str) => {
    const span: HTMLSpanElement = document.createElement("span");
    span.append(str);
    Object.assign(span.style, {
      position: "absolute",
      fontSize: "1em",
      fontWeight: 500,
    });

    return span;
  });

  document?.querySelector("html")?.prepend(...spans);
  const maxPixels = Math.max(
    ...spans.map((span) => span.getBoundingClientRect().width)
  );
  spans.forEach((span) => span.remove());

  return maxPixels;
};

export default Loading;
