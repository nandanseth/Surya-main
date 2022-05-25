import React, { useEffect } from 'react';
import { Form } from '../../styles/styles';
import autoEntryOptions, { auto } from '../../utils/coverage/getAutoSymbolEntry';
import CoverageOptions, { limits, bodyPerPerson, bodyPerAccident, propertyDamage } from '../../utils/coverage/getLimit';
import SuryaInput from '../PolicyFormInput';
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


const deductableOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
];
const overallOptions = [
  { value: 'Combined Single Limit', label: 'Combined Single Limit' },
  { value: 'Split Limit', label: 'Split Limit' },
];

const CoverageSection = ({ store }) => {
  const { coverage: coverageStates } = store;
  const  { values, setValues, errors, setErrors }  = coverageStates;

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
    overallPremium,
    personalInjuryProtectionPremium,
    medicalPaymentsPremium,
    underinsuredMotoristPremium,
    uninsuredMotoristPremium,
    hiredCSLPremium,
    nonOwnedCSLPremium,
  } = values;

  useEffect(() => {
    setValues({ ...values, 
      overall: 'Combined Single Limit',
      deductable,
      deductableAmount,
      deductableAutoEntry,
      combinedSectionLimit: limits[0],
      combinedSectionEntry: auto[0],
      splitSectionBodyPerPerson: bodyPerPerson[0],
      splitSectionBodyPerAccidentOptions: bodyPerAccident[0],
      splitSectionPropertyDamageOptions: propertyDamage[0],
      splitSectionAutoEntryOptions: auto[0],
      pIProtectionSingleLimit: limits[0],
      pIProtectionSingleEntry: auto[0],
      pIProtectionSplitBodyPerPerson: bodyPerPerson[0],
      pIProtectionSplitBodyPerAccident: bodyPerAccident[0],
      pIProtectionSplitPropertyDamage: propertyDamage[0],
      pIProtectionSplitAutoEntry: auto[0],
      medicalSingleLimit: limits[0],
      medicalSingleEntry: auto[0],
      medicalSplitBodyPerPerson: bodyPerPerson[0],
      medicalSplitBodyPerAccident: bodyPerAccident[0],
      medicalSplitPropertyDamage: propertyDamage[0],
      medicalSplitAutoEntry: auto[0],
      underinsuredMotoristSingleLimit: limits[0],
      underinsuredMotoristSingleAutoEntry: auto[0],
      underMotoristBodyPerPerson: bodyPerPerson[0],
      underMotoristBodyPerAccident: bodyPerAccident[0],
      underMotoristProperty: propertyDamage[0],
      underMotoristAuto: auto[0],
      cslSingleLimit: limits[0],
      cslBodyPerAccident: bodyPerAccident[0],
      cslBodyPerPerson: bodyPerPerson[0],
      cslSingleAuto: auto[0],
      cslProperty: propertyDamage[0],
      cslSplitAuto: auto[0],
      nonCslBodyPerAccident: bodyPerAccident[0],
      nonCslBodyPerPerson: bodyPerPerson[0],
      nonCslProperty: propertyDamage[0],
      nonCslSingleAuto: auto[0],
      nonCslSingleLimit: limits[0],
      nonCslSplitAuto: auto[0],
      unMotoristAuto: auto[0],
      unMotoristBodyPerAccident: bodyPerAccident[0],
      unMotoristBodyPerPerson: bodyPerPerson[0],
      unMotoristProperty: propertyDamage[0],
      uninsuredMotoristSingleAutoEntry: auto[0],
      uninsuredMotoristSingleLimit: limits[0],
      personalInjury: 'Combined Single Limit',
      medicalPayments: 'Combined Single Limit',
      underinsuredMotorist: 'Combined Single Limit',
      uninsuredMotorist: 'Combined Single Limit',
      csl: 'Yes',
      nonOwnedCSL: 'Yes',

      overallPremium: '',
      personalInjuryProtectionPremium: '',
      medicalPaymentsPremium: '',
      underinsuredMotoristPremium: '',
      uninsuredMotoristPremium: '',
      hiredCSLPremium: '',
      nonOwnedCSLPremium: '',
    })
  }, []);
   

  // const validate = () => {
  //   const keys = Object.keys(values);
  //   const errorsList = [];

  //   const isNotUndefinied = (item) => {
  //     if (optional.has(item)) {
  //       return true;
  //     }
  //     return values[item] !== null;
  //   };

  //   const map = keys.map(isNotUndefinied);

  //   const isValid = map.every((item) => {
  //     if (item !== true) {
  //       errorsList.push(item);
  //       return false;
  //     }
  //     return true;
  //   });
  //   if (isValid) {
  //     setErrors([]);
  //     return true;
  //   }

  //   setErrors(errorsList);
  //   return false;
  // };

  const combinedSection = (
    <>
      <Flex>
        <InputWrapper>
          <SuryaSelect
            options={limitOptions}
            placeholder="Choose Limit"
            label="Limit"
            value={combinedSectionLimit}
            onChange={(e) => {
              setValues({ ...values, combinedSectionLimit: e.target.value });
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <SuryaSelect
            options={autoEntryOptions}
            placeholder="Covered Auto Symbol Entry"
            label="Choose Auto Symbol"
            value={combinedSectionEntry}
            onChange={(e) => {
              setValues({ ...values, combinedSectionEntry: e.target.value});
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
            onChange={(e) => {
              setValues({ ...values, splitSectionBodyPerPerson: e.target.value });
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <SuryaSelect
            options={bodyPerAccidentOptions}
            placeholder="Choose Amount"
            label="Body Injury Per Accident"
            value={splitSectionBodyPerAccidentOptions}
            onChange={(e) => {
              setValues({ ...values, splitSectionBodyPerAccidentOptions: e.target.value});
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <SuryaSelect
            options={propertyDamageOptions}
            placeholder="Choose Amount"
            label="Property Damage"
            value={splitSectionPropertyDamageOptions}
            onChange={(e) => {
              setValues({ ...values, splitSectionPropertyDamageOptions: e.target.value });
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <SuryaSelect
            options={autoEntryOptions}
            placeholder="Covered Auto Symbol Entry"
            label="Choose Auto Symbol"
            value={splitSectionAutoEntryOptions}
            onChange={(e) => {
              setValues({ ...values, splitSectionAutoEntryOptions: e.target.value });
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
          onChange={(e) => {
            setValues({ ...values, pIProtectionSingleLimit: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={pIProtectionSingleEntry}
          onChange={(e) => {
            setValues({ ...values, pIProtectionSingleEntry: e.target.value });
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
          onChange={(e) => {
            setValues({ ...values, pIProtectionSplitBodyPerPerson: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerAccidentOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Accident"
          value={pIProtectionSplitBodyPerAccident}
          onChange={(e) => {
            setValues({ ...values, pIProtectionSplitBodyPerAccident: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={propertyDamageOptions}
          placeholder="Choose Amount"
          label="Property Damage"
          value={pIProtectionSplitPropertyDamage}
          onChange={(e) => {
            setValues({ ...values, pIProtectionSplitPropertyDamage: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={pIProtectionSplitAutoEntry}
          onChange={(e) => {
            setValues({ ...values, pIProtectionSplitAutoEntry: e.target.value});
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
          onChange={(e) => {
            setValues({ ...values, medicalSingleLimit: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={medicalSingleEntry}
          onChange={(e) => {
            setValues({ ...values, medicalSingleEntry: e.target.value });
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
          onChange={(e) => {
            setValues({ ...values, medicalSplitBodyPerPerson: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerAccidentOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Accident"
          value={medicalSplitBodyPerAccident}
          onChange={(e) => {
            setValues({ ...values, medicalSplitBodyPerAccident: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={propertyDamageOptions}
          placeholder="Choose Amount"
          label="Property Damage"
          value={medicalSplitPropertyDamage}
          onChange={(e) => {
            setValues({ ...values, medicalSplitPropertyDamage: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={medicalSplitAutoEntry}
          onChange={(e) => {
            setValues({ ...values, medicalSplitAutoEntry: e.target.value });
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
          onChange={(e) => {
            setValues({ ...values, underinsuredMotoristSingleLimit: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={underinsuredMotoristSingleAutoEntry}
          onChange={(e) => {
            setValues({ ...values, underinsuredMotoristSingleAutoEntry: e.target.value });
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
          onChange={(e) => {
            setValues({ ...values, underMotoristBodyPerPerson: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerAccidentOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Accident"
          value={underMotoristBodyPerAccident}
          onChange={(e) => {
            setValues({ ...values, underMotoristBodyPerAccident: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={propertyDamageOptions}
          placeholder="Choose Amount"
          label="Property Damage"
          value={underMotoristProperty}
          onChange={(e) => {
            setValues({ ...values, underMotoristProperty: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={underMotoristAuto}
          onChange={(e) => {
            setValues({ ...values, underMotoristAuto: e.target.value });
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
          onChange={(e) => {
            setValues({ ...values, uninsuredMotoristSingleLimit: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={uninsuredMotoristSingleAutoEntry}
          onChange={(e) => {
            setValues({ ...values, uninsuredMotoristSingleAutoEntry: e.target.value });
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
          onChange={(e) => {
            setValues({ ...values, unMotoristBodyPerPerson: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerAccidentOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Accident"
          value={unMotoristBodyPerAccident}
          onChange={(e) => {
            setValues({ ...values, unMotoristBodyPerAccident: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={propertyDamageOptions}
          placeholder="Choose Amount"
          label="Uninsured Property Damage"
          value={unMotoristProperty}
          onChange={(e) => {
            setValues({ ...values, unMotoristProperty: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={unMotoristAuto}
          onChange={(e) => {
            setValues({ ...values, unMotoristAuto: e.target.value });
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
          onChange={(e) => {
            setValues({ ...values, cslSingleLimit: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={cslSingleAuto}
          onChange={(e) => {
            setValues({ ...values, cslSingleAuto: e.target.value });
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
          onChange={(e) => {
            setValues({ ...values, cslBodyPerPerson: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerAccidentOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Accident"
          value={cslBodyPerAccident}
          onChange={(e) => {
            setValues({ ...values, cslBodyPerAccident: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={propertyDamageOptions}
          placeholder="Choose Amount"
          label="Property Damage"
          value={cslProperty}
          onChange={(e) => {
            setValues({ ...values, cslProperty: e.target.value});
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={cslSplitAuto}
          onChange={(e) => {
            setValues({ ...values, cslSplitAuto: e.target.value });
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
          onChange={(e) => {
            setValues({ ...values, nonCslSingleLimit: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={nonCslSingleAuto}
          onChange={(e) => {
            setValues({ ...values, nonCslSingleAuto: e.target.value });
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
          onChange={(e) => {
            setValues({ ...values, nonCslBodyPerPerson: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={bodyPerAccidentOptions}
          placeholder="Choose Amount"
          label="Body Injury Per Accident"
          value={nonCslBodyPerAccident}
          onChange={(e) => {
            setValues({ ...values, nonCslBodyPerAccident: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={propertyDamageOptions}
          placeholder="Choose Amount"
          label="Property Damage"
          value={nonCslProperty}
          onChange={(e) => {
            setValues({ ...values, nonCslProperty: e.target.value });
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <SuryaSelect
          options={autoEntryOptions}
          placeholder="Covered Auto Symbol Entry"
          label="Choose Auto Symbol"
          value={nonCslSplitAuto}
          onChange={(e) => {
            setValues({ ...values, nonCslSplitAuto: e.target.value });
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
              label="Choose Overall Coverage"
              onChange={(e) => {
                setValues({ ...values, overall: e.target.value });
              }}
              value={overall}
            />
          </InputWrapper>
        </Flex>

        {overall === 'Combined Single Limit'
          ? combinedSection
          : splitSection}
          <Flex>
            <SuryaInput 
              placeholder="Overall Premium" 
              label="Overall Premium"
              value={overallPremium} 
              onChange={(e) => {
              setValues({ ...values, overallPremium: e.target.value });
            }} 
            type="number"
            />
          </Flex>
      </Section>
      <Section>
        <SectionTitle>Personal Injury Protection</SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              options={overallOptions}
              placeholder="Choose Personal Injury Protection Coverage"
              label="Overall"
              onChange={(e) => {
                setValues({ ...values, personalInjury: e.target.value });
              }}
              value={personalInjury}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          {personalInjury === 'Combined Single Limit'
            ? pIProtectionSingle
            : pIProtectionSplit}
        </Flex>

        <Flex>
            <SuryaInput 
              placeholder="Personal Injury Protection Premium" 
              label="Personal Injury Protection Premium"
              value={personalInjuryProtectionPremium} 
              onChange={(e) => {
              setValues({ ...values, personalInjuryProtectionPremium: e.target.value });
            }} 
            type="number"
            />
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
              onChange={(e) => {
                setValues({ ...values, medicalPayments: e.target.value });
              }}
              value={medicalPayments}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          {medicalPayments === 'Combined Single Limit'
            ? medicalSingle
            : medicalSplit}
        </Flex>
        <Flex>
            <SuryaInput 
              placeholder="Medical Payments Premium" 
              label="Medical Payments Premium"
              value={medicalPaymentsPremium} 
              onChange={(e) => {
              setValues({ ...values, medicalPaymentsPremium: e.target.value });
            }} 
            type="number"
            />
          </Flex>

      </Section>

      <Section>
        <SectionTitle>Underinsured Motorist</SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              options={overallOptions}
              placeholder="Choose Underinsured Motorist Coverage"
              label="Choose Underinsured Motorist Coverage"
              onChange={(e) => {
                setValues({ ...values, underinsuredMotorist: e.target.value });
              }}
              value={underinsuredMotorist}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          {underinsuredMotorist === 'Combined Single Limit'
            ? underinsuredMotoristSingle
            : underinsuredMotoristSplit}
        </Flex>

        <Flex>
            <SuryaInput 
              placeholder="Underinsured Motorist Premium" 
              label="Underinsured Motorist Premium"
              value={underinsuredMotoristPremium} 
              onChange={(e) => {
              setValues({ ...values, underinsuredMotoristPremium: e.target.value });
            }} 
            type="number"
            />
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
              onChange={(e) => {
                setValues({ ...values, uninsuredMotorist: e.target.value });
              }}
              value={uninsuredMotorist}
            />
          </InputWrapper>
        </Flex>
        <Flex>
          {uninsuredMotorist === 'Combined Single Limit'
            ? uninsuredMotoristSingle
            : uninsuredMotoristSplit}
        </Flex>

        <Flex>
            <SuryaInput 
              placeholder="Uninsured Motorist Premium}" 
              label="Uninsured Motorist Premium"
              value={uninsuredMotoristPremium} 
              onChange={(e) => {
              setValues({ ...values, uninsuredMotoristPremium: e.target.value });
            }} 
            type="number"
            />
          </Flex>
      </Section>

      <Section>
        <SectionTitle>Hired CSL</SectionTitle>
        <Flex>
          <InputWrapper>
            <SuryaSelect
              options={[{label: 'Yes', value: 'Yes'}, {label: 'No', value: 'No'}]}
              label="Choose CSL Coverage"
              onChange={(e) => {
                setValues({ ...values, csl: e.target.value });
              }}
              value={csl}
              placeholder=''
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
              onChange={(e) => {
                setValues({ ...values, nonOwnedCSL: e.target.value });
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
              onChange={(e) => {
                setValues({ ...values, deductable: e.target.value });
              }}
              value={deductable}
            />
          </InputWrapper>
          {deductable
            && (deductable === 'Yes' ? (
              <>
                <InputWrapper>
                  <SuryaSelect
                    options={autoSymbolOptions}
                    placeholder="$$"
                    label="Amount"
                    value={deductableAmount}
                    onChange={(e) => {
                      setValues({ ...values, deductableAmount: e.target.value });
                    }}
                  />
                </InputWrapper>
                <InputWrapper>
                  <SuryaSelect
                    options={autoEntryOptions}
                    placeholder="$$"
                    label="Covered Auto Symbol Entry"
                    value={deductableAutoEntry}
                    onChange={(e) => {
                      setValues({ ...values, deductableAutoEntry:  e.target.value });
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
