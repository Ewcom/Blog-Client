import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Entry } from "./pages/Entry/Entry";
import './app.scss'

function App() {

  //react router v6 routes
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      <Route path="/entry/:id" element={<Entry />} />
         
    </Routes>
  </BrowserRouter>
  );
}

export default App;
