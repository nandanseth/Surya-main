import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ButtonHolder, Colors, Form, transitionCss
} from '../../styles/styles';
import { agentOptions, entityTypeOptions, statesOptions } from '../../utils/policies';
import { Cancel, Save } from '../Buttons';
import Overlay from '../Overlay';
import SuryaInput from '../PolicyFormInput';
import SuryaSelect from '../PolicyFormSelect';
import SearchOverlay from '../SearchOverlay';

const {
  Section, SectionTitle, Flex, InputWrapper,
} = Form;

const search = '+ Search New Insured';
const add = '+ Add New Insured';
const insuredText = 'Choose Insured';

const personTitle = 'Personal Info';
const corpTitle = 'Coporation Info';


const Insured = ({ store }) => {
  const { insured: insuredStates } = store;

  const  { values, setValues, isAddActive, setAddActive } = insuredStates;
  const [searchActive, setSearchActive] = useState(false);

  const handleInputOnChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
      <div>
        <SuryaSelect
          options={agentOptions}
          placeholder="Agent"
          label="Agent"
          value={values.agent}
          onChange={(v) => {
            setValues({ ...values, agent: v });
          }}
        />
        <Section>
          <SectionTitle>{insuredText}</SectionTitle>
          <ButtonFlex>
            <SearchInsuredButton onClick={() => {
              setSearchActive(true);
            }}>{search}</SearchInsuredButton>
            <NewInsuredButton onClick={() => {
              setAddActive(true);
            }}>{add}</NewInsuredButton>
          </ButtonFlex>
        </Section>
        { isAddActive && (
        <Section>
          <SectionTitle>New Insured</SectionTitle>

          <NewInsuredSection
              setInactive={() => {
                setAddActive(false);
              }}
              values={values}
              setValues={setValues}
              handleInputOnChange={handleInputOnChange}
            />
        </Section>) 
        }
        <Overlay show={searchActive}>
          <SearchOverlay
            close={() => {
              setSearchActive(false);
            }}
          />
        </Overlay>
      </div>
  );
};

const NewInsuredSection = ({
  values,
  setValues,
  handleInputOnChange,
  setInactive,
}) => {

  return  (
    <>
      <Section>
        <Flex>
          <SuryaSelect
            options={entityTypeOptions}
            placeholder="Entity"
            label="What entity?"
            value={values.entity}
            onChange={(v) => {
              setValues({ ...values, entity: v });
            }}
          />
        </Flex>
      </Section>

      {
        values.entity?.value === 'Corporation' && (
          <Section>
              <SectionTitle>{corpTitle}</SectionTitle>
              <Flex>
                <InputWrapper>
                  <SuryaInput
                    name="corporationName"
                    label="Corporation Name"
                    placeholder=""
                    value={values.corporationName}
                    onChange={handleInputOnChange}
                  />
               </InputWrapper>
               <InputWrapper>
                  <SuryaInput
                    name="taxIdNumber"
                    label="Tax ID Number"
                    placeholder=""
                    value={values.taxIdNumber}
                    onChange={handleInputOnChange}
                  />
               </InputWrapper>
            </Flex>

          </Section>
        )

      }



      {
        values.entity?.value === 'Individual' &&
      (
      <Section>
        <SectionTitle>{personTitle}</SectionTitle>
        <Flex> 
            <InputWrapper>
              <SuryaInput
                name="firstName"
                label="First Name"
                placeholder=""
                value={values.firstName}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaInput
                name="lastName"
                label="Last Name"
                placeholder=""
                value={values.lastName}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaInput
                name="middleName"
                label="Middle Name **optional**"
                placeholder=""
                value={values.middleName}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaInput
                name="dob"
                label="Date Of Birth mm/dd/yyyy"
                placeholder="mm/dd/yyyy"
                value={values.dob}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaInput
                name="suffix"
                label="Suffix **optional**"
                placeholder=""
                value={values.suffix}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
            <SuryaSelect
              options={entityTypeOptions}
              placeholder="Gender"
              label="Choose gender"
              value={values.gender}
              onChange={(v) => {
                setValues({ ...values, gender: v });
              }}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          <SuryaInput
            name="ssn"
            label="SSN"
            placeholder=""
            value={values.ssn}
            onChange={handleInputOnChange}
          />
        </Flex>
      </Section>)
      }
      <Section>
        <Flex>
          <SuryaInput
            name="address1"
            label="Address Line 1"
            placeholder=""
            value={values.address1}
            onChange={handleInputOnChange}
          />
        </Flex>
        <Flex>
          <InputWrapper>
            <SuryaInput
              name="address2"
              label="Address Line 2"
              placeholder=""
              value={values.address2}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              name="city"
              label="City"
              placeholder=""
              value={values.city}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              name="state"
              label="State"
              placeholder=""
              value={values.state}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          <InputWrapper>
            <SuryaInput
              name="zipCode"
              label="Zip Code"
              placeholder=""
              value={values.zipCode}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              name="email"
              label="Email"
              placeholder=""
              value={values.email}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              name="phoneNumber"
              label="Phone Number"
              placeholder=""
              value={values.phoneNumber}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
        </Flex>
      </Section>
      <Section>
        <SectionTitle>License State Info</SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              label="License State"
              placeholder="State"
              options={statesOptions}
              value={values.licenseState}
              onChange={(v) => {
                setValues({ ...values, licenseState: v });
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              name="licenseNumber"
              label="License Number"
              placeholder="#"
              value={values.licenseNumber}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              value={values.licenseEffDate}
              onChange={(v) => {
                setValues({ ...values, licenseEffDate: v });
              }}
              label="License Effective Date"
              placeholder="MM/DD/YYYY"
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              value={values.licenseExpDate}
              onChange={(v) => {
                setValues({ ...values, licenseExpDate: v });
              }}
              label="License Expiration Date"
              placeholder="MM/DD/YYYY"
            />
          </InputWrapper>
        </Flex>
      </Section>
      <Section>
        <SectionTitle>Contact Person</SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaInput
              name="contactName"
              label="Contact Name"
              placeholder=""
              value={values.contactName}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              name="contactNumber"
              label="Contact Phone Number"
              placeholder=""
              value={values.contactNumber}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              name="contactEmail"
              label="Contact Email"
              placeholder=""
              value={values.contactEmail}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
        </Flex>
      </Section>
      <ButtonHolderStyled>
        <CancelButton onClick={() => {
          setInactive();
        }}>Cancel </CancelButton>
      </ButtonHolderStyled>
    </>
  );
};

const NewInsuredButton = styled.button`
  background: linear-gradient(
    116.57deg,
    rgba(52, 152, 194, 0.1) 0%,
    rgba(3, 205, 174, 0.1) 83.33%
  );
  mix-blend-mode: normal;
  border: 1px solid ${Colors.green};
  box-sizing: border-box;
  border-radius: 3px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  color: ${Colors.green};
  padding: 18px;
  flex: 1 1 auto;
  margin: 5px 10px;
  margin-left: 0;
  ${transitionCss}
  :hover {
    opacity: 0.7;
  }
`;

const SearchInsuredButton = styled(NewInsuredButton)`
  background: transparent;
`;

const ButtonFlex = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const SaveButton = styled(Save)`
  width: 100%;
  margin: 0 10px;
`;

const CancelButton = styled(Cancel)`
  width: 100%;
  margin: 0 10px;
`;

const ButtonHolderStyled = styled(ButtonHolder)`
  margin: 0;
  margin-left: auto;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export default Insured;
