import { ButtonHolder, Colors, transitionCss } from '../styles/styles';
import { Cancel, Save } from './Buttons';
import { useState } from 'react';
import styled from 'styled-components';

const insuredList = [];

const SearchOverlay = ({ close }) => {
  const [insured, setInsured] = useState('');
  const onChange = (e) => {
    const val = e.target.value;
    setInsured(val);
  };
  const label = 'Search for insured';
  const title = 'Search For  Insured';
  const save = 'SAVE';
  const cancel = 'CANCEL';

  return (
    <Overlay>
      <SearchContainer>
        <Title>{title}</Title>
        <MaxDiv>
          <Input label={label} onChange={onChange} placeholder="Insured" value={insured} />
          {insured !== '' ? (
            <FilterHolder>
              {insuredList
                .filter((item) => item.toLower().contains(insured))
                .map((item) => (
                  <Item key={item}>
                    <ItemName />
                    <ItemCity />
                    <ItemZip />
                  </Item>
                ))}
            </FilterHolder>
          ) : null}
        </MaxDiv>
        <ButtonHolder>
          <Save onClick={close}> {save} </Save>
          <Cancel onClick={close}>{cancel}</Cancel>
        </ButtonHolder>
      </SearchContainer>
      <XDiv onClick={close}>X</XDiv>
    </Overlay>
  );
};

const Overlay = styled.div`
  z-index: 5;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 69%);
  display: flex;
  justify-content: flex-start;
`;

const SearchContainer = styled.div`
  background: #ffffff;
  border: 1px solid #9797977d;
  box-sizing: border-box;
  width: 65%;
  max-width: 800px;
  min-width: 300px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 25px;
  box-sizing: border-box;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 300;
  font-size: 36px;
  line-height: 44px;
  color: #000000;
  margin: auto;
  margin-top: 0;
`;

const Input = ({
  onChange,
  style,
  label,
  value,
  placeholder,
}: {
  onChange?: any;
  style?: any;
  label?: string | number;
  value?: any;
  placeholder?: string;
}) => (
  <Div>
    <Label>{label}</Label>
    <StyledInput onChange={onChange} placeholder={placeholder || `${label}`} style={style} type="text" value={value} />
  </Div>
);

const MaxDiv = styled.div`
  width: 100%;
  margin: auto;
  max-width: 600px;
  padding: 0px 20px;
`;

const Div = styled.div`
  width: 100%;
  margin: auto;
`;

const Label = styled.label`
  top: 20px;
  position: relative;
  right: -8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */
  color: #000000;
  mix-blend-mode: normal;
  opacity: 0.25;
`;

const StyledInput = styled.input`
  outline: none;
  width: 100%;
  font: inherit;
  color: ${Colors.black};
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  background: rgba(150, 150, 150, 0.0140385);
  border-bottom: 1px solid rgba(151, 151, 151, 0.280239);
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.0471755);
  box-sizing: border-box;
  padding: 20px 8px 8px;
  :focus {
    background: white;
  }
`;

const XDiv = styled.div`
  font-weight: 500;
  font-size: 40px;
  line-height: 49px;
  /* identical to box height */
  cursor: pointer;
  text-align: right;
  top: 40px;
  right: 40px;
  color: #ffffff;
  position: absolute;
  z-index: 6;

  :hover {
    transfrom: scale(1.02);
  }
`;

const FilterHolder = styled.div`
  width: 100%;
  border: solid 1px rgba(255, 255, 255, 0.2);
  padding-top: 6px;
  padding-bottom: 6px;
`;

const Item = styled.div`
  ${transitionCss}
  cursor: hover;
  display: flex;
  flex-direction: row;
  background: rgba(243, 243, 243, 0.272345);
  padding: 18px 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${Colors.text};
  align-content: center;
  justify-content: flex-start;
  border-bottom: solid 1px rgba(0, 0, 0, 0.0777699);

  :hover {
    background: white;
  }
`;

const ItemName = styled.div`
  flex: 1 1 auto;
  margin-right: auto;
  max-width: 250px;
`;

const ItemCity = styled.div`
  flex: 1 1 auto;
  margin-left: auto;
  max-width: 100px;
`;

const ItemZip = styled.div`
  flex: 1 1 auto;
  margin-left: auto;
  max-width: 100px;
`;

export default SearchOverlay;
