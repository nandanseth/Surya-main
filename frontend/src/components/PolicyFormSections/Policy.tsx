import React from 'react';
import { Form } from '../../styles/styles';
import {
  agentOptions, coverageTermOptions, lineOfBusinessOptions,
  policyCategoryOptions, policyLineItemOptions, statesOptions, underwritingCodeOptions
} from '../../utils/policies';
import { bussinessUseClassesOptions, classCodesOptions, radiusOptions, sizeClassOptions, } from '../../utils/policies/getCommercial';
import { classificationMap } from '../../utils/policies/getPolicyCategory';
import SuryaInput from '../PolicyFormInput';
import SuryaSelect from '../PolicyFormSelect';

const {
  Section,
  Flex,
  InputWrapper,
} = Form;

const PoliciesSection = ({ store }) => {
  const { policy: policyStates } = store;
  const  { values, setValues } = policyStates;

  const {
    states,
    lineOfBusiness,
    policyLineItem,
    coverageTerm,
    policyCategory,
    underwritingCode,
    agent,
    classification,
    effectiveDate,
    expirationDate,
    radius,
    classCode,
    sizeClass,
    businessUseClass
  } = values;

  const commercial = 1;

  return (
    <>
    <Section>

      <Flex>
        <InputWrapper>
          <SuryaSelect
            options={statesOptions}
            placeholder="States"
            label="What state will the policy be in?"
            value={states}
            onChange={(e) => {
              setValues({ ...values, states: e.target.value });
            }}

          />
        </InputWrapper>
      </Flex>
      <Flex>
        <InputWrapper>
          <SuryaInput 
              label="Effective Date"
              placeholder="MM/DD/YYYY"
              value={effectiveDate}
              onChange={(e) => {
                setValues({ ...values, effectiveDate: e.target.value });
              }}

          />
        </InputWrapper>
        <InputWrapper>
          <SuryaInput 
              label="Expiration Date"
              placeholder="MM/DD/YYYY"
              value={expirationDate}
              onChange={(e) => {
                setValues({ ...values, expirationDate: e.target.value });
              }}
          />
          </InputWrapper>
      </Flex>
      <Flex>
        <InputWrapper>
          <SuryaSelect
            options={lineOfBusinessOptions}
            placeholder="Line of Business"
            label="What line of business?"
            value={lineOfBusiness}
            onChange={(e) => {
              setValues({ ...values, lineOfBusiness: e.target.value });
            }}
          />
        </InputWrapper>
      </Flex>
    </Section>
   { lineOfBusiness !== null && ( <Section>
      <Flex>
        <InputWrapper>
          <SuryaSelect
            options={policyLineItemOptions}
            placeholder="Line Item"
            label="What type of drive?"
            value={policyLineItem}
            onChange={(e) => {
              setValues({ ...values, policyLineItem: e.target.value });
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <SuryaSelect
            options={coverageTermOptions}
            placeholder="Coverage Term"
            label="What is the coverage term?"
            value={coverageTerm}
            onChange={(e) => {
              setValues({ ...values, coverageTerm: e.target.value });
            }}
          />
        </InputWrapper>
        {
          lineOfBusiness === "Livery"? (
            <>
              <InputWrapper>
                <SuryaSelect
                  options={policyCategoryOptions}
                  placeholder="Category"
                  label="What is the category?"
                  value={policyCategory}
                  onChange={(e) => {
                    setValues({ ...values, policyCategory: e.target.value, classification: classificationMap[e.target.value][0].value });
                  }}
                />
              </InputWrapper>
              {
                policyCategory !== null && 
                (<InputWrapper>
                  <SuryaSelect
                    options={classificationMap[policyCategory?.value]}
                    placeholder="Category"
                    label="What is the classification?"
                    value={classification}
                    onChange={(e) => {
                      setValues({ ...values, classification: e.target.value });
                    }}
                  />
              </InputWrapper>)
              }
            </>)
          :

          (

            <>
                <InputWrapper>
                <SuryaSelect
                  options={sizeClassOptions}
                  placeholder="Category"
                  label="What is size class?"
                  value={sizeClass}
                  onChange={(e) => {
                    setValues({ ...values, sizeClass: e.target.value});
                  }}
                />
              </InputWrapper>
              <InputWrapper>
                <SuryaSelect
                  options={bussinessUseClassesOptions}
                  placeholder="Category"
                  label="What is the business use class?"
                  value={businessUseClass}
                  onChange={(e) => {
                    setValues({ ...values, businessUseClass: e.target.value });
                  }}
                />
              </InputWrapper>


            </>
            
          )
        }


        <InputWrapper>
          <SuryaSelect
            options={underwritingCodeOptions}
            placeholder="Underwriting code"
            label="Underwriting code"
            value={underwritingCode}
            onChange={(e) => {
              setValues({ ...values, underwritingCode: e.target.value });
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <SuryaSelect
            options={agentOptions}
            placeholder="Agent"
            label="Agent"
            value={agent}
            onChange={(e) => {
              setValues({ ...values, agent: e.target.value });
            }}
          />
        </InputWrapper>
      </Flex>
      <Flex>
        <InputWrapper>
          <SuryaSelect
              options={classCodesOptions}
              placeholder="Class code"
              label="What is the class code?"
              value={classCode}
              onChange={(e) => {
                setValues({ ...values, classCode: e.target.value });
              }}
            />
        </InputWrapper>
        <InputWrapper>
          <SuryaSelect
              options={radiusOptions}
              placeholder="radius"
              label="What is the radius?"
              value={radius}
              onChange={(e) => {
                setValues({ ...values, radius: e.target.value });
              }}
            />
        </InputWrapper>
      </Flex>

    </Section>) 
    }
    </>
  
  );
};

export default PoliciesSection;
