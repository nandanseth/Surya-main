import { ButtonHolder, Form } from '../../styles/styles';
import { Save } from '../Buttons';
import { statesOptions } from '../../utils/policies';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import SuryaInput from '../PolicyFormInput';
import SuryaSelect from '../PolicyFormSelect';

const { Section, SectionTitle, Flex, InputWrapper } = Form;

const title = 'Drivers';

const DriversSection = ({ store }) => {
  const { drivers: driverStates } = store;
  const { values, setValues, defaults } = driverStates;

  useEffect(() => {
    setValues([{ ...defaults, states: 'Oregon' }]);
  }, []);

  const addFields = () => {
    setValues([...values, { ...defaults, states: 'Oregon' }]);
  };
  const removeFields = (i) => {
    if (values.length <= 0) {
      setValues([{ ...defaults, states: 'Oregon' }]);
      return;
    }

    const newArray = [...values];
    newArray.splice(i, 1);
    setValues(newArray);
  };

  const DefaultFields = ({ num = 0 }: { num?: number }) => {
    const handleInputOnChange = (e) => {
      const copy = [...values];
      copy[num][e.target.name] = e.target.value;
      setValues(copy);
    };

    const handleSelectOnChange = (e, propertyName) => {
      const copy = [...values];
      copy[num][propertyName] = e.target.value;
      setValues(copy);
    };

    return (
      <div>
        <Section>
          <Flex>
            <InputWrapper>
              <SuryaInput
                //options={driversOptions}
                label="What is the name of the driver?"
                name="driverName"
                onChange={handleInputOnChange}
                placeholder="Driver Name"
                value={values[num].driverName}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaSelect
                label="Driver state"
                onChange={(v) => {
                  handleSelectOnChange(v, 'states');
                }}
                options={statesOptions}
                placeholder=" state"
                value={values[num].states}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaInput
                label="License Number"
                name="licenseNumber"
                onChange={handleInputOnChange}
                placeholder="License Number"
                value={values[num].licenseNumber}
              />
            </InputWrapper>
          </Flex>
          <Flex>
            <InputWrapper>
              <SuryaInput
                label="License Effective Date"
                name="licenseEffDate"
                onChange={handleInputOnChange}
                placeholder="MM/DD/YYYY"
                value={values[num].licenseEffDate}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaInput
                label="License Expiration Date"
                name="licenseExpDate"
                onChange={handleInputOnChange}
                placeholder="MM/DD/YYYY"
                value={values[num].licenseExpDate}
              />
            </InputWrapper>
          </Flex>
          <Flex>
            <div style={{ marginLeft: 'auto' }}>
              <StyledCancel
                onClick={() => {
                  removeFields(num);
                }}
              >
                Cancel
              </StyledCancel>
            </div>
          </Flex>
        </Section>
      </div>
    );
  };

  return (
    <Wrapper>
      <Center>
        <StyledTitle>{title}</StyledTitle>
        <StyledHolder>
          <Add onClick={addFields}>+ Add Driver</Add>
        </StyledHolder>
      </Center>
      <div>
        {values.map((key, i) => {
          const toReturn = DefaultFields({ num: i });
          return <React.Fragment key={i}>{toReturn}</React.Fragment>;
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
    background: rgba(89, 195, 179, 0.125683);
  }
`;
export default DriversSection;
