import React from 'react';
import styled from 'styled-components';
import { ButtonHolder, Form } from '../../styles/styles';
import { statesOptions } from '../../utils/policies';
import { Save } from '../Buttons';
import SuryaInput from '../PolicyFormInput';
import SuryaSelect from '../PolicyFormSelect';

const {
  Section, SectionTitle, Flex, InputWrapper,
} = Form;

const title = 'Drivers';

const driversOptions = [];


const DriversSection = ({ store }) => {
  const { drivers: driverStates } = store;
  const  { values, setValues, defaults } = driverStates;
  console.log({ values, setValues, defaults });

  const addFields = () => {
    setValues([...values, { ...defaults }]);
  };
  const removeFields = (i) => {
    if (values.length <= 0) {
      setValues([{ ...defaults }]);
      return;
    }

    const newArray = [...values];
    newArray.splice(i, 1);
    setValues(newArray);
  };

  const DefaultFields = ({ num = 0 } : { num?: number }) => {
    const handleInputOnChange = (e) => {
      const copy = [...values];
      copy[num][e.target.name] = e.target.value;
      setValues(copy);
    };

    const handleSelectOnChange = (v, propertyName) => {
      const copy = [ ...values ];
      copy[num][propertyName] = v;
      setValues(copy);
    }

    return (
      <div>
        <Section>
          <Flex>
            <InputWrapper>
              <SuryaSelect
                options={driversOptions}
                placeholder="Driver Name"
                label="What is the name of the driver?"
                value={values[num].driverName}
                onChange={(v) => {
                  handleSelectOnChange(v, 'driverName');
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaSelect
                options={statesOptions}
                placeholder=" state"
                label="Driver state"
                value={values[num].states}
                onChange={(v) => {
                  handleSelectOnChange(v, 'states');
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaInput
                label="License Number"
                placeholder="License Number"
                value={values[num].licenseNumber}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
          </Flex>
          <Flex>
            <InputWrapper>
              <SuryaInput
                value={values[num].licenseEffDate}
                placeholder="MM/DD/YYYY"
                onChange={handleInputOnChange}
                label="License Effective Date"
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaInput
                placeholder="MM/DD/YYYY"
                value={values[num].licenseExpDate}
                onChange={handleInputOnChange}
                label="License Expiration Date"
              />
            </InputWrapper>
          </Flex>
          <Flex>
            <div style={{ marginLeft: 'auto' }}>
              <StyledCancel onClick={() => {
                removeFields(num);
              }}
              >
                Cancel
              </StyledCancel>
            </div>
          </Flex>
        </Section>
      </div>
    )
  }

  return (
    <Wrapper>
      <Center>
        <StyledTitle>
          {title}
        </StyledTitle>
        <StyledHolder>
        <Add onClick={addFields}>+ Add Driver</Add>
        </StyledHolder>
      </Center>
      <div>
        {values.map((key, i) => {
          const toReturn = DefaultFields({ num: i });
          return (
            <React.Fragment key={i}>
              { toReturn }
            </React.Fragment>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    padding: 8px;
    width: 100%;
`;

const Add = styled(Save)`
  max-width: 200px;
  width: 100%;
  margin-left: auto;
  font-weight: 500;
  padding: 12px;
  font-size: 14px;
`;

const StyledHolder = styled(ButtonHolder)`
  margin: 0;
  margin-left: auto;
`;

const StyledTitle = styled(SectionTitle)`
  width: auto;
`;

const Center = styled(Flex)`
  align-items: center;
  margin-bottom: 8px;
`;

const StyledCancel = styled(Add)`
  background: #f4f5f6;
  padding: 12px 40px;
  min-width: 200px;
  color: #3a5665;

  &:hover {
    background: rgba(89,195,179,0.125683);
  }
`;
export default DriversSection;
