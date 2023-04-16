import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import Register from "./components/Register";
import Newquiz from "./components/Newquiz";
import Joinquiz from "./components/Joinquiz";
import DashboardTeacher from "./components/DashboardTeacher";
import DeshboardStudent from "./components/DeshboardStudent";
import Sonequiz from "./components/sonequiz";
import Tonequiz from "./components/tonequiz";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const role = localStorage.getItem("role");
  const tokenemail = localStorage.getItem("tokenemail");
  const tokenpassword = localStorage.getItem("tokenpassword");
  const [sonequiz,setsonequiz] = useState([]);
  const [tonequiz,settonequiz] = useState([]);

  return (
    <div className="App">
      {isAuth ? (
        <>
          {role === "1" ? (
            <>
              <Router>
                <NavBar isAuth={isAuth} setIsAuth={setIsAuth} role={role} />
                <Routes>
                  <Route exact path="*" element={<DashboardTeacher settonequiz={settonequiz}/>}></Route>
                  <Route exact path="/newquiz" element={<Newquiz />}></Route>
                  <Route exact path="/tonequiz" element={<Tonequiz tonequiz={tonequiz}/>}></Route>
                </Routes>
              </Router>
            </>
          ) : (
            <Router>
              <NavBar isAuth={isAuth} setIsAuth={setIsAuth} role={role} />
              <Routes>
                <Route exact path="*" element={<DeshboardStudent setsonequiz={setsonequiz}/>}></Route>
                <Route exact path="/joinquiz" element={<Joinquiz />}></Route>
                <Route exact path="/sonequiz" element={<Sonequiz sonequiz={sonequiz}/>}></Route>
              </Routes>
            </Router>
          )}
        </>
      ) : (
        <>
          <Router>
            <NavBar isAuth={isAuth} setIsAuth={setIsAuth} role={role} />
            {tokenemail && tokenpassword && <Register setIsAuth={setIsAuth} />}
            <Routes>
              <Route exact path="*" element={<Home />}></Route>
              <Route
                exact
                path="/register"
                element={<Register setIsAuth={setIsAuth} />}
              ></Route>
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
