import React, { useState } from 'react';
import styled from 'styled-components';
import Buttons from '../components/Buttons';
import Overlay from '../components/Overlay';
import PolicyForm from '../components/PolicyForm';
import PolicyTable, { makeSampleInfo } from '../components/PolicyTable';
import Search from '../components/Search';
import { FormContextProvider } from '../context/insured-context';
import { Header, Title } from '../styles/styles';
import Layout from '../utils/withLayout';

const title = 'Policies';

const Home = () => {
  const [show, setShow] = useState(false);
  const close = () => {
    setShow(false);
  };
  const sample = makeSampleInfo(4);
  return (
    <FormContextProvider>
      <Layout>
        <ContentLayout>
          <ContentMain>
            <Header>
              <Title>{title}</Title>
              <Buttons.CreateNewPolicyButton onClick={() => {
                setShow(true);
              }}
              />
              <Search style={{ marginLeft: 'auto' }} placeholder="Search Policies" />
            </Header>
            <Section>
              <PolicyTable policies={sample} />
            </Section>
          </ContentMain>
          <Side />
        </ContentLayout>
        {
          show && (
            <Overlay show={show} style={{ background: 'rgba(11, 17, 20, 0.7939303)' }}>
              <Wrapper>
                <Exit onClick={close}>
                  X
                </Exit>
                <PolicyForm close={() => {
                  console.log('hey');
                  close();
                }}/>
              </Wrapper>
            </Overlay>
          )
        }
      </Layout>
    </FormContextProvider>
    
  );
};

const ContentLayout = styled.div`
  height: auto;
  min-height: 100%;
  display: flex;
  width: 100%;
`;

const ContentMain = styled.div`
  padding: 10px;
  flex: 1 1 auto;
`;

const Side = styled.div`
  margin-left: auto;
  padding: 0px 12px;
  display: flex;
  flex: column;
  max-width: 160px;
`;

const Section = styled.section`
  width: 100%;
  
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
`;

const Exit = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  font-weight: 700;
  font-size: 40px;
  text-align: right;
  color: #FFFFFF;
`;

export default Home;
