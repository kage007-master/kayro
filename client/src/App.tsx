import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";

import "./App.css";

import Layout from "./containers/Layout";
import Vault from "./pages/Vault";
import Sd from "./pages/SD";
import Dec from "./pages/Dec";
import Pk from "./pages/PK";
import Status from "./pages/Status";
import Clip from "./pages/Clip";
import Pwd from "./pages/Pwd";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/aaaa" element={<Vault />} />
            <Route path="/aaaa/dec/:id" element={<Dec />} />
            <Route path="/aaaa/sd" element={<Sd />} />
            <Route path="/aaaa/pk" element={<Pk />} />
            <Route path="/aaaa/status" element={<Status />} />
            <Route path="/aaaa/clip" element={<Clip />} />
            <Route path="/aaaa/pwd" element={<Pwd />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
