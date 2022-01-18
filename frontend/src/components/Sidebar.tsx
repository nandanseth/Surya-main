import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import blurredBg from '../images/blurred bg.png';
import claimsIcon from '../images/claims icon.png';
import claimsActiveIcon from '../images/claims-active icon.png';
import policiesIcon from '../images/policies icon.png';
import policiesActiveIcon from '../images/policies-active icon.png';
import reportsIcon from '../images/reports icon.png';
import reportsActiveIcon from '../images/reports-active icon.png';
import { default as settingsActiveIcon, default as settingsIcon } from '../images/settings icon.png';
import { Colors, ColorsCSS, sidebarWidth } from '../styles/styles';

const Sidebar = () => {
  // <Logo src="/logo white.png" />
  const { pathname } = useLocation();
  const links = ['policies', 'reports', 'claims', 'settings'];
  const check = (s) => {
    console.log(s, pathname);
    if (pathname === '/home' && s === 'policies') {
      console.log('test');
      return true;
    }
    if (pathname.includes('/policies') && s === 'policies') {
      console.log('test2');
      return true;
    }
    return `/${s}` === pathname;
  };
  return (
    <Side>
      <Logo src="/logo.png" />
      <StyledHolder>
        { links.map((item) => (
          <SidebarItem
            key={item}
            link={item}
            active={check(item)}
          />
        ))}
      </StyledHolder>
    </Side>
  );
};

const LinkMap : Record<string, string> = {
  policies: '/home',
  reports: '/reports',
  claims: '/claims',
  settings: '/settings',
};

const iconMap = {
  policies: { default: policiesIcon, active: policiesActiveIcon },
  reports: { default: reportsIcon, active: reportsActiveIcon },
  claims: { default: claimsIcon, active: claimsActiveIcon },
  settings: { default: settingsIcon, active: settingsActiveIcon },
};

console.log(iconMap);

const SidebarItem = ({ link, active }: { link: string; active?: boolean}) => (
  <Link to={LinkMap[link]} style={{display: 'inherit'}}>
    <IconHolder active={active}>
      <Icon src={active ? iconMap[link].active : iconMap[link].default} />
      <Label>{link}</Label>
    </IconHolder>
  </Link>
);

const StyledHolder = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

const IconHolder = styled.div<{active?: boolean}>`
    padding: 8px 12px;
    ${({ active }) => (active
    ? ColorsCSS.gradientTransCSS
    : null)}
    cursor: pointer;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    min-width: 200px;
    color: black;
    width: auto;
    margin: auto;
    margin-bottom: 20px;
    ${({ active }) => active && `
    > h1 {
        color: ${Colors.green};
        
    }
  `}
`;

const Icon = styled.img`
    width: 14px;
    height: 14px;
`;

const Label = styled.h1`
    font-weight: 600;
    font-size: 20px;
    line-height: 29px;
    color: inherit;
    margin: 0;
    margin-left: 10px;
    text-transform: capitalize;
`;

const Side = styled.div`
    width: ${sidebarWidth}px;
    position: fixed;
    left: 0%;
    top: 0%;
    bottom: 0%;
    background: #FDFDFD;
    border-right: solid 1px rgba(196, 196, 196, 0.27);; 
    padding: 20px 0;
    background-image: url("${blurredBg}");
    background-position: right bottom; /*Positioning*/
    background-repeat: no-repeat; /*Prevent showing multiple background images*/
    background-size: 216%;
    z-index: 1;
`;

const Logo = styled.img`
  width: 80px;
  height: auto;
  margin: auto;
  object-fit: contain;
  margin-bottom: 23px;
  display: block;
`;

export default Sidebar;
