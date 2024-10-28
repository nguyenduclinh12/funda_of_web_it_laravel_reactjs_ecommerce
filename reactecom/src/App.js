import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import routes from "./routes/routes";
import axios from "axios";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path ? route.path : ""}
              element={route.element}
            >
              {route.children &&
                route.children.map((child, childIndex) => {
                  return (
                    <Route
                      key={childIndex}
                      index={child.index ? index : ""}
                      path={child.path ? child.path : ""}
                      element={child.element}
                    />
                  );
                })}
            </Route>
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
