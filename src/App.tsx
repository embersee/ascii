import Loading from "./components/loading";
import LoadingBar from "./components/loading-bar";

function App() {
  return (
    <>
      <h1>ASCII UI</h1>

      <h2>Components</h2>

      <div className="space-y-4 card text-left flex flex-col justify-center">
        <div className="card">
          <h3>Loading Bar </h3>
          <LoadingBar speed={100} />
        </div>
        <div className="card">
          <h3>Loading Single </h3>
          <Loading />
        </div>
      </div>
    </>
  );
}

export default App;
