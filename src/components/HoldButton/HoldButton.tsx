import { useEffect, useRef, useState } from "react";
import "./holdButton.css";

export interface HoldButtonProps {
  afterHold?: () => unknown;
  msDelay?: number;
}

/**
 * This button fires the callback after a delay but only in click is hold.
 * There is a circular loading informing the user about how much time is left to stop holding the button
 * and aborting the action
 *
 * @param afterHold callback fired after the button is held for enough time
 * @param msDelay how much time the button needs be hold for the afterHold action to fire
 */
export const HoldButton: React.FC<HoldButtonProps> = ({
  afterHold,
  msDelay = 1000,
}) => {
  const [isMouseHold, setIsMouseHold] = useState(false);
  const countIdRef = useRef<number | null>(null);
  const afterHoldRef = useRef(afterHold);
  const msDealRef = useRef(msDelay + 200);
  useEffect(() => {
    afterHoldRef.current = afterHold;
  }, [afterHold]);
  useEffect(() => {
    msDealRef.current = msDelay + 200;
  }, [msDelay]);

  useEffect(() => {
    if (isMouseHold) {
      countIdRef.current = setTimeout(
        () => afterHoldRef.current?.(),
        msDealRef.current
      );
    }

    return () => {
      if (countIdRef.current) {
        clearTimeout(countIdRef.current);
      }
    };
  }, [isMouseHold]);

  return (
    <div className={"progress" + (isMouseHold ? " up" : "")}>
      <button
        className="btn"
        onMouseDown={() => {
          setIsMouseHold(true);
          document.documentElement.style.setProperty(
            "--hold-button-animation-duration",
            `${msDealRef.current}ms`
          );
        }}
        onMouseUp={() => {
          setIsMouseHold(false);
          document.documentElement.style.setProperty(
            "--hold-button-animation-duration",
            `1200ms`
          );
        }}
      >
        &times;
      </button>
    </div>
  );
};
