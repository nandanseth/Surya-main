import React, { createContext, useState } from "react";
import { agent, classificationMap, coverageTerm, entityType, lineOfBusiness, policyCategory, policyLineItem, states, statesOptions, underwritingCode } from "../utils/policies";
import vehicleTypes from '../utils/vehicle/getVehicleType';
import vehicleCategoryOptions, {
    optionsMap
  } from '../utils/vehicle/getVehicleCategory';
import getWeightSelects from "../utils/vehicle/getWeightSelects";
import fuelTypeOptions from '../utils/vehicle/fuelType';
import { bussinessUseClasses, classCodes, radius, sizeClasses } from "../utils/policies/getCommercial";
import { bodyPerAccident, bodyPerPerson, limits, propertyDamage } from "../utils/coverage/getLimit";
import { auto } from "../utils/coverage/getAutoSymbolEntry";


export const yesNoOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

const policyInitialState = {
    states: states[0],
    classification: classificationMap[policyCategory[0]].value, 
    lineOfBusiness: lineOfBusiness[0],
    policyLineItem: policyLineItem[0],
    coverageTerm: coverageTerm[0],
    policyCategory: policyCategory[0],
    underwritingCode: underwritingCode[0],
    agent: agent[0],
    effectiveDate: null,
    expirationDate: null,
    radius: radius[0],
    classCode: classCodes[0],
    businessUseClass: bussinessUseClasses[0],
    sizeClass: sizeClasses[0],
};

const insuredInitialState = {
    agent: agent[0],
    entity: entityType[0],
    firstName: null,
    lastName: null,
    middleName: null,
    dob: null,
    suffix: null,
    gender: 'Male',
    ssn: null,
    address1: null,
    address2: null,
    city: null,
    state: states[0],
    zipCode: null,
    email: null,
    phoneNumber: null,
    licenseState: states[0],
    licenseNumber: null,
    licenseEff: null,
    licenseExp: null,
    contactName: null,
    contactNumber: null,
    contactEmail: null,
    corporationName: null,
    taxIdNumber: null,
};

const driversInitialState = {
    driverName: null,
    states: states[0],
    licenseNumber: null,
    licenseEffDate: null,
    licenseExpDate: null,
};

const lossHistoryState = {
    accidentDate: null,
    reportedDate: null,
    claimNumber: null,
    claimType: 'Body Injury',
    subClaimNumber: null,
    totalIncurred: null,
    liabilityPaid: null,
    openReserve: null,
    status: yesNoOptions[0].value,
    previousPolicyNumber: null,
    priorCarrierName: null,
    originalInceptionDate: null,
    expirationDate: null,
    isExperienceMode:  yesNoOptions[0].value,
    isPolicyTransferred:  yesNoOptions[0].value,
};


const defaultVal = { value: 'Combined Single Limit', label: 'Combined Single Limit' };

const coverageState = {
      overall: 'Combined Single Limit',
      deductable: null,
      deductableAmount: null,
      deductableAutoEntry: null,
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

      overallLimit: '',
      personalInjuryProtectionLimit: '',
      medicalPaymentsLimit: '',
      underinsuredMotoristLimit: '',
      uninsuredMotoristLimit: '',
      hiredCSLLimit: '',
      nonOwnedCSLLimit: '',
};


const defaultValue = 'No';
const yesNoValues = ['Yes', defaultValue];


const vehicleState = {
    yesNo: defaultValue,
    category: vehicleCategoryOptions[0].value,
    classification: null,
    vehicleCategory: optionsMap[Object.keys(optionsMap)[0]][0].value,
    vehicleType: vehicleTypes[0].value,
    state: states[0],
    vehicleState: null,
    vehicleWeight: getWeightSelects[0].value,
    fuelType: fuelTypeOptions[0].value,
    fleet: yesNoOptions[0].value,
    vin: null,
    make: null,
    model: null,
    modelYear: null,
    seating: null,
    wheelChair: yesNoOptions[0].value,
    plateNumber: null,
    garageZipCode: null,
    zoneCode: null,
    rateClassCode: null,
    baseName: null,
    baseType: 'Black Car',
    baseNumber: null,
    baseExpDate: null,
    shl: null,
    garageAddress1: null,
    garageAddress2: null,
    garageZipCode2: null,
    garageCity: null,
    garageCounty: null,
    garageState: statesOptions[0].value,
    garageCountry: null,
};

export const FormContext = createContext(null);

export const FormContextProvider = ({ children }) => {
    const [policyValues, setPolicyValues] = useState(policyInitialState);
    const [insuredValues, setInsuredValues] = useState(insuredInitialState);
    const [isAddActive, setAddActive] = useState(false);
    const [driverValues, setDriverValues] = useState([{ ...driversInitialState }]);
    const [lossValues, setLossValues] = useState([{ ...lossHistoryState }]);
    const [coverageValues, setCoverageValues] = useState(coverageState);
    const [coverageErrors, setCoverageErrors] = useState([]);
    const [document, setDocument] = useState(undefined);
    const [vehicleValues, setVehicleValues] = useState([{ ...vehicleState }]);


    const store = {

        policy: { values: policyValues, setValues: setPolicyValues },
        coverage: { values: coverageValues, setValues: setCoverageValues, errors: coverageErrors, setErrors: setCoverageErrors },
        insured: { values: insuredValues, setValues: setInsuredValues, isAddActive, setAddActive },
        drivers: { values: driverValues, setValues: setDriverValues, defaults: driversInitialState },
        lossHistory: { values: lossValues, setValues: setLossValues, defaults: lossHistoryState,},
        documents: { values: document, setValues: setDocument},
        vehicles: { values: vehicleValues, setValues: setVehicleValues, defaultValue,  yesNoValues, yesNoOptions, defaults: vehicleState },
        payment: { values: {}},
        reset: () => {
            setPolicyValues(policyInitialState);
            setInsuredValues(insuredInitialState);
            setAddActive(false);
            setDriverValues([{ ...driversInitialState }]);
            setLossValues([{ ...lossHistoryState }]);
            setCoverageValues(coverageState);
            setCoverageErrors([]);
            setDocument(undefined);
            setVehicleValues([{ ...vehicleState }]);
            return;
        }
    };


    return (
      <FormContext.Provider value={store}>
        {children}
      </FormContext.Provider>
    );
};
