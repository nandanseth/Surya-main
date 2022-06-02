import { FormContextProvider } from '../context/insured-context';
import { Header, Title } from '../styles/styles';
import { testPolicies, urls } from '../shared';
import Buttons from '../components/Buttons';
import Layout from '../utils/withLayout';
import Overlay from '../components/Overlay';
import PolicyForm from '../components/PolicyForm';
import PolicyTable, { makeSampleInfo } from '../components/PolicyTable';
import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import styled from 'styled-components';

const title = 'Policies';

const Home = (props) => {
  const [show, setShow] = useState(false);
  const [policies, setPolicies] = useState([]);
  console.log(policies, 'these are the policies');

  useEffect(() => {
    const headers = {};
    const getPolicies = async () => {
      try {
        const res = await fetch(urls.getAllPoliciesUrl);
        const data = await res.json();
        console.log(data, 'test');
        setPolicies(data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getPolicies();
  }, []);

  const close = () => {
    setShow(false);
  };
  const sample = makeSampleInfo(4);
  // this will be the list
  return (
    <FormContextProvider>
      <Layout>
        <ContentLayout>
          <ContentMain>
            <Header>
              <Title>{title}</Title>
              <Buttons.CreateNewPolicyButton
                onClick={() => {
                  setShow(true);
                }}
              />
              <Search placeholder="Search Policies" style={{ marginLeft: 'auto' }} />
            </Header>
            <Section>
              <PolicyTable policies={policies ?? testPolicies} />
            </Section>
          </ContentMain>
          <Side />
        </ContentLayout>
        {show && (
          <Overlay show={show} style={{ background: 'rgba(11, 17, 20, 0.7939303)' }}>
            <Wrapper>
              <Exit onClick={close}>X</Exit>
              <PolicyForm
                close={() => {
                  console.log('hey');
                  close();
                }}
              />
            </Wrapper>
          </Overlay>
        )}
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
  color: #ffffff;
`;

export default Home;
