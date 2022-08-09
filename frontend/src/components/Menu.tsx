import AccountSwitch from './AccountSwitch'
import styled from 'styled-components'

const Menu = ({ policySectionMenu }) => {
    return (
        <Nav>
            {policySectionMenu}
            <Margin>
                <AccountSwitch title="Kush Dave" />
            </Margin>
        </Nav>
    )
}

const Nav = styled.nav`
    width: 100%;
    display: flex;
    z-index: 2;
    justify-content: space-evenly;
    align-content: center;
    flex: 1 1 auto;
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    top: 0px;
    padding: 14px 20px;
    align-items: center;
    background: #fcfeffb8;
    backdrop-filter: blur(10px);
    box-sizing: border-box;
    cursor: pointer;
    /*box-shadow: 0 2px 2px #00000008;  use for scroll?*/
`

const Margin = styled.div`
    margin-left: auto;
`

export default Menu
