import styled from 'styled-components';
import AccountSwitch from './AccountSwitch';

const Menu = ({ policySectionMenu }) => {
  
  return (
    <Nav>
      {policySectionMenu}
      <Margin>
        <AccountSwitch title="Kush Dave" />
      </Margin>
    </Nav>
  )
};


const Nav = styled.nav`
  position: sticky;
  width: 100%;
  display: flex;
  z-index: 2;
  justify-content: space-evenly;
  align-content: center;
  flex: 1 1 auto;
  position: -webkit-sticky;
  position: sticky;
  top: 10px;
  padding: 10px 20px;
  align-items: center;
  background: white;
  box-sizing: border-box;
  /*box-shadow: 0 2px 2px #00000008;  use for scroll?*/
`;

const Margin = styled.div`
  margin-left: auto;
`;

export default Menu
