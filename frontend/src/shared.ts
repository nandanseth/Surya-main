const RUNTIME_ENV = process.env.NODE_ENV
const POLICY_API_LOCALHOST = `http://localhost:3001`
const POLICY_API_PROD = `https://policy-api-dot-delta-pagoda-337917.ue.r.appspot.com`
const host: string =
    RUNTIME_ENV === `production` ? POLICY_API_LOCALHOST : POLICY_API_PROD
console.log(`NODE_ENV: ${RUNTIME_ENV}`)
console.log('TESTTTTT');
export const urls = {
    getAllPoliciesUrl: `${host}/policies/`,
    createPoliciesUrl: `${host}/policies/`,
    getPolicy: (id) => `${host}/policies/${id}/`,
    updatePolicy: (id) => `${host}/policies/${id}/`,
    getEndorsments: (id) => `${host}/policies/${id}/endorsements/`,
}

export const testPolicies = [
    {
        documents: {},
        policy: {
            expirationDate: null,
            coverageTerm: 'Annual',
            radius: 'Local',
            sizeClass: 'Light Trucks ',
            effectiveDate: null,
            lineOfBusiness: 'Commercial',
            agent: 'Quantum Risk Solutions (QRSBRK)',
            underwritingCode: 'New Business',
            states: 'Oregon',
            classification: null,
            policyLineItem: 'Owner Operator',
            businessUseClass: 'Service',
            policyCategory: 'Taxicabs and Limousines',
            classCode: 'Non-fleet',
        },
        created_at: 1651859369.697056,
        coverage: {
            overall: 'Combined Single Limit',
            nonCslSingleAuto: 'Excluded',
            nonCslSingleLimit: '35,000',
            splitSectionAutoEntryOptions: 'Excluded',
            deductableAutoEntry: null,
            medicalSingleEntry: 'Excluded',
            unMotoristProperty: '10,000',
            cslProperty: '10,000',
            nonCslSplitAuto: 'Excluded',
            medicalSingleLimit: '35,000',
            medicalPayments: 'Combined Single Limit',
            medicalSplitBodyPerAccident: '25,000',
            errors: null,
            personalInjury: 'Combined Single Limit',
            pIProtectionSplitPropertyDamage: '10,000',
            nonCslBodyPerAccident: '25,000',
            cslBodyPerPerson: '25,000',
            uninsuredMotoristSingleAutoEntry: 'Excluded',
            underMotoristBodyPerPerson: '25,000',
            unMotoristAuto: 'Excluded',
            uninsuredMotorist: 'Combined Single Limit',
            csl: 'Yes',
            underinsuredMotorist: 'Combined Single Limit',
            cslBodyPerAccident: '25,000',
            nonCslBodyPerPerson: '25,000',
            splitSectionBodyPerPerson: '25,000',
            pIProtectionSplitBodyPerPerson: '25,000',
            uninsuredMotoristSingleLimit: '35,000',
            nonCslProperty: '10,000',
            splitSectionPropertyDamageOptions: '10,000',
            underMotoristProperty: '10,000',
            nonOwnedCSL: 'Yes',
            splitSectionBodyPerAccidentOptions: '25,000',
            deductable: null,
            pIProtectionSingleEntry: 'Excluded',
            pIProtectionSingleLimit: '35,000',
            underinsuredMotoristSingleAutoEntry: 'Excluded',
            pIProtectionSplitAutoEntry: 'Excluded',
            pIProtectionSplitBodyPerAccident: '25,000',
            medicalSplitBodyPerPerson: '25,000',
            combinedSectionLimit: '35,000',
            medicalSplitAutoEntry: 'Excluded',
            underMotoristBodyPerAccident: '25,000',
            unMotoristBodyPerPerson: '25,000',
            unMotoristBodyPerAccident: '25,000',
            cslSingleAuto: 'Excluded',
            medicalSplitPropertyDamage: '10,000',
            underinsuredMotoristSingleLimit: '35,000',
            underMotoristAuto: 'Excluded',
            cslSingleLimit: '35,000',
            cslSplitAuto: 'Excluded',
            deductableAmount: null,
            combinedSectionEntry: 'Excluded',
        },
        insured: {
            licenseState: 'Oregon',
            gender: 'Male',
            contactName: null,
            lastName: null,
            isAddActive: null,
            suffix: null,
            email: null,
            middleName: null,
            address1: null,
            contactNumber: null,
            address2: null,
            corporationName: null,
            licenseNumber: null,
            ssn: null,
            firstName: null,
            entity: 'Individual',
            dob: null,
            state: 'Oregon',
            zipCode: null,
            licenseExp: null,
            city: null,
            taxIdNumber: null,
            contactEmail: null,
            agent: 'Quantum Risk Solutions (QRSBRK)',
            phoneNumber: null,
            licenseEff: null,
        },
        vehicles: {
            values: [
                {
                    garageAddress2: null,
                    seating: null,
                    wheelChair: 'Yes',
                    garageCountry: null,
                    baseType: 'Black Car',
                    garageCounty: null,
                    rateClassCode: null,
                    vin: null,
                    zoneCode: null,
                    garageState: 'Oregon',
                    vehicleWeight: '0 - 10,000',
                    state: 'Oregon',
                    shl: null,
                    vehicleType: 'Car Service',
                    category: 'Taxicabs and Limousines',
                    fuelType: 'Gas',
                    classification: null,
                    plateNumber: null,
                    make: null,
                    baseName: null,
                    modelYear: null,
                    garageCity: null,
                    yesNo: 'No',
                    model: null,
                    baseNumber: null,
                    baseExpDate: null,
                    garageZipCode2: null,
                    vehicleState: null,
                    vehicleCategory: 'Taxicab - Owner-Driver',
                    garageZipCode: null,
                    garageAddress1: null,
                },
            ],
        },
        loss_history: null,
        drivers: {
            values: [
                {
                    states: 'Oregon',
                    licenseNumber: null,
                    licenseExpDate: null,
                    driverName: null,
                    licenseEffDate: null,
                },
            ],
            defaults: null,
        },
        id: '17264e26-fa53-48da-a450-c477cb456687',
    },
]

