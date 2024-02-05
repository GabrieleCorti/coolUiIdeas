import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const CarouselContext = createContext<{
  position: number;
  setPosition: (prev: number | ((prevState: number) => number)) => void;
  maxChildren: number;
  setMaxChildren: (maxChildren: number) => void;
}>({
  position: 0,
  setPosition: () => {
    null;
  },
  setMaxChildren: () => {
    null;
  },
  maxChildren: 0,
});

const CarouselControlButton = ({
  children,
  movement,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactElement<any, any>;
  movement: "forward" | "backwards";
}) => {
  const { setPosition, maxChildren } = useContext(CarouselContext);
  const onClick = useCallback(() => {
    setPosition((prev) => {
      if (maxChildren === prev + 1 && movement === "forward") {
        return prev;
      }
      if (prev === 0 && movement === "backwards") {
        return prev;
      }
      return movement === "forward" ? prev + 1 : prev - 1;
    });
  }, [maxChildren, movement, setPosition]);

  return React.cloneElement(children, { ...children.props, onClick });
};

const CarouselItems = ({ children }: { children: React.ReactNode[] }) => {
  const { position, setMaxChildren } = useContext(CarouselContext);
  const [elementsRef, setElementRef] = useState<(HTMLDivElement | null)[]>([]);
  const maxWidth = useMemo(
    () =>
      Math.max(
        ...elementsRef.map((e) => e?.getBoundingClientRect().width ?? 0)
      ),
    [elementsRef]
  );
  useEffect(() => {
    setMaxChildren(React.Children.toArray(children).length);
  }, [children, setMaxChildren]);

  return (
    <>
      {React.Children.map(children, (c, i) => (
        <div
          style={{
            transform: `translateX(-${maxWidth * position}px)`,
            transition: "all 0.3s linear",
          }}
          ref={(node) => {
            if (node) {
              setElementRef((prev) => {
                if (prev[i] === node) {
                  return prev;
                }
                return [...prev, node];
              });
            }
          }}
        >
          {c}
        </div>
      ))}
    </>
  );
};

export const Carousel = ({ children }: { children: React.ReactNode[] }) => {
  const [position, setPosition] = useState(0);
  const [maxChildren, setMaxChildren] = useState(0);
  return (
    <CarouselContext.Provider
      value={{ position, setPosition, maxChildren, setMaxChildren }}
    >
      {React.Children.map(children, (c) => c)}
    </CarouselContext.Provider>
  );
};

Carousel.CarouselControlButton = CarouselControlButton;
Carousel.CarouselItems = CarouselItems;
