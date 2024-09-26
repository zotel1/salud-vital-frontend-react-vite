import React, { useState } from 'react'
import Hand from '../../../assets/img/handHeader.png'
import ProfileImg from '../../../assets/img/profileImg.png'
import '../header/HeaderStyles.css'
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap'
import LogoutButton from '../../../componentes/auth0/LogoutButton'
import useGetPacientesById from '../../../hooks/useGetPacientesById'

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {paciente} = useGetPacientesById();

  const isHomePage = location.pathname === '/home' || location.pathname === '/'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  const firstName = paciente?.nombre.split(' ')[0] || 'General';

  return (
       <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="pb-0">
          <Container fluid>
            {isHomePage ? (
              paciente && (
                <div className='d-flex justify-content-center align-items-center mb-0 pb-0'>
                  <img src={Hand} alt="Mano saludando en header" className='me-2 mb-2 headerHand'/>
                  <p className='header mb-0 '>Hola {firstName}!</p>
                </div>
              )
            ) : (
              <NavLink to='/home'>
                <FaArrowLeft size={30} color='#432C81'/>
              </NavLink>
            )}
            <Navbar.Toggle className='navbar-img'><img 
              src={ProfileImg}               
              className='profilePicture'
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`${expand}`}
            /></Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand} `}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="text-center mt-5 gap-2">
                  <Nav.Link href="/profile/:idPaciente" className="fs-4">Mi perfil</Nav.Link>
                  <Nav.Link href="/configuracion" className="fs-4">Configuracion</Nav.Link>
                  <LogoutButton className="logoutButton" />
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  )
}

export default Header