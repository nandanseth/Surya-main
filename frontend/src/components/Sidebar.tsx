import { Colors, sidebarWidth } from '../styles/styles'
import { Link } from 'react-router-dom'
import {
    default as settingsActiveIcon,
    default as settingsIcon,
} from '../images/settings icon.png'
import { useLocation } from 'react-router-dom'
import blurredBg from '../images/blurred bg.png'
import claimsActiveIcon from '../images/claims-active icon.png'
import claimsIcon from '../images/claims icon.png'
import policiesActiveIcon from '../images/policies-active icon.png'
import policiesIcon from '../images/policies icon.png'
import reportsActiveIcon from '../images/reports-active icon.png'
import reportsIcon from '../images/reports icon.png'
import styled from 'styled-components'

const Sidebar = () => {
    // <Logo src="/logo white.png" />
    const { pathname } = useLocation()
    const links = ['policies', 'reports', 'claims', 'settings']
    const check = (s) => {
        if (pathname === '/home' && s === 'policies') {
            return true
        }
        if (pathname.includes('/policies') && s === 'policies') {
            return true
        }
        return `/${s}` === pathname
    }
    return (
        <Side>
            <Logo src="/logo.png" />
            <StyledHolder>
                {links.map((item) => (
                    <SidebarItem active={check(item)} key={item} link={item} />
                ))}
            </StyledHolder>
        </Side>
    )
}

const LinkMap: Record<string, string> = {
    policies: '/home',
    reports: '/reports',
    claims: '/claims',
    settings: '/settings',
}

const iconMap = {
    policies: { default: policiesIcon, active: policiesActiveIcon },
    reports: { default: reportsIcon, active: reportsActiveIcon },
    claims: { default: claimsIcon, active: claimsActiveIcon },
    settings: { default: settingsIcon, active: settingsActiveIcon },
}

const SidebarItem = ({ link, active }: { link: string; active?: boolean }) => (
    <Link style={{ display: 'inherit' }} to={LinkMap[link]}>
        <IconHolder active={active}>
            {/* <Icon src={active ? iconMap[link].active : iconMap[link].default} /> */}
            <Label>{link}</Label>
        </IconHolder>
    </Link>
)

const StyledHolder = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`

const IconHolder = styled.div<{ active?: boolean }>`
    padding: 8px 12px;
    ${({ active }) => (active ? `background: ${Colors.lightBlue} ;` : null)}
    cursor: pointer;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    min-width: 200px;
    color: black;
    width: auto;
    margin: auto;
    margin-bottom: 20px;
    ${({ active }) =>
        active &&
        `
    > h1 {
        color: ${Colors.electricBlue};
        
    }
  `}
`

const Icon = styled.img`
    width: 14px;
    height: 14px;
`

const Label = styled.h1`
    font-weight: 600;
    font-size: 20px;
    line-height: 29px;
    color: inherit;
    margin: 0;
    margin-left: 10px;
    text-transform: capitalize;
`

const Side = styled.div`
    max-width: ${sidebarWidth}px;
    height: 100%;
    min-height: 100vh;
    //background: #fdfdfd;
    background: #fcfeff;
    padding: 20px 0;
    background-image: url('${blurredBg}');
    background-position: right bottom; /*Positioning*/
    background-repeat: no-repeat; /*Prevent showing multiple background images*/
    background-size: 216%;
    z-index: 1;
    flex: 1;
`

const Logo = styled.img`
    width: 80px;
    height: auto;
    margin: auto;
    object-fit: contain;
    margin-bottom: 23px;
    display: block;
`

export default Sidebar