export const preSubmit = (store) => {
    /*
  policy: { values: policyValues, setValues: setPolicyValues },
        coverage: { values: coverageValues, setValues: setCoverageValues, errors: coverageErrors, setErrors: setCoverageErrors },
        insured: { values: insuredValues, setValues: setInsuredValues, isAddActive, setAddActive },
        drivers: { values: driverValues, setValues: setDriverValues, defaults: driversInitialState },
        lossHistory: { values: lossValues, setValues: setLossValues, defaults: lossHistoryState,},
        documents: { values: document, setValues: setDocument},
        vehicles: { values: vehicleValues, setValues: setVehicleValues, defaultValue,  yesNoValues, yesNoOptions, defaults: vehicleState },
            setPolicyValues(policyInitialState);
            setInsuredValues(insuredInitialState);
            setAddActive(false);
            setDriverValues([{ ...driversInitialState }]);
            setLossValues([{ ...lossHistoryState }]);
            setCoverageValues(coverageState);
            setCoverageErrors([]);
            setDocument(undefined);
            setVehicleValues([{ ...vehicleState }]);
  */

    const {
        policy,
        coverage,
        insured,
        drivers,
        lossHistory,
        documents,
        vehicles,
        payments,
        reinsurance,
    } = store
    const toReturn = {
        policy: { ...policy.values },
        insured: { ...insured?.values },
        drivers: { values: [...drivers?.values] },
        lossHistory: { incidents: [...lossHistory?.values] },
        documents,
        coverage: { ...coverage?.values },
        vehicles: { values: [...vehicles?.values] },
        payments: { ...payments?.values },
        reinsurance: { ...reinsurance?.values },
    }
    return toReturn
}

