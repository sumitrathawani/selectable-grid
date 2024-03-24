import "./App.css";
import SelectableGrid from "./components/selectable-grid";

function App() {
  return (
    <div>
      <h1>Selectable grid</h1>
      <SelectableGrid rows={10} cols={10} />
    </div>
  );
}

export default App;
