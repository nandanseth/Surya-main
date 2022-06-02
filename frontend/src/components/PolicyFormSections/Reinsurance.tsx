import React from 'react';
import { Form } from '../../styles/styles';
import reinsuranceOptions, { zero } from '../../utils/reinsurance/getReinsurer';
import Input from '../Input';
import SuryaSelect from '../PolicyFormSelect';

const {
  Section,
  Flex,
  InputWrapper,
} = Form;

const ReinusranceSection = ({ store }) => {
  const { reinsurance: reinsuranceStates } = store;
  const  { values, setValues } = reinsuranceStates; 
  const { reinsuranceType, resInsAmmout } = values;

  const inputLabel = reinsuranceType === 'Price Forbes' ? 'Reinsurance Percentage' : 'Reinsurance Amount';

  return (
    <div>
      <Section>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              options={reinsuranceOptions}
              placeholder="Reinsurer"
              label="Reinsurer"
              onChange={(e) => {
                setValues({ ...values, reinsuranceType: e.target.value });
              }}
              value={reinsuranceType}
            />
          </InputWrapper>
          </Flex>
          <Flex>

          {
            reinsuranceType !== undefined && reinsuranceType !== zero && (
              <InputWrapper>
                <Input
                  value={resInsAmmout}
                  label={inputLabel}
                  placeholder={inputLabel}
                  onChange={(e) => {
                    setValues({ ...values, resInsAmmout: e.target.value });
                  }}
                />
              </InputWrapper>
            )
          }
        </Flex>
      </Section>
    </div>
  );
};

export default ReinusranceSection;