/*
{
  "policy": {
    "states": null,
    "classification": null,
    "lineOfBusiness": null,
    "policyLineItem": null,
    "coverageTerm": null,
    "policyCategory": null,
    "underwritingCode": null,
    "agent": null,
    "effectiveDate": null,
    "expirationDate": null,
    "radius": null,
    "classCode": null,
    "businessUseClass": null,
    "sizeClass": null
  },
  "insured": {
    "agent": null,
    "entity": null,
    "firstName": null,
    "lastName": null,
    "middleName": null,
    "dob": null,
    "suffix": null,
    "gender": null,
    "ssn": null,
    "address1": null,
    "address2": null,
    "city": null,
    "state": null,
    "zipCode": null,
    "email": null,
    "phoneNumber": null,
    "licenseState": null,
    "licenseNumber": null,
    "licenseEff": null,
    "licenseExp": null,
    "contactName": null,
    "contactNumber": null,
    "contactEmail": null,
    "corporationName": null,
    "taxIdNumber": null
  },
  "drivers": [
    {
      "driverName": null,
      "states": null,
      "licenseNumber": null,
      "licenseEffDate": null,
      "licenseExpDate": null
    }
  ],
  "lossHistory": [
    {
      "accidentDate": null,
      "reportedDate": null,
      "claimNumber": null,
      "claimType": null,
      "subClaimNumber": null,
      "totalIncurred": null,
      "liabilityPaid": null,
      "openReserve": null,
      "status": null,
      "previousPolicyNumber": null,
      "priorCarrierName": null,
      "originalInceptionDate": null,
      "expirationDate": null,
      "isExperienceMode": null,
      "isPolicyTransferred": null
    }
  ],
  "documents": {},
  "coverage": {
    "overall": {
      "value": "Combined Single Limit",
      "label": "Combined Single Limit"
    },
    "personalInjury": {
      "value": "Combined Single Limit",
      "label": "Combined Single Limit"
    },
    "medicalPayments": {
      "value": "Combined Single Limit",
      "label": "Combined Single Limit"
    },
    "underinsuredMotorist": {
      "value": "Combined Single Limit",
      "label": "Combined Single Limit"
    },
    "uninsuredMotorist": {
      "value": "Combined Single Limit",
      "label": "Combined Single Limit"
    },
    "csl": {
      "value": "Combined Single Limit",
      "label": "Combined Single Limit"
    },
    "nonOwnedCSL": {
      "value": "Combined Single Limit",
      "label": "Combined Single Limit"
    },
    "deductable": null,
    "deductableAmount": null,
    "deductableAutoEntry": null,
    "combinedSectionLimit": null,
    "combinedSectionEntry": null,
    "splitSectionBodyPerPerson": null,
    "splitSectionBodyPerAccidentOptions": null,
    "splitSectionPropertyDamageOptions": null,
    "splitSectionAutoEntryOptions": null,
    "pIProtectionSingleLimit": null,
    "pIProtectionSingleEntry": null,
    "pIProtectionSplitBodyPerPerson": null,
    "pIProtectionSplitBodyPerAccident": null,
    "pIProtectionSplitPropertyDamage": null,
    "pIProtectionSplitAutoEntry": null,
    "medicalSingleLimit": null,
    "medicalSingleEntry": null,
    "medicalSplitBodyPerPerson": null,
    "medicalSplitBodyPerAccident": null,
    "medicalSplitPropertyDamage": null,
    "medicalSplitAutoEntry": null,
    "underinsuredMotoristSingleLimit": null,
    "underinsuredMotoristSingleAutoEntry": null,
    "underMotoristBodyPerPerson": null,
    "underMotoristBodyPerAccident": null,
    "underMotoristProperty": null,
    "underMotoristAuto": null,
    "uninsuredMotoristSingleLimit": null,
    "uninsuredMotoristSingleAutoEntry": null,
    "unMotoristBodyPerPerson": null,
    "unMotoristBodyPerAccident": null,
    "unMotoristProperty": null,
    "unMotoristAuto": null,
    "cslSingleLimit": null,
    "cslSingleAuto": null,
    "nonCslSingleLimit": null,
    "nonCslSingleAuto": null,
    "cslBodyPerPerson": null,
    "cslBodyPerAccident": null,
    "cslProperty": null,
    "cslSplitAuto": null,
    "nonCslBodyPerPerson": null,
    "nonCslBodyPerAccident": null,
    "nonCslProperty": null,
    "nonCslSplitAuto": null
  },
  "vehicles": [
    {
      "yesNo": "No",
      "category": null,
      "classification": null,
      "vehicleCategory": null,
      "vehicleType": null,
      "state": null,
      "vehicleState": null,
      "vehicleWeight": null,
      "fuelType": null,
      "vin": null,
      "make": null,
      "model": null,
      "modelYear": null,
      "seating": null,
      "wheelChair": null,
      "plateNumber": null,
      "garageZipCode": null,
      "zoneCode": null,
      "rateClassCode": null,
      "baseName": null,
      "baseType": null,
      "baseNumber": null,
      "baseExpDate": null,
      "shl": null,
      "garageAddress1": null,
      "garageAddress2": null,
      "garageZipCode2": null,
      "garageCity": null,
      "garageCounty": null,
      "garageState": null,
      "garageCountry": null
    }
  ]
}

*/

