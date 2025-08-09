import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/login.component";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
