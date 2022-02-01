import React, { createContext, useState } from "react";

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
    states: null,
    licenseNumber: null,
    licenseEffDate: null,
    licenseExpDate: null,
};

const lossHistoryState = {
    accidentDate: null,
    reportedDate: null,
    claimNumber: null,
    claimType: null,
    subClaimNumber: null,
    totalIncurred: null,
    liabilityPaid: null,
    openReserve: null,
    status: null,
    previousPolicyNumber: null,
    priorCarrierName: null,
    originalInceptionDate: null,
    expirationDate: null,
    isExperienceMode: null,
    isPolicyTransferred: null,
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
const yesNoOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const vehicleState = {
    yesNo: defaultValue,
    category: null,
    classification: null,
    vehicleCategory: null,
    vehicleType: null,
    state: null,
    vehicleState: null,
    vehicleWeight: null,
    fuelType: null,
    vin: null,
    make: null,
    model: null,
    modelYear: null,
    seating: null,
    wheelChair: null,
    plateNumber: null,
    garageZipCode: null,
    zoneCode: null,
    rateClassCode: null,
    baseName: null,
    baseType: null,
    baseNumber: null,
    baseExpDate: null,
    shl: null,
    garageAddress1: null,
    garageAddress2: null,
    garageZipCode2: null,
    garageCity: null,
    garageCounty: null,
    garageState: null,
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

    console.log(JSON.stringify(store, null, 2))


    return (
      <FormContext.Provider value={store}>
        {children}
      </FormContext.Provider>
    );
};
