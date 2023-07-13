import { useState } from 'react';
import { Container, Collapse, Navbar, NavbarToggler, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const SubHeader = ({ data, isLoading, isError }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Container className="py-2 bg-white">
      <Navbar expand="md" className="p-0 subheader-navbar d-flex flex-wrap w-75" light color="faded">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {!isError && (
            <Nav navbar>
              <NavItem>
                <a href="/catalog" className="pl-0 nav-link">
                  All Items
                </a>
              </NavItem>
              {!isLoading &&
                !isError &&
                data &&
                data.categories &&
                data.categories.length > 0 &&
                data.categories.map((category) => {
                  let children = category.children;
                  delete children['array'];
                  if (Object.keys(children).length > 0) {
                    return (
                      <UncontrolledDropdown nav inNavbar key={category.nodeId.nodeId}>
                        <DropdownToggle nav caret>
                          {category.title.value}
                        </DropdownToggle>
                        <DropdownMenu end>
                          {Object.keys(children).map((child) => (
                            <DropdownItem href={`/category/${children[child].nodeId.nodeId}`} key={children[child].nodeId.nodeId}>
                              {children[child].title.value}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    );
                  }
                  return (
                    <UncontrolledDropdown className="py-2 pl-1" nav inNavbar key={category.nodeCode}>
                      <a href={`/category/${category.nodeCode}`} className="text-darker">
                        {category.title.value}
                      </a>
                    </UncontrolledDropdown>
                  );
                })}
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </Container>
  );
};

export default SubHeader;
