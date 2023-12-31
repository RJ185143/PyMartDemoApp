import React, { useState, useContext, useEffect } from 'react';
import Logger from '~/components/api-logger/Logger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faShoppingCart, faStore } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Badge, Col, Button, Nav, NavItem } from 'reactstrap';
import FindStoreModal from './sites/FindStoreModal';
import { UserStoreContext } from '~/context/userStore';
import SubHeader from './SubHeader';
import SearchBar from './SearchBar';
import { UserCartContext } from '~/context/userCart';
import ProfileDropdown from '../auth/ProfileDropdown';
import useMenu from '~/lib/swr/useMenu';

export default function Header({ logs }) {
  const { data, isLoading, isError } = useMenu();
  const { userStore } = useContext(UserStoreContext);
  const { userCart } = useContext(UserCartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  useEffect(() => {
    if (Object.keys(userStore).length == 0) {
      setIsModalOpen(true);
    }
  }, [isModalOpen]);

  return (
    <div className="bg-white">
      <FindStoreModal modalProp={isModalOpen} toggle={toggleModal} />
      <header className="section-header shadow-sm">
        <section className="header-top border-lighter">
          <Container>
            <Nav className="d-flex justify-content-between">
              <NavItem>
                <Logger logs={logs ?? []} />
              </NavItem>
              <NavItem>
                <a href="/admin/dashboard" className="nav-link" style={{ border: 'none !important', backgroundColor: `transparent !important` }}>
                  <FontAwesomeIcon icon={faCog} size="1x" /> Manage
                </a>
              </NavItem>
            </Nav>
          </Container>
        </section>
        <section className="header-main border-bottom py-3">
          <Container>
            <Row className="align-items-center w-100 justify-content-between ms-0 me-0">
              <Col sm="2" md="2" className="bg-transparent">
                <a href="/" className="logo-text ps-0 pe-0" style={{ border: 'none !important', backgroundColor: `transparent !important` }}>
                  PyMart
                </a>
              </Col>
              <Col sm="8" md="5">
                <SearchBar />
              </Col>
              <Col sm="12" md="5" className="text-sm-left text-md-right text-white pe-0">
                <div className="d-flex justify-content-end align-items-center" style={{ border: 'none !important', backgroundColor: `transparent !important` }} >
                  <div className=" border-none border-white border-1">
                    <a className="cart-a" style={{ border: 'none !important', backgroundColor: `transparent !important` }}>
                      <Button onClick={() => setIsModalOpen(true)} outline className="border-none cart-btn bg-transparent text-white" suppressHydrationWarning>
                        <FontAwesomeIcon icon={faStore} size="1x" className="pe-1" />
                        {userStore.siteName || 'Set Store'}
                      </Button>
                    </a>
                  </div>
                  <div className="cart-div d-flex align-items-center justify-content-between text-white border-start border-end border-white border-1">
                    <a href="/cart" className="cart-a" style={{ border: 'none !important', backgroundColor: `transparent !important` }}>
                      <Button color="light" outline className="border-none cart-btn bg-transparent text-white">
                        <FontAwesomeIcon icon={faShoppingCart} size="1x" className="pe-1" />Cart
                        {userCart && userCart.totalQuantity != null && userCart.totalQuantity > 0 && (
                          <Badge color="warning" className="ms-1">
                            {userCart.totalQuantity}
                          </Badge>
                        )}
                      </Button>
                    </a>
                  </div>
                  <div className="d-flex flex-column justify-content-start pe-0">
                    <ProfileDropdown />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <SubHeader data={data} isLoading={isLoading} isError={isError} />
      </header>
    </div>
  );
}
