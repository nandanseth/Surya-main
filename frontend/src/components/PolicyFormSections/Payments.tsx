import { Form } from '../../styles/styles';
import Input from '../Input';
import React from 'react';
import reinsuranceOptions, { zero } from '../../utils/reinsurance/getReinsurer';
import SuryaSelect from '../PolicyFormSelect';

const PaymentsSection = ({ store }) => {
  const { coverage, payments } = store;
  const coverageValues = coverage.values;
  const {
    overallPremium,
    personalInjuryProtectionPremium,
    medicalPaymentsPremium,
    underinsuredMotoristPremium,
    uninsuredMotoristPremium,
    hiredCSLPremium,
    nonOwnedCSLPremium,
  } = coverageValues;
  const { values, setValues } = payments;

  const total = [overallPremium,
    personalInjuryProtectionPremium,
    medicalPaymentsPremium,
    underinsuredMotoristPremium,
    uninsuredMotoristPremium,
    hiredCSLPremium,
    nonOwnedCSLPremium,].reduce((partialSum, a) => partialSum + a, 0);
};

export default PaymentsSection;
