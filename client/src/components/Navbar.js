import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

function NavBar({ isAuth, setIsAuth, role }) {
  const username = localStorage.getItem("name");
  const navigate = useNavigate();

  function logout() {
    navigate("/");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("tokenemail");
    localStorage.removeItem("tokenpassword");
    localStorage.clear();
    setIsAuth(false);
  }

  return (
    <Navbar
      className="fw-bold sticky-top"
      style={{ backgroundColor: "#5000ca" }}
      variant="dark"
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand className="mx-3">
          <img
            src="https://img.icons8.com/color/96/null/q-cute.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          uizify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end mx-3"
        >
          {isAuth === true ? (
            <>
              <Nav className="me-auto">
                {role === "1" ? (
                  <>
                    <LinkContainer to="/">
                      <Nav.Link>DeshBoard</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/newquiz">
                      <Nav.Link>Create New Quiz</Nav.Link>
                    </LinkContainer>
                  </>
                ) : (
                  <>
                    <LinkContainer to="/">
                      <Nav.Link>DeshBoard</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/joinquiz">
                      <Nav.Link>Join New Quiz</Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
              <div className="mx-3 text-white">{username}</div>
              <Button
                className="px-3 py-1 mx-3"
                variant="light"
                type="submit"
                onClick={logout}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Nav className="me-auto">
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
              </Nav>
              <Button className="p-0 mx-3" variant="light">
                <LinkContainer to="/register">
                  <Nav.Link className="px-4 py-1">Log In</Nav.Link>
                </LinkContainer>
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
