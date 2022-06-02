import { Form } from '../../styles/styles';
import Input from '../Input';
import React from 'react';
import reinsuranceOptions, { zero } from '../../utils/reinsurance/getReinsurer';
import SuryaSelect from '../PolicyFormSelect';

const { Section, Flex, InputWrapper } = Form;

const ReinusranceSection = ({ store }) => {
  const { reinsurance: reinsuranceStates } = store;
  const { values, setValues } = reinsuranceStates;
  const { reinsuranceType, resInsAmmout } = values;

  const inputLabel = reinsuranceType === 'Price Forbes' ? 'Reinsurance Percentage' : 'Reinsurance Amount';

  return (
    <div>
      <Section>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              label="Reinsurer"
              onChange={(e) => {
                setValues({ ...values, reinsuranceType: e.target.value });
              }}
              options={reinsuranceOptions}
              placeholder="Reinsurer"
              value={reinsuranceType}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          {reinsuranceType !== undefined && reinsuranceType !== zero && (
            <InputWrapper>
              <Input
                label={inputLabel}
                onChange={(e) => {
                  setValues({ ...values, resInsAmmout: e.target.value });
                }}
                placeholder={inputLabel}
                value={resInsAmmout}
              />
            </InputWrapper>
          )}
        </Flex>
      </Section>
    </div>
  );
};

export default ReinusranceSection;
