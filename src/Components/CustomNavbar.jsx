import React, { useEffect, useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavLink,
  Nav,
  NavItem,
  NavbarText,
} from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../Auth';
import { toast } from 'react-toastify';

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  // let navigate = useNavigate();

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [login])

  const handleLogout = () => {
    doLogout(() => {
      setLogin(false);
      toast("Logout Successful")
    })
  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='dark' dark expand='md'>
        <NavbarBrand ><Link className="textGrey" to="/">HR Management Application</Link></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink>
                <Link className="textGrey" to="about">About</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link className="textGrey" to="contact">Contact Us</Link>
              </NavLink>
            </NavItem>
            
          </Nav>
          <Nav style={{marginRight: '1rem'}}>
            {
              login ? (
                <>
                  <NavItem>
                    <NavLink>
                      <Link className="textGrey" to="user/dashboard">
                        {user.firstName}'s-Dashboard
                      </Link>
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink>
                      <Link className="textGrey" to="user/profile">
                        {user.email}
                      </Link>
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink>
                      <Link to="/" className="textGrey" onClick={handleLogout}>
                        Logout
                      </Link>
                    </NavLink>
                  </NavItem>
                </>
              )
              :
              (
              <NavItem>
                <NavLink>
                  <Link className="textGrey" to ="login">
                    Login
                  </Link>
                </NavLink>
              </NavItem>
              )
            }
          </Nav>
          <NavbarText className='hoverGreen'>&nbsp; SHL</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;