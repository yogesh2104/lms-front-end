import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { toast } from "react-toastify";

function NavbarComponent() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    toast.success("logout successfully");
    navigate("/login");
  };
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>LMS</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user && (
            <Nav.Link onClick={handleClick} className="pe-auto">
              Logout
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
