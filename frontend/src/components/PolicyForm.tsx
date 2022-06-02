import { Colors, Title, transitionCss } from '../styles/styles';
import {
  CoverageSection,
  DocumentsSection,
  DriversSection,
  InsuredSection,
  LossHistorySection,
  PaymentsSection,
  PolicySection,
  ResinuranceSection,
  VehicleSection,
} from './PolicyFormSections';
import { FormContext } from '../context/insured-context';
import { preSubmit, urls } from '../shared';
import coverageIcon from '../images/coverage icon.png';
import documentsIcon from '../images/documents icon.png';
import driversIcon from '../images/drivers icon.png';
import insuredIcon from '../images/insured icon.png';
import lossHistoryIcon from '../images/loss history icon.png';
import paymentsIcon from '../images/payments icon.png';
import policyIcon from '../images/policy icon.png';
import React, { useContext, useState } from 'react';
import reinsuranceIcon from '../images/reinsurance icon.png';
import styled from 'styled-components';
import vehicleIcon from '../images/vehicle icon.png';

const PolicyForm = ({ close }) => {
  const store = useContext(FormContext);
  console.log(store);
  const { reset } = store;
  const Pages = {
    policy: { page: PolicySection, name: 'Policy' },
    insured: { page: InsuredSection, name: 'Insured' },
    drivers: { page: DriversSection, name: 'Drivers' },
    vehicles: { page: VehicleSection, name: 'Vehicles' },
    loss: { page: LossHistorySection, name: 'Loss History' },
    coverage: { page: CoverageSection, name: 'Coverage' },
    documents: { page: DocumentsSection, name: 'Documents' },
    reinsurance: { page: ResinuranceSection, name: 'Reinsurance' },
    payments: { page: PaymentsSection, name: 'Payments' },
  };

  const total = Object.keys(Pages).length;

  const percentMap = {
    policy: 2 / total,
    insured: 1 / total,
    drivers: 4 / total,
    vehicles: 3 / total,
    loss: 5 / total,
    coverage: 6 / total,
    documents: 7 / total,
    reinsurance: 8 / total,
    payments: 9 / total,
  };

  const [current, setCurrent] = useState('insured');
  const { name, page: Current } = Pages[current];
  const onSubmit = () => {
    const postStore = async () => {
      try {
        //we can do some verification here
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preSubmit(store)),
        };
        console.log(JSON.stringify(store));
        const res = await fetch(urls.createPoliciesUrl, requestOptions);
        const data = await res.json();
        console.log({ data }, 'test');
        return true;
      } catch (error) {
        alert(error);
        return false;
      }
    };
    return postStore();
  };

  const MenuFooter = () => (
    <Nav>
      <StyledIcon
        active={current === 'insured'}
        onClick={() => {
          setCurrent('insured');
        }}
        title="Insured Section"
      >
        <StyledImg src={insuredIcon} />
      </StyledIcon>
      <StyledIcon
        active={current === 'policy'}
        onClick={() => {
          setCurrent('policy');
        }}
        style={{ backgroundImage: `url('${policyIcon}')` }}
        title="Policy Section"
      >
        <StyledImg src={policyIcon} />
      </StyledIcon>
      <StyledIcon
        active={current === 'vehicles'}
        onClick={() => {
          setCurrent('vehicles');
        }}
        title="Vehicles Section"
      >
        <StyledImg src={vehicleIcon} />
      </StyledIcon>

      <StyledIcon
        active={current === 'drivers'}
        onClick={() => {
          setCurrent('drivers');
        }}
        title="Drivers Section"
      >
        <StyledImg src={driversIcon} />
      </StyledIcon>

      <StyledIcon
        active={current === 'loss'}
        onClick={() => {
          setCurrent('loss');
        }}
        title="Loss History"
      >
        <StyledImg src={lossHistoryIcon} />
      </StyledIcon>

      <StyledIcon
        active={current === 'coverage'}
        onClick={() => {
          setCurrent('coverage');
        }}
        title="Coverage"
      >
        <StyledImg src={coverageIcon} />
      </StyledIcon>

      <StyledIcon
        active={current === 'documents'}
        onClick={() => {
          setCurrent('documents');
        }}
        title="Documents"
      >
        <StyledImg src={documentsIcon} />
      </StyledIcon>

      <StyledIcon
        active={current === 'reinsurnace'}
        onClick={() => {
          setCurrent('reinsurnace');
        }}
        title="Reinsurance"
      >
        <StyledImg src={reinsuranceIcon} />
      </StyledIcon>
      <StyledIcon
        active={current === 'payments'}
        onClick={() => {
          setCurrent('payments');
        }}
        title="Payments"
      >
        <StyledImg src={paymentsIcon} />
      </StyledIcon>
    </Nav>
  );

  return (
    <Container>
      <FormHead close={close} name={name} onSubmit={onSubmit} percent={percentMap[current]} reset={reset} />
      <Main>
        <Current store={store} />
      </Main>
      <MenuFooter />
    </Container>
  );
};

