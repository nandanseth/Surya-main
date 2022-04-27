import React, { createContext, useState } from "react";
import { states, statesOptions } from "../utils/policies";
import vehicleTypes from '../utils/vehicle/getVehicleType';
import vehicleCategoryOptions, {
    optionsMap
  } from '../utils/vehicle/getVehicleCategory';
import getWeightSelects from "../utils/vehicle/getWeightSelects";
import fuelTypeOptions from '../utils/vehicle/fuelType';


export const yesNoOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

const policyInitialState = {
    states: null,
    classification: null, 
    lineOfBusiness: null,
    policyLineItem: null,
    coverageTerm: null,
    policyCategory: null,
    underwritingCode: null,
    agent: null,
    effectiveDate: null,
    expirationDate: null,
    radius: null,
    classCode: null,
    businessUseClass: null,
    sizeClass: null,
};

const insuredInitialState = {
    agent: null,
    entity: null,
    firstName: null,
    lastName: null,
    middleName: null,
    dob: null,
    suffix: null,
    gender: null,
    ssn: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zipCode: null,
    email: null,
    phoneNumber: null,
    licenseState: null,
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
    overall: defaultVal,
    personalInjury: defaultVal,
    medicalPayments: defaultVal,
    underinsuredMotorist: defaultVal,
    uninsuredMotorist: defaultVal,
    csl: defaultVal,
    nonOwnedCSL: defaultVal,
    deductable: null,
    deductableAmount: null,
    deductableAutoEntry: null,
    combinedSectionLimit: null,
    combinedSectionEntry: null,
    splitSectionBodyPerPerson: null,
    splitSectionBodyPerAccidentOptions: null,
    splitSectionPropertyDamageOptions: null,
    splitSectionAutoEntryOptions: null,
    pIProtectionSingleLimit: null,
    pIProtectionSingleEntry: null,
    pIProtectionSplitBodyPerPerson: null,
    pIProtectionSplitBodyPerAccident: null,
    pIProtectionSplitPropertyDamage: null,
    pIProtectionSplitAutoEntry: null,
    medicalSingleLimit: null,
    medicalSingleEntry: null,
    medicalSplitBodyPerPerson: null,
    medicalSplitBodyPerAccident: null,
    medicalSplitPropertyDamage: null,
    medicalSplitAutoEntry: null,
    underinsuredMotoristSingleLimit: null,
    underinsuredMotoristSingleAutoEntry: null,
    underMotoristBodyPerPerson: null,
    underMotoristBodyPerAccident: null,
    underMotoristProperty: null,
    underMotoristAuto: null,

    uninsuredMotoristSingleLimit: null,
    uninsuredMotoristSingleAutoEntry: null,
    unMotoristBodyPerPerson: null,
    unMotoristBodyPerAccident: null,
    unMotoristProperty: null,
    unMotoristAuto: null,

    cslSingleLimit: null,
    cslSingleAuto: null,

    nonCslSingleLimit: null,
    nonCslSingleAuto: null,

    cslBodyPerPerson: null,
    cslBodyPerAccident: null,
    cslProperty: null,
    cslSplitAuto: null,

    nonCslBodyPerPerson: null,
    nonCslBodyPerAccident: null,
    nonCslProperty: null,
    nonCslSplitAuto: null,
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
