import { Documents, Endorsments, Home, Info, Ratings } from './InfoSections';
import { GenericSearch } from '../../components/Search';
import { Header } from '../../styles/styles';
import { Link, useParams } from 'react-router-dom';
import backArrow from '../../images/back-arrow.png';
import Layout from '../../utils/withLayout';
import MenuItem from './MenuItem';
import PolicyTitle from '../../components/PolicyTitle';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SubHeader from '../../components/PolicyHomeSubHeader';
import VehicleOverlay from '../../components/VehicleOverlay';
import VehiclesTable, { makeSampleInfo } from '../../components/VehiclesTable';
const [subtitle, title] = ['Name', 'Name Here'];

const fields = [
  { subtitle, title },
  { subtitle, title },
  { subtitle, title },
  { subtitle, title },
  { subtitle, title },
  { subtitle, title },
  { subtitle, title },
  { subtitle, title },
  { subtitle, title },
  { subtitle, title },
];

const home = { name: 'Home', to: '#home', component: Home };
const policySectionMenu = [
  home,
  { name: 'Info', to: '#info', component: Info },
  { name: 'Documents', to: '#documents', component: Documents },
  { name: 'Ratings', to: '#ratings', component: Ratings },
  { name: 'Endorsements', to: '#endorsements', component: Endorsments },
];

const Policy = () => {
  const params = useParams();
  const [data, setData] = useState(undefined);

  const [show, setShow] = useState(false);
  const [section, setSection] = useState(home);

  const menuOnclick = (val) => {
    setSection(val);
  };

  const close = () => {
    setShow(false);
  };

  const { slug } = params;
  useEffect(() => {
    const policyUrl = '';
    const headers = {};
    const getPolicy = async () => {
      try {
        // const res = await fetch(policyUrl, headers);
        // setData(res.data)
      } catch (error) {
        alert(error);
      }
    };
    getPolicy();
  }, []);

  const policyMenu = (
    <>
      <Link to="/home">
        <a>
          <Back src={backArrow} />
        </a>
      </Link>
      <PolicySubMenuWrapper>
        {policySectionMenu?.map((item) => (
          <MenuItem active={section} item={item} key={item} onClick={menuOnclick} />
        ))}
      </PolicySubMenuWrapper>
    </>
  );

  const CurrentSection = section.component;

  return (
    <Layout policyMenu={policyMenu}>
      <Wrapper>
        <Header>
          <PolicyTitle id={slug} />
        </Header>
        <SubHeader agent="agent" insured="test insured" period="DATE - DATE " totalPremium="$$$" />
        <Div>
          {<CurrentSection />}
          <Flex>
            <Title>Vehicles</Title>
            <GenericSearch placeholder="Search Vehicles" style={{ marginLeft: 'auto' }} />
          </Flex>
          <VehiclesTable
            open={() => {
              setShow(true);
            }}
            vehicles={makeSampleInfo(10)}
          />
          {show && <VehicleOverlay close={close} show={show} />}
        </Div>
        <p>
          Post:
          {slug}
        </p>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  padding: 24px;
`;

const Div = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const Flex = styled.div`
  flex-flow: row wrap;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 16px;
  color: #000000;
  margin-right: auto;
  font-weight: 500;
`;

const Back = styled.img`
  width: 26px;
  height: 26px;
  object-fit: contain;
`;

const PolicySubMenuWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  flex: 1 1 auto;
`;

export default Policy;
