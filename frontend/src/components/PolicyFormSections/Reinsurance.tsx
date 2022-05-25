import React, { useState } from 'react';
import { Form } from '../../styles/styles';
import reinsuranceOptions from '../../utils/reinsurance/getReinsurer';
import Input from '../Input';
import SuryaSelect from '../PolicyFormSelect';

const {
  Section,
  SectionTitle,
  Flex,
  InputWrapper,
} = Form;

const ReSection = () => {
  const [reIns, setReIns] = useState(undefined);
  const [resInsAmmout, setAmount] = useState('');

  const inputLabel = reIns === 'Price Forbes' ? 'Reinsurance Percentage' : 'Reinsurance Amount';

  return (
    <div>
      <Section>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              options={reinsuranceOptions}
              placeholder="Reinsurer"
              label="Reinsurer"
              onChange={(val) => {
                setReIns(val);
              }}
              value={reIns}
            />
          </InputWrapper>
          </Flex>
          <Flex>

          {
            reIns !== undefined && (
              <InputWrapper>
                <Input
                  value={resInsAmmout}
                  label={inputLabel}
                  placeholder={inputLabel}
                  onChange={(e) => {
                    setAmount(e.target.value);
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

export default ReSection;
