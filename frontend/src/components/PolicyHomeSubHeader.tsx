import { Colors } from '../styles/styles';
import styled from 'styled-components';

const SubHeader = ({ insured, agent, period, totalPremium }) => {
  const titles = ['Insured', 'Agent', 'Period', 'Total Premium'];
  const info = [insured, agent, period, totalPremium];

  return (
    <Flex>
      {titles.map((item, i) => (
        <Item key={item}>
          <Title>{`${item}:`}</Title>
          <Span>{info[i]}</Span>
        </Item>
      ))}
    </Flex>
  );
};

const Flex = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  width: 100%;
  padding: 12px 0;
`;

const Item = styled.div`
  text-align: left;
  flex: 1 1 auto;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: black;
  display: inline-block;
  margin-right: 4px;
`;

const Span = styled.span`
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */
  color: ${Colors.text};
`;

export default SubHeader;
