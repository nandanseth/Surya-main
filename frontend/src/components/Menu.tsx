import AccountSwitch from './AccountSwitch'
import styled from 'styled-components'
import { useMoralis } from 'react-moralis'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router'

const Menu = ({ policySectionMenu }) => {

    const {authenticate, isAuthenticated, isAuthenticating, hasAuthError, authError, user, enableWeb3, Moralis, logout, account} = useMoralis();
    const [address, setAddress] = useState("")
    const navigate = useNavigate();


    useEffect(() => {
        if(!user) return null;

        if (user.get('username') && user.get('username').length > 3)  {
            setAddress(user.get("username"))
        } else {
            setAddress(user.get("ethAddress"))
        }
        
    }, [user]);

    async function handleConnect(provider){
        try {
            await enableWeb3({ throwOnError: true, provider });

            const { account, chainId } = Moralis;

            console.log(account, chainId)

            const { message } = await Moralis.Cloud.run("requestMessage", {
                address: account,
                chain: parseInt(chainId, 16),
                network: "evm",
            });

            await authenticate({
                signingMessage: message,
                throwOnError: true,
                onSuccess: () => navigate('/home'),
                onError: () => console.log(authError)
            })


        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <Nav>
            {policySectionMenu}
            <Margin>
                {/* <AccountSwitch title="Kush Dave" /> */}
                {isAuthenticated ? (<AccountSwitch title={(address.length < 33) ? (address) : (address.slice(33,43))}/>) : (<ConnectButton onClick={()=>handleConnect('metamask')}>Connect Wallet</ConnectButton>) }
                
            </Margin>
        </Nav>
    )
}

const ConnectButton = styled.button`
    display: flex;
    flex: 1 1 auto;
    background: #fcfeffb8;
    border: 1px solid black;
    padding: 10px;
    border-radius: 2rem;
`



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
