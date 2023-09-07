import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";

import "./App.css";

import Layout from "./containers/Layout";
import Pk from "./pages/PK";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/aaaa" element={<Pk />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
