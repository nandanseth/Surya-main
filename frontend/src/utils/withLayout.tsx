import React from 'react';
import styled from 'styled-components';
import Menu from '../components/Menu';
import Sidebar from '../components/Sidebar';
import { Content } from '../styles/styles';

const Layout = ({ children, policyMenu = undefined}) => (
  <Main>
    <Flex>
      <Sidebar />
      <Content>
        <Menu policySectionMenu={policyMenu}/>
        <>
          {children}
        </>
      </Content>
    </Flex>
  </Main>
);

const Main = styled.main`
    min-height: 100vh;
    height: 100%;
    width: 100%;
    display: block;
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export default Layout;
