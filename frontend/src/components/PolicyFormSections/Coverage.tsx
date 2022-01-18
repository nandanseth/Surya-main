import React from 'react';
import { Form } from '../../styles/styles';
import autoEntryOptions from '../../utils/coverage/getAutoSymbolEntry';
import CoverageOptions from '../../utils/coverage/getLimit';
import SuryaSelect from '../PolicyFormSelect';

const {
  Section, SectionTitle, Flex, InputWrapper,
} = Form;

const {
  limitOptions,
  autoSymbolOptions,
  bodyPerPersonOptions,
  bodyPerAccidentOptions,
  propertyDamageOptions,
} = CoverageOptions;

const CoverageSection = ({ store }) => {
  const { coverage: coverageStates } = store;
  const  { values, setValues, errors, setErrors }  = coverageStates;

  const optional = new Set(['deductableAutoEntry', 'deductableAmount']);

  const deductableOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ];
  const overallOptions = [
    { value: 'Combined Single Limit', label: 'Combined Single Limit' },
    { value: 'Split Limit', label: 'Split Limit' },
  ];

  const {
    overall,
    deductable,
    deductableAmount,
    deductableAutoEntry,
    combinedSectionLimit,
    combinedSectionEntry,
    splitSectionBodyPerPerson,
    splitSectionBodyPerAccidentOptions,
    splitSectionPropertyDamageOptions,
    splitSectionAutoEntryOptions,
    pIProtectionSingleLimit,
    pIProtectionSingleEntry,
    pIProtectionSplitBodyPerPerson,
    pIProtectionSplitBodyPerAccident,
    pIProtectionSplitPropertyDamage,
    pIProtectionSplitAutoEntry,
    medicalSingleLimit,
    medicalSingleEntry,
    medicalSplitBodyPerPerson,
    medicalSplitBodyPerAccident,
    medicalSplitPropertyDamage,
    medicalSplitAutoEntry,
    underinsuredMotoristSingleLimit,
    underinsuredMotoristSingleAutoEntry,
    underMotoristBodyPerPerson,
    underMotoristBodyPerAccident,
    underMotoristProperty,
    underMotoristAuto,
    cslSingleLimit,
    cslBodyPerAccident,
    cslBodyPerPerson,
    cslSingleAuto,
    cslProperty,
    cslSplitAuto,
    nonCslBodyPerAccident,
    nonCslBodyPerPerson,
    nonCslProperty,
    nonCslSingleAuto,
    nonCslSingleLimit,
    nonCslSplitAuto,
    unMotoristAuto,
    unMotoristBodyPerAccident,
    unMotoristBodyPerPerson,
    unMotoristProperty,
    uninsuredMotoristSingleAutoEntry,
    uninsuredMotoristSingleLimit,
    personalInjury,
    medicalPayments,
    underinsuredMotorist,
    uninsuredMotorist,
    csl,
    nonOwnedCSL,
  } = values;

  const validate = () => {
    const keys = Object.keys(values);
    const errorsList = [];

    const isNotUndefinied = (item) => {
      if (optional.has(item)) {
        return true;
      }
      return values[item] !== null;
    };

    const map = keys.map(isNotUndefinied);

    const isValid = map.every((item) => {
      if (item !== true) {
        errorsList.push(item);
        return false;
      }
      return true;
    });
    if (isValid) {
      setErrors([]);
      return true;
    }

    setErrors(errorsList);
    return false;
  };

  const submit = () => validate();

  const combinedSection = (
    <>
      <Flex>
        <InputWrapper>
          <SuryaSelect
            options={limitOptions}
            placeholder="Choose Limit"
            label="Limit"
            value={combinedSectionLimit}
            onChange={(v) => {
              setValues({ ...values, combinedSectionLimit: v });
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <SuryaSelect
            options={autoEntryOptions}
            placeholder="Covered Auto Symbol Entry"
            label="Choose Auto Symbol"
            value={combinedSectionEntry}
            onChange={(v) => {
              setValues({ ...values, combinedSectionEntry: v });
            }}
          />
        </InputWrapper>
      </Flex>
    </>
  );

  const splitSection = (
    <>
      <Flex>
        <InputWrapper>
          <SuryaSelect
            options={bodyPerPersonOptions}
            placeholder="Choose Amount"
            label="Body Injury Per Person"
            value={splitSectionBodyPerPerson}
            onChange={(v) => {
              setValues({ ...values, splitSectionBodyPerPerson: v });
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <SuryaSelect
            options={bodyPerAccidentOptions}
            placeholder="Choose Amount"
            label="Body Injury Per Accident"
            value={splitSectionBodyPerAccidentOptions}
            onChange={(v) => {
              setValues({ ...values, splitSectionBodyPerAccidentOptions: v });
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <SuryaSelect
            options={propertyDamageOptions}
            placeholder="Choose Amount"
            label="Property Damage"
            value={splitSectionPropertyDamageOptions}
            onChange={(v) => {
              setValues({ ...values, splitSectionPropertyDamageOptions: v });
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <SuryaSelect
            options={autoEntryOptions}
            placeholder="Covered Auto Symbol Entry"
            label="Choose Auto Symbol"
            value={splitSectionAutoEntryOptions}
            onChange={(v) => {
              setValues({ ...values, splitSectionAutoEntryOptions: v });
            }}
          />
        </InputWrapper>
      </Flex>
    </>
  );

  const pIProtectionSingle = (
    <>
      <InputWrapper>
        <SuryaSelect
          options={limitOptions}
          placeholder="Choose Limit"
          label="Limit"
          value={pIProtectionSingleLimit}
          onChange={(v) => {
            setValues({ ...values, pIProtectionSingleLimit: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={pIProtectionSingleEntry}
          onChange={(v) => {
            setValues({ ...values, pIProtectionSingleEntry: v });
          }}
        />
      </InputWrapper>
    </>
  );

  const pIProtectionSplit = (
    <>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerPersonOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Person"
          value={pIProtectionSplitBodyPerPerson}
          onChange={(v) => {
            setValues({ ...values, pIProtectionSplitBodyPerPerson: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerAccidentOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Accident"
          value={pIProtectionSplitBodyPerAccident}
          onChange={(v) => {
            setValues({ ...values, pIProtectionSplitBodyPerAccident: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={propertyDamageOptions}
          placeholder="Choose Amount"
          label="Property Damage"
          value={pIProtectionSplitPropertyDamage}
          onChange={(v) => {
            setValues({ ...values, pIProtectionSplitPropertyDamage: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={pIProtectionSplitAutoEntry}
          onChange={(v) => {
            setValues({ ...values, pIProtectionSplitAutoEntry: v });
          }}
        />
      </InputWrapper>
    </>
  );

  const medicalSingle = (
    <>
      <InputWrapper>
        <SuryaSelect
          options={limitOptions}
          placeholder="Choose Limit"
          label="Limit"
          value={medicalSingleLimit}
          onChange={(v) => {
            setValues({ ...values, medicalSingleLimit: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={medicalSingleEntry}
          onChange={(v) => {
            setValues({ ...values, medicalSingleEntry: v });
          }}
        />
      </InputWrapper>
    </>
  );

  const medicalSplit = (
    <>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerPersonOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Person"
          value={medicalSplitBodyPerPerson}
          onChange={(v) => {
            setValues({ ...values, medicalSplitBodyPerPerson: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerAccidentOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Accident"
          value={medicalSplitBodyPerAccident}
          onChange={(v) => {
            setValues({ ...values, medicalSplitBodyPerAccident: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={propertyDamageOptions}
          placeholder="Choose Amount"
          label="Property Damage"
          value={medicalSplitPropertyDamage}
          onChange={(v) => {
            setValues({ ...values, medicalSplitPropertyDamage: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={medicalSplitAutoEntry}
          onChange={(v) => {
            setValues({ ...values, medicalSplitAutoEntry: v });
          }}
        />
      </InputWrapper>
    </>
  );

  const underinsuredMotoristSingle = (
    <>
      <InputWrapper>
        <SuryaSelect
          options={limitOptions}
          placeholder="Choose Limit"
          label="Limit"
          value={underinsuredMotoristSingleLimit}
          onChange={(v) => {
            setValues({ ...values, underinsuredMotoristSingleLimit: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={underinsuredMotoristSingleAutoEntry}
          onChange={(v) => {
            setValues({ ...values, underinsuredMotoristSingleAutoEntry: v });
          }}
        />
      </InputWrapper>
    </>
  );

  const underinsuredMotoristSplit = (
    <>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerPersonOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Person"
          value={underMotoristBodyPerPerson}
          onChange={(v) => {
            setValues({ ...values, underMotoristBodyPerPerson: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerAccidentOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Accident"
          value={underMotoristBodyPerAccident}
          onChange={(v) => {
            setValues({ ...values, underMotoristBodyPerAccident: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={propertyDamageOptions}
          placeholder="Choose Amount"
          label="Property Damage"
          value={underMotoristProperty}
          onChange={(v) => {
            setValues({ ...values, underMotoristProperty: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={underMotoristAuto}
          onChange={(v) => {
            setValues({ ...values, underMotoristAuto: v });
          }}
        />
      </InputWrapper>
    </>
  );

  const uninsuredMotoristSingle = (
    <>
      <InputWrapper>
        <SuryaSelect
          options={limitOptions}
          placeholder="Choose Limit"
          label="Limit"
          value={uninsuredMotoristSingleLimit}
          onChange={(v) => {
            setValues({ ...values, uninsuredMotoristSingleLimit: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={uninsuredMotoristSingleAutoEntry}
          onChange={(v) => {
            setValues({ ...values, uninsuredMotoristSingleAutoEntry: v });
          }}
        />
      </InputWrapper>
    </>
  );

  const uninsuredMotoristSplit = (
    <>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerPersonOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Person"
          value={unMotoristBodyPerPerson}
          onChange={(v) => {
            setValues({ ...values, unMotoristBodyPerPerson: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerAccidentOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Accident"
          value={unMotoristBodyPerAccident}
          onChange={(v) => {
            setValues({ ...values, unMotoristBodyPerAccident: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={propertyDamageOptions}
          placeholder="Choose Amount"
          label="Property Damage"
          value={unMotoristProperty}
          onChange={(v) => {
            setValues({ ...values, unMotoristProperty: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={unMotoristAuto}
          onChange={(v) => {
            setValues({ ...values, unMotoristAuto: v });
          }}
        />
      </InputWrapper>
    </>
  );

  const cslSingle = (
    <>
      <InputWrapper>
        <SuryaSelect
          options={limitOptions}
          placeholder="Choose Limit"
          label="Limit"
          value={cslSingleLimit}
          onChange={(v) => {
            setValues({ ...values, cslSingleLimit: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={cslSingleAuto}
          onChange={(v) => {
            setValues({ ...values, cslSingleAuto: v });
          }}
        />
      </InputWrapper>
    </>
  );

  const cslSplit = (
    <>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerPersonOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Person"
          value={cslBodyPerPerson}
          onChange={(v) => {
            setValues({ ...values, cslBodyPerPerson: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerAccidentOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Accident"
          value={cslBodyPerAccident}
          onChange={(v) => {
            setValues({ ...values, cslBodyPerAccident: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={propertyDamageOptions}
          placeholder="Choose Amount"
          label="Property Damage"
          value={cslProperty}
          onChange={(v) => {
            setValues({ ...values, cslProperty: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={cslSplitAuto}
          onChange={(v) => {
            setValues({ ...values, cslSplitAuto: v });
          }}
        />
      </InputWrapper>
    </>
  );

  const nonCslSingle = (
    <>
      <InputWrapper>
        <SuryaSelect
          options={limitOptions}
          placeholder="Choose Limit"
          label="Limit"
          value={nonCslSingleLimit}
          onChange={(v) => {
            setValues({ ...values, nonCslSingleLimit: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={nonCslSingleAuto}
          onChange={(v) => {
            setValues({ ...values, nonCslSingleAuto: v });
          }}
        />
      </InputWrapper>
    </>
  );

  const nonCslSplit = (
    <>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerPersonOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Person"
          value={nonCslBodyPerPerson}
          onChange={(v) => {
            setValues({ ...values, nonCslBodyPerPerson: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerAccidentOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Accident"
          value={nonCslBodyPerAccident}
          onChange={(v) => {
            setValues({ ...values, nonCslBodyPerAccident: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={propertyDamageOptions}
          placeholder="Choose Amount"
          label="Property Damage"
          value={nonCslProperty}
          onChange={(v) => {
            setValues({ ...values, nonCslProperty: v });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={nonCslSplitAuto}
          onChange={(v) => {
            setValues({ ...values, nonCslSplitAuto: v });
          }}
        />
      </InputWrapper>
    </>
  );

  return (
    <div>
      <Section>
        <SectionTitle> Overall </SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              options={overallOptions}
              placeholder="Choose Overall Coverage"
              label="Overall"
              onChange={(val) => {
                setValues({ ...values, overall: val });
              }}
              value={overall}
            />
          </InputWrapper>
        </Flex>

        {overall?.value === 'Combined Single Limit'
          ? combinedSection
          : splitSection}
      </Section>
      <Section>
        <SectionTitle>Personal Injury Protection</SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              options={overallOptions}
              placeholder="Choose Personal Injury Protection Coverage"
              label="Overall"
              onChange={(val) => {
                setValues({ ...values, personalInjury: val });
              }}
              value={personalInjury}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          {personalInjury?.value === 'Combined Single Limit'
            ? pIProtectionSingle
            : pIProtectionSplit}
        </Flex>
      </Section>
      <Section>
        <SectionTitle>Medical Payments</SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              options={overallOptions}
              placeholder="Choose Personal Injury Protection Coverage"
              label="Overall"
              onChange={(val) => {
                setValues({ ...values, medicalPayments: val });
              }}
              value={medicalPayments}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          {medicalPayments?.value === 'Combined Single Limit'
            ? medicalSingle
            : medicalSplit}
        </Flex>
      </Section>

      <Section>
        <SectionTitle>Underinsured Motorist</SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              options={overallOptions}
              placeholder="Choose Underinsured Motorist Coverage"
              label="Overall"
              onChange={(val) => {
                setValues({ ...values, underinsuredMotorist: val });
              }}
              value={underinsuredMotorist}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          {underinsuredMotorist?.value === 'Combined Single Limit'
            ? underinsuredMotoristSingle
            : underinsuredMotoristSplit}
        </Flex>
      </Section>

      <Section>
        <SectionTitle>Uninsured Motorist</SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              options={overallOptions}
              placeholder="Choose Underinsured Motorist Coverage"
              label="Overall"
              onChange={(val) => {
                setValues({ ...values, uninsuredMotorist: val });
              }}
              value={uninsuredMotorist}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          {uninsuredMotorist?.value === 'Combined Single Limit'
            ? uninsuredMotoristSingle
            : uninsuredMotoristSplit}
        </Flex>
      </Section>

      <Section>
        <SectionTitle>Hired CSL</SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]}
              placeholder="Choose CSL Coverage"
              label="Yes/No"
              onChange={(val) => {
                setValues({ ...values, csl: val });
              }}
              value={csl}
            />
          </InputWrapper>
        </Flex>
      </Section>
      <Section>
        <SectionTitle>Non-Owned CSL</SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]}
              placeholder="Choose Non Owned CSL Coverage"
              label="Overall"
              onChange={(val) => {
                setValues({ ...values, nonOwnedCSL: val });
              }}
              value={nonOwnedCSL}
            />
          </InputWrapper>
        </Flex>
      </Section>

      <Section>
        <SectionTitle>Deductable</SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              options={deductableOptions}
              placeholder="Yes/No"
              label="Deductable"
              onChange={(v) => {
                setValues({ ...values, deductable: v });
              }}
              value={deductable}
            />
          </InputWrapper>
          {deductable
            && (deductable?.value === 'Yes' ? (
              <>
                <InputWrapper>
                  <SuryaSelect
                    options={autoSymbolOptions}
                    placeholder="$$"
                    label="Amount"
                    value={deductableAmount}
                    onChange={(v) => {
                      setValues({ ...values, deductableAmount: v });
                    }}
                  />
                </InputWrapper>
                <InputWrapper>
                  <SuryaSelect
                    options={autoEntryOptions}
                    placeholder="$$"
                    label="Covered Auto Symbol Entry"
                    value={deductableAutoEntry}
                    onChange={(v) => {
                      setValues({ ...values, deductableAutoEntry: v });
                    }}
                  />
                </InputWrapper>
              </>
            ) : null)}
        </Flex>
      </Section>
    </div>
  );
};

export default CoverageSection;
