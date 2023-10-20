import Loading from "./components/loading";

function App() {
  return (
    <>
      <h1>ASCII UI</h1>

      <h2>Components</h2>

      <div className="space-y-2 card text-left">
        <h3>Loading </h3>
        <Loading length={16} speed={100} />
      </div>
    </>
  );
}

export default App;