const FormHead = ({
  close,
  percent = 0,
  name = 'Name',
  reset,
  onSubmit,
}: {
  close: () => void;
  percent?: number;
  name?: string;
  reset?: any;
  onSubmit: () => Promise<boolean>;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Header>
      <ProgressContainer>
        <Background />
        <Progress percent={percent} />
      </ProgressContainer>
      <HeaderContent>
        <Left>
          <NewApplication> New Application</NewApplication>
          <Title>{name}</Title>
        </Left>
        <Right>
          <SaveDraft onClick={close}>Save as Draft</SaveDraft>
          <Submit
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              const check = await onSubmit();
              if (check) {
                setLoading(false);
                close();
                reset();
              }
              setLoading(false);
            }}
          >
            {loading ? 'Loading' : 'Submit'}
          </Submit>
        </Right>
      </HeaderContent>
    </Header>
  );
};

const ProgressContainer = styled.div`
  height: 7px;
  width: 100%;
  position: relative;
`;

const BaseBox = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transition: width 1.2s ease-in-out;
`;

const Background = styled(BaseBox)`
  background: linear-gradient(90deg, rgba(89, 195, 179, 0.394559) 0%, rgb(0 209 255 / 64%) 180%);
  width: 100%;
  height: 8px;
`;

const Progress = styled(BaseBox)<{ percent: number }>`
  background: #03cdae;
  border-radius: 0px 8px 8px 0px;
  width: ${({ percent }) => percent * 100}%;
`;

const Header = styled.div`
  width: 100%;
  width: 100%;
  position: sticky;
  background: white;
  z-index: 2;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  padding: 12px;
  box-shadow: 0px 2px 3px #0000001a;
`;

const Left = styled.div`
  margin-right: auto;
  flex: 1 1 auto;
`;

const Right = styled.div`
  margin-left: auto;
  flex: 1 1 auto;
  text-align: right;
`;

const NewApplication = styled.div`
  font-size: 12px;
  color: ${Colors.text};
  margin-bottom: 6px;
`;

const SaveDraft = styled.button`
  font-weight: 500;
  font-size: 12px;
  color: #3a5664;
  background: rgba(58, 86, 100, 0.06);
  margin-bottom: 4px;
  margin-left: auto;
  width: auto;
  display: block;
  padding: 2px 5px;
`;

const Submit = styled.button`
  font-weight: 600;
  font-size: 16px;
  color: #00aeff;
  text-align: center;
  background: #00aeff12;
  padding: 4px 15px;
  border-radius: 3px;
`;

const Container = styled.div`
  background: #ffffff;
  width: 85%;
  align-self: center;
  height: 100%;
  right: 0px;
  position: fixed;
  padding: 4px 12px;
`;

const Main = styled.div`
  padding: 20px 6px;
  width: 100%;
  overflow-y: scroll;
  height: inherit;
  padding-bottom: 167px;
  padding-top: 12px;
`;

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  position: absolute;
  bottom: 4px;
  background: white;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: solid 1px #0000001c;
  z-index: 2;
  left: 0;
`;

const StyledIcon = styled.div<{ active: boolean }>`
  width: 40px;
  height: 100%;
  margin: 0 24px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${transitionCss}
  ${({ active }) =>
    active &&
    `
      border-bottom: solid 4px #3A5560;
      background-color: #00000003;
    `}}
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  margin: auto;
`;

export default PolicyForm;
