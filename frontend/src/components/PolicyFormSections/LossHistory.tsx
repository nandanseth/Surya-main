import React from 'react';
import styled from 'styled-components';
import { yesNoOptions } from '../../context/insured-context';
import { ButtonHolder, Form } from '../../styles/styles';
import { Save } from '../Buttons';
import SuryaInput from '../PolicyFormInput';
import SuryaSelect from '../PolicyFormSelect';

const {
  Section,
  SectionTitle,
  Flex,
  InputWrapper,
} = Form;

const title = 'Loss History';

const LossHistory = ({ store }) => {
  const { lossHistory: lossStates } = store;
  const  { values, setValues, defaults }  = lossStates;

  const removeFields = (i) => {
    if (values.length <= 0) {
      setValues([{ ...defaults }]);
      return;
    }

    const newArray = [...values];
    newArray.splice(i, 1);
    setValues(newArray);
  };

  const addFields = () => {
    setValues([...values, { ...defaults }]);
  };

  const dTitle = 'Loss History';

  const DefaultFields = ({ num = 0 } : { num?: number }) => {
    // render regular HTML input elemen

    const handleInputOnChange = (e) => {
      const copy = [...values];
      copy[num][e.target.name] = e.target.value;
      setValues(copy);
    };

    return (
      <DarkSection>
        <SectionTitle>{dTitle}</SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaInput
              value={values[num].accidentDate}
              onChange={handleInputOnChange}
              name="accidentDate"
              label="Accident Date"
              placeholder="MM/DD/YYYY"
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              value={values[num].reportedDate}
              onChange={handleInputOnChange}
              name="reportedDate"
              label="Reported Date"
              placeholder="MM/DD/YYYY"
            />
          </InputWrapper>
        </Flex>
        <Flex>
          <InputWrapper>
            <SuryaInput
              name="claimNumber"
              label="Claim Number"
              placeholder="claim number"
              value={values[num].claimNumber}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              name="subClaimNumber"
              label="Sub - Claim Number"
              placeholder="sub-claim number"
              value={values[num].subClaimNumber}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaSelect
              label="Claim Type"
              placeholder="Claim Type"
              options={[{ value: 'Body Injury', label: 'Body Injury'}, { value: 'Property Damage', label: 'Property Damage'},
              { value: 'Medical', label: 'Medical'}, { value: 'Uninsured Motorist', label: 'Uninsured Motorist'},
            ]}
              value={values[num].claimType}
              onChange={(e) => {
                const copy = [...values];
                copy[num].claimType = e.target.value;
                setValues(copy);
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              name="totalIncurred"
              label="Total Incurred"
              placeholder="claimType"
              value={values[num].totalIncurred}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          <SuryaSelect
            options={yesNoOptions}
            placeholder="Status"
            label="Open Or Closed Status"
            value={values[num].status}
            onChange={(e) => {
              const copy = [...values];
              copy[num].status = e.target.value;
              setValues(copy);
            }}
          />
        </Flex>
        <Flex>
          <InputWrapper>
            <SuryaInput
              name="previousPolicyNumber"
              label="Previous Policy Number"
              placeholder="Prev Policy #"
              value={values[num].previousPolicyNumber}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              name="priorCarrierName"
              label="Prior Carrier Name"
              placeholder="Prev Policy #"
              value={values[num].priorCarrierName}
              onChange={handleInputOnChange}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              value={values[num].originalInceptionDate}
              onChange={handleInputOnChange}
              name="originalInceptionDate"
              label="Original Inception Date"
              placeholder="MM/DD/YYYY"
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              value={values[num].expirationDate}
              onChange={handleInputOnChange}
              name="expirationDate"
              label="Expiration Date"
              placeholder="MM/DD/YYYY"
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaSelect
              options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
              placeholder="Yes/No"
              label="Is Experience Mode"
              value={values[num].isExperienceMode}
              onChange={(e) => {
                const copy = [...values];
                copy[num].isExperienceMode = e.target.value;
                setValues(copy);
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaSelect
              options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
              placeholder="Yes/No"
              label="Is Policy Transferred"
              value={values[num].isPolicyTransferred}
              onChange={(e) => {
                const copy = [...values];
                copy[num].isPolicyTransferred =  e.target.value;
                setValues(copy);
              }}
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
      </DarkSection>
    );
  };

  return (
    <Wrapper>
      <Center>
        <StyledTitle>
          {title}
        </StyledTitle>
        <StyledHolder>
          <Add onClick={addFields}>+ Add Loss</Add>
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

const DarkSection = styled(Section)`
    border: solid 1px #0000001a;
    background: #00000003;
    padding: 10px;
    border-radius: 4px;
`;

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

export default LossHistory;
