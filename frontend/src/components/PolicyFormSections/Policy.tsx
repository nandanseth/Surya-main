import {
  agentOptions,
  coverageTermOptions,
  lineOfBusinessOptions,
  policyCategoryOptions,
  policyLineItemOptions,
  statesOptions,
  underwritingCodeOptions,
} from '../../utils/policies';
import {
  bussinessUseClassesOptions,
  classCodesOptions,
  radiusOptions,
  sizeClassOptions,
} from '../../utils/policies/getCommercial';
import { classificationMap } from '../../utils/policies/getPolicyCategory';
import { Form } from '../../styles/styles';
import React from 'react';
import SuryaInput from '../PolicyFormInput';
import SuryaSelect from '../PolicyFormSelect';

const { Section, Flex, InputWrapper } = Form;

const PoliciesSection = ({ store }) => {
  const { policy: policyStates } = store;
  const { values, setValues } = policyStates;

  const {
    policyNum,
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
    businessUseClass,
  } = values;

  const commercial = 1;

  return (
    <>
      <Section>
        <Flex>
          <InputWrapper>
            <SuryaInput
              label="Policy Number"
              onChange={(e) => {
                setValues({ ...values, policyNum: e.target.value });
              }}
              placeholder="MM/DD/YYYY"
              value={policyNum}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              label="What state will the policy be in?"
              onChange={(e) => {
                setValues({ ...values, states: e.target.value });
              }}
              options={statesOptions}
              placeholder="States"
              value={states}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          <InputWrapper>
            <SuryaInput
              label="Effective Date"
              onChange={(e) => {
                setValues({ ...values, effectiveDate: e.target.value });
              }}
              placeholder="MM/DD/YYYY"
              value={effectiveDate}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaInput
              label="Expiration Date"
              onChange={(e) => {
                setValues({ ...values, expirationDate: e.target.value });
              }}
              placeholder="MM/DD/YYYY"
              value={expirationDate}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              label="What line of business?"
              onChange={(e) => {
                setValues({ ...values, lineOfBusiness: e.target.value });
              }}
              options={lineOfBusinessOptions}
              placeholder="Line of Business"
              value={lineOfBusiness}
            />
          </InputWrapper>
        </Flex>
      </Section>
      <Section>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              label="What type of drive?"
              onChange={(e) => {
                setValues({ ...values, policyLineItem: e.target.value });
              }}
              options={policyLineItemOptions}
              placeholder="Line Item"
              value={policyLineItem}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaSelect
              label="What is the coverage term?"
              onChange={(e) => {
                setValues({ ...values, coverageTerm: e.target.value });
              }}
              options={coverageTermOptions}
              placeholder="Coverage Term"
              value={coverageTerm}
            />
          </InputWrapper>
          {lineOfBusiness === 'Livery' ? (
            <>
              <InputWrapper>
                <SuryaSelect
                  label="What is the category?"
                  onChange={(e) => {
                    setValues({
                      ...values,
                      policyCategory: e.target.value,
                      classification: classificationMap[e.target.value][0].value,
                    });
                  }}
                  options={policyCategoryOptions}
                  placeholder="Category"
                  value={policyCategory}
                />
              </InputWrapper>
              {policyCategory !== null ||
                (policyCategory !== '' && (
                  <InputWrapper>
                    <SuryaSelect
                      label="What is the classification?"
                      onChange={(e) => {
                        setValues({ ...values, classification: e.target.value });
                      }}
                      options={classificationMap[policyCategory?.value]}
                      placeholder="Category"
                      value={classification}
                    />
                  </InputWrapper>
                ))}
            </>
          ) : (
            <>
              <InputWrapper>
                <SuryaSelect
                  label="What is size class?"
                  onChange={(e) => {
                    setValues({ ...values, sizeClass: e.target.value });
                  }}
                  options={sizeClassOptions}
                  placeholder="Category"
                  value={sizeClass}
                />
              </InputWrapper>
              <InputWrapper>
                <SuryaSelect
                  label="What is the business use class?"
                  onChange={(e) => {
                    setValues({ ...values, businessUseClass: e.target.value });
                  }}
                  options={bussinessUseClassesOptions}
                  placeholder="Category"
                  value={businessUseClass}
                />
              </InputWrapper>
            </>
          )}

          <InputWrapper>
            <SuryaSelect
              label="Underwriting code"
              onChange={(e) => {
                setValues({ ...values, underwritingCode: e.target.value });
              }}
              options={underwritingCodeOptions}
              placeholder="Underwriting code"
              value={underwritingCode}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaSelect
              label="Agent"
              onChange={(e) => {
                setValues({ ...values, agent: e.target.value });
              }}
              options={agentOptions}
              placeholder="Agent"
              value={agent}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              label="What is the class code?"
              onChange={(e) => {
                setValues({ ...values, classCode: e.target.value });
              }}
              options={classCodesOptions}
              placeholder="Class code"
              value={classCode}
            />
          </InputWrapper>
          <InputWrapper>
            <SuryaSelect
              label="What is the radius?"
              onChange={(e) => {
                setValues({ ...values, radius: e.target.value });
              }}
              options={radiusOptions}
              placeholder="radius"
              value={radius}
            />
          </InputWrapper>
        </Flex>
      </Section>
    </>
  );
};

export default PoliciesSection;
