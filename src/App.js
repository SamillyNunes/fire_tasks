import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import RoutesApp from "./routes";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