export interface PolicyType {
    policy: {
        name: string
        lineOfBusiness: string
        agent: string
        underwritingCode: string
        states: string
        classification: string
        policyLineItem: string
        businessUseClass: string
        policyCategory: string
        classCode: string
    }
    created_at: number
    coverage: {
        overall: string
        nonCslSingleAuto: string
        nonCslSingleLimit: string
        splitSectionAutoEntryOptions: string
        deductableAutoEntry: string
        medicalSingleEntry: string
        unMotoristProperty: string
        cslProperty: string
        nonCslSplitAuto: string
        medicalSingleLimit: string
        medicalPayments: string
        medicalSplitBodyPerAccident: string
        errors: string
        personalInjury: string
        pIProtectionSplitPropertyDamage: string
        nonCslBodyPerAccident: string
        cslBodyPerPerson: string
        uninsuredMotoristSingleAutoEntry: string
        underMotoristBodyPerPerson: string
        unMotoristAuto: string
        uninsuredMotorist: string
        csl: string
        underinsuredMotorist: string
        cslBodyPerAccident: string
        nonCslBodyPerPerson: string
        splitSectionBodyPerPerson: string
        pIProtectionSplitBodyPerPerson: string
        uninsuredMotoristSingleLimit: string
        nonCslProperty: string
        splitSectionPropertyDamageOptions: string
        underMotoristProperty: string
        nonOwnedCSL: string
        splitSectionBodyPerAccidentOptions: string
        deductable: string
        pIProtectionSingleEntry: string
        pIProtectionSingleLimit: string
        underinsuredMotoristSingleAutoEntry: string
        pIProtectionSplitAutoEntry: string
        pIProtectionSplitBodyPerAccident: string
        medicalSplitBodyPerPerson: string
        combinedSectionLimit: string
        medicalSplitAutoEntry: string
        underMotoristBodyPerAccident: string
        unMotoristBodyPerPerson: string
        unMotoristBodyPerAccident: string
        cslSingleAuto: string
        medicalSplitPropertyDamage: string
        underinsuredMotoristSingleLimit: string
        underMotoristAuto: string
        cslSingleLimit: string
        cslSplitAuto: string
        deductableAmount: string
        combinedSectionEntry: string
        overallPremium: string
        personalInjuryProtectionPremium: string
        medicalPaymentsPremium: string
        underinsuredMotoristPremium: string
        uninsuredMotoristPremium: string
        hiredCSLPremium: string
        nonOwnedCSLPremium: string
    }
    insured: {
        licenseState: string
        gender: string
        contactName: string
        lastName: string
        isAddActive: string
        suffix: string
        email: string
        middleName: string
        address1: string
        contactNumber: string
        address2: string
        corporationName: string
        licenseNumber: string
        ssn: string
        firstName: string
        entity: string
        dob: string
        state: string
        zipCode: string
        licenseExp: string
        city: string
        taxIdNumber: string
        contactEmail: string
        agent: string
        phoneNumber: string
        licenseEff: string
    }

    vehicles: {
        values: any[]
    }
    loss_history: any
    drivers: any
    id: string
}

