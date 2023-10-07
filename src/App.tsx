import { HoldButton } from "./components/HoldButton/HoldButton";

function App() {
  return (
    <div style={{ padding: "4rem" }}>
      <HoldButton afterHold={() => console.log("pressasto")} msDelay={5000} />
    </div>
  );
}

export default App;
