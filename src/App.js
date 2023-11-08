import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Templates/Login/LoginPage";
import HomePage from "./Templates/HomePage";
import HOC from "./HOC/HOC";
import Page404 from "./Pages/Page404/Page404";

function App() {
  const { isAuthenticated } = useSelector(state => state.user)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {
            isAuthenticated === false
              ?
              <>
                <Route path="/" element={<LoginPage />} />
                <Route path="*" element={<LoginPage />} />
              </>
              :
              <>
                <Route path="/" element={<HOC Component={HomePage} />} />
                <Route path="*" element={<Page404 />} />
              </>
          }
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
