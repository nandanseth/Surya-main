import { Colors } from '../../styles/styles';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MenuItem = ({ item, active, onClick }) => {
  const { name, to } = item;
  return (
    <NavItem
      active={active === name}
      onClick={() => {
        onClick(item);
      }}
    >
      <StyledLink to={to}>{name}</StyledLink>
    </NavItem>
  );
};

const NavItem = styled.div<{ active: boolean }>`
  padding: 2px 16px;
  background: ${({ active }) => (active ? Colors.menu : 'transparent')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  color: #000000;
`;

export default MenuItem;
