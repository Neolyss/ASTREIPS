import './App.css';
import AppMenu from "./Modules/menu";
import {useRoutes} from "react-router-dom";
import ChartPage from "./Pages/ChartPage";
import HistoriesPage from "./Pages/HistoriesPage";

function App() {
    const routes = useRoutes(
        [
            {
                path: "/",
                element: <ChartPage />,
            },
            {
                path: "/history",
                element: <HistoriesPage/>
            }
        ]
    )

  return (
    <div className="App">
        <AppMenu />
        {routes}
    </div>
  );
}

export default App;
