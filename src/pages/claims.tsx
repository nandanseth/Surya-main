import React from 'react';
import styled from 'styled-components';
import { Header, Title } from '../styles/styles';
import Layout from '../utils/withLayout';

const title = 'Claims';

const Home = () => (
  <Layout>
    <Wrapper>
      <Content>
        <Header>
          <Title>{title}</Title>
        </Header>
      </Content>
    </Wrapper>
  </Layout>
);

const Wrapper = styled.div`
    padding: 24px;
`;
const Content = styled.div`
  height: 100%;
  background: white;
  flex: 1 1 auto;
`;

export default Home;
