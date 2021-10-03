import React, { useContext } from 'react';
import { UserContext } from '../../App';
import Logo from '../../images/logo.png'
import './Header.css'
import { NavDropdown, Container, Nav, Navbar, Dropdown, Button, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={Logo} alt="" />

  <Navbar  expand="lg" className="navbar">
  <Container>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="m-auto" >
    
        <Link to="/shop"    className="nav_text navbar_link">Shop</Link>
        <Link to="/review"  className="nav_text navbar_link">Order Review</Link>
        <Link to="/manage"  className="nav_text navbar_link">Manage Inventory</Link>
       
    
     
      </Nav>
      {
        loggedInUser.isSignedIn ? 
        <span> 
        {
          loggedInUser.photo ? <span class="dropdown">
  <img src={loggedInUser.photo} alt=""style={{ height: '30%',width: '50%',borderRadius: '50%'}}/>
  <span class="dropdown-content">
  <Link to="#" className="bg-primary text-light">My Profile</Link>
  <Link to="#" onClick={()=>setLoggedInUser({})}>Sign Out</Link>

  </span>
</span>: <NavDropdown title={loggedInUser.name} id="basic-nav-dropdown" >
          <NavDropdown.Item  className="active">My Profile</NavDropdown.Item>
          <NavDropdown.Item  onClick={()=>setLoggedInUser({})}>SignOut</NavDropdown.Item>
        </NavDropdown>
        }
        {/* {
          loggedInUser.name && <NavDropdown title={loggedInUser.name} id="basic-nav-dropdown" >
          <NavDropdown.Item  className="active">My Profile</NavDropdown.Item>
          <NavDropdown.Item  onClick={()=>setLoggedInUser({})}>SignOut</NavDropdown.Item>
        </NavDropdown>
        } */}
          
           </span>
         :
     <Link to="/login"> <Button variant="success" className="nav_button">Login</Button></Link>
      }
    </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
    );
};

export default Header;