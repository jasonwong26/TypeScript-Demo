import * as React from "react";
import { Alert, Navbar, Nav, NavItem, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import LayoutContainer from "../../containers/LayoutContainer";

interface HeaderProps {
  title: string
}

const Header: React.SFC<HeaderProps> = ({ title }) => (
  <header>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={"/"}>{title}</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/heroes">
          <NavItem eventKey={1}>Heroes</NavItem>
        </LinkContainer>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
    <LayoutContainer>
      {({ theme, setTheme }) => (
        <Alert bsStyle="info" className="text-right">
          <span>Current theme: {theme} </span>
          <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Switch theme
          </Button>
        </Alert>
      )}
    </LayoutContainer>
  </header>
);

export default Header;