export const testItem = {
    documents: {},
    policy: {
        expirationDate: null,
        coverageTerm: 'Annual',
        radius: 'Local',
        sizeClass: 'Light Trucks ',
        effectiveDate: null,
        lineOfBusiness: 'Commercial',
        agent: 'Quantum Risk Solutions (QRSBRK)',
        underwritingCode: 'New Business',
        states: 'Oregon',
        classification: null,
        policyLineItem: 'Owner Operator',
        businessUseClass: 'Service',
        policyCategory: 'Taxicabs and Limousines',
        classCode: 'Non-fleet',
    },
    created_at: 1651859369.697056,
    coverage: {
        overall: 'Combined Single Limit',
        nonCslSingleAuto: 'Excluded',
        nonCslSingleLimit: '35,000',
        splitSectionAutoEntryOptions: 'Excluded',
        deductableAutoEntry: null,
        medicalSingleEntry: 'Excluded',
        unMotoristProperty: '10,000',
        cslProperty: '10,000',
        nonCslSplitAuto: 'Excluded',
        medicalSingleLimit: '35,000',
        medicalPayments: 'Combined Single Limit',
        medicalSplitBodyPerAccident: '25,000',
        errors: null,
        personalInjury: 'Combined Single Limit',
        pIProtectionSplitPropertyDamage: '10,000',
        nonCslBodyPerAccident: '25,000',
        cslBodyPerPerson: '25,000',
        uninsuredMotoristSingleAutoEntry: 'Excluded',
        underMotoristBodyPerPerson: '25,000',
        unMotoristAuto: 'Excluded',
        uninsuredMotorist: 'Combined Single Limit',
        csl: 'Yes',
        underinsuredMotorist: 'Combined Single Limit',
        cslBodyPerAccident: '25,000',
        nonCslBodyPerPerson: '25,000',
        splitSectionBodyPerPerson: '25,000',
        pIProtectionSplitBodyPerPerson: '25,000',
        uninsuredMotoristSingleLimit: '35,000',
        nonCslProperty: '10,000',
        splitSectionPropertyDamageOptions: '10,000',
        underMotoristProperty: '10,000',
        nonOwnedCSL: 'Yes',
        splitSectionBodyPerAccidentOptions: '25,000',
        deductable: null,
        pIProtectionSingleEntry: 'Excluded',
        pIProtectionSingleLimit: '35,000',
        underinsuredMotoristSingleAutoEntry: 'Excluded',
        pIProtectionSplitAutoEntry: 'Excluded',
        pIProtectionSplitBodyPerAccident: '25,000',
        medicalSplitBodyPerPerson: '25,000',
        combinedSectionLimit: '35,000',
        medicalSplitAutoEntry: 'Excluded',
        underMotoristBodyPerAccident: '25,000',
        unMotoristBodyPerPerson: '25,000',
        unMotoristBodyPerAccident: '25,000',
        cslSingleAuto: 'Excluded',
        medicalSplitPropertyDamage: '10,000',
        underinsuredMotoristSingleLimit: '35,000',
        underMotoristAuto: 'Excluded',
        cslSingleLimit: '35,000',
        cslSplitAuto: 'Excluded',
        deductableAmount: null,
        combinedSectionEntry: 'Excluded',
    },
    insured: {
        licenseState: 'Oregon',
        gender: 'Male',
        contactName: null,
        lastName: null,
        isAddActive: null,
        suffix: null,
        email: null,
        middleName: null,
        address1: null,
        contactNumber: null,
        address2: null,
        corporationName: null,
        licenseNumber: null,
        ssn: null,
        firstName: null,
        entity: 'Individual',
        dob: null,
        state: 'Oregon',
        zipCode: null,
        licenseExp: null,
        city: null,
        taxIdNumber: null,
        contactEmail: null,
        agent: 'Quantum Risk Solutions (QRSBRK)',
        phoneNumber: null,
        licenseEff: null,
    },
    vehicles: {
        values: [
            {
                garageAddress2: null,
                seating: null,
                wheelChair: 'Yes',
                garageCountry: null,
                baseType: 'Black Car',
                garageCounty: null,
                rateClassCode: null,
                vin: null,
                zoneCode: null,
                garageState: 'Oregon',
                vehicleWeight: '0 - 10,000',
                state: 'Oregon',
                shl: null,
                vehicleType: 'Car Service',
                category: 'Taxicabs and Limousines',
                fuelType: 'Gas',
                classification: null,
                plateNumber: null,
                make: null,
                baseName: null,
                modelYear: null,
                garageCity: null,
                yesNo: 'No',
                model: null,
                baseNumber: null,
                baseExpDate: null,
                garageZipCode2: null,
                vehicleState: null,
                vehicleCategory: 'Taxicab - Owner-Driver',
                garageZipCode: null,
                garageAddress1: null,
            },
        ],
    },
    loss_history: null,
    drivers: {
        values: [
            {
                states: 'Oregon',
                licenseNumber: null,
                licenseExpDate: null,
                driverName: null,
                licenseEffDate: null,
            },
            {
                states: 'Oregon',
                licenseNumber: null,
                licenseExpDate: null,
                driverName: 'Omari Powell',
                licenseEffDate: null,
            },
        ],
        defaults: null,
    },
    id: '17264e26-fa53-48da-a450-c477cb456687',
}
