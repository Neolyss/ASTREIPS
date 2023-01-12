import './App.css';
import Display from "./Modules/Display";

function App() {
  return (
    <div className="App">
        <div id="sidebar">
            <h1>ASTRE / IPS</h1>
            <nav>
                <ul>
                    <li>
                        <a href={`/`}>Main</a>
                    </li>
                    <li>
                        <a href={`/coefficients`}>Change coefficients</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div id="detail"></div>
      <Display />
    </div>

  );
}

export default App;
