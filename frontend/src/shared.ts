export const urls = {
    getAllPoliciesUrl: 'https://policy-api-dot-delta-pagoda-337917.ue.r.appspot.com/policies/',
    createPoliciesUrl: 'https://policy-api-dot-delta-pagoda-337917.ue.r.appspot.com/policies/',
    getPolicy: (id) => `https://policy-api-dot-delta-pagoda-337917.ue.r.appspot.com/policies/${id}/`,
    updatePolicy: (id) => `https://policy-api-dot-delta-pagoda-337917.ue.r.appspot.com/policies/${id}/`,
  };


  export const testPolicies = [
    {
        "insured": {
            "zipCode": null,
            "contactName": null,
            "state": null,
            "firstName": null,
            "licenseEff": [
                null
            ],
            "suffix": null,
            "licenseNumber": null,
            "taxIdNumber": null,
            "email": null,
            "ssn": null,
            "licenseExp": null,
            "middleName": null,
            "contactEmail": null,
            "entity": null,
            "lastName": null,
            "corporationName": null,
            "city": null,
            "address1": null,
            "phoneNumber": null,
            "address2": null,
            "agent": null,
            "dob": null,
            "contactNumber": null,
            "licenseState": null,
            "isAddActive": false,
            "gender": null
        },
        "drivers": {
            "values": [
                {
                    "licenseExpDate": null,
                    "driverName": null,
                    "licenseNumber": null,
                    "licenseEffDate": null,
                    "states": null
                }
            ],
            "defaults": {
                "licenseEffDate": null,
                "states": null,
                "licenseExpDate": null,
                "licenseNumber": null,
                "driverName": null
            }
        },
        "loss_history": null,
        "created_at": 1650414436.24517,
        "policy": {
            "effectiveDate": null,
            "sizeClass": null,
            "expirationDate": null,
            "underwritingCode": null,
            "classCode": null,
            "classification": null,
            "lineOfBusiness": null,
            "states": null,
            "policyCategory": null,
            "policyLineItem": null,
            "businessUseClass": null,
            "radius": null,
            "coverageTerm": null,
            "agent": null
        },
        "documents": {},
        "coverage": {
            "csl": null,
            "cslSplitAuto": null,
            "unMotoristBodyPerAccident": null,
            "pIProtectionSplitBodyPerPerson": null,
            "deductable": null,
            "medicalSingleEntry": null,
            "nonCslSingleAuto": null,
            "medicalSplitBodyPerPerson": null,
            "medicalPayments": null,
            "underMotoristBodyPerAccident": null,
            "cslSingleLimit": null,
            "splitSectionAutoEntryOptions": null,
            "nonCslProperty": null,
            "pIProtectionSplitBodyPerAccident": null,
            "splitSectionBodyPerPerson": null,
            "medicalSplitAutoEntry": null,
            "nonCslSingleLimit": null,
            "uninsuredMotoristSingleLimit": null,
            "splitSectionBodyPerAccidentOptions": null,
            "nonOwnedCSL": null,
            "uninsuredMotoristSingleAutoEntry": null,
            "deductableAmount": null,
            "underMotoristAuto": null,
            "cslSingleAuto": null,
            "underMotoristBodyPerPerson": null,
            "splitSectionPropertyDamageOptions": null,
            "personalInjury": null,
            "medicalSingleLimit": null,
            "deductableAutoEntry": null,
            "underinsuredMotorist": null,
            "combinedSectionLimit": null,
            "unMotoristProperty": null,
            "underMotoristProperty": null,
            "unMotoristAuto": null,
            "pIProtectionSplitPropertyDamage": null,
            "combinedSectionEntry": null,
            "nonCslSplitAuto": null,
            "unMotoristBodyPerPerson": null,
            "cslBodyPerPerson": null,
            "medicalSplitPropertyDamage": null,
            "cslProperty": null,
            "overall": null,
            "underinsuredMotoristSingleAutoEntry": null,
            "pIProtectionSingleLimit": null,
            "errors": [],
            "pIProtectionSplitAutoEntry": null,
            "medicalSplitBodyPerAccident": null,
            "pIProtectionSingleEntry": null,
            "uninsuredMotorist": null,
            "underinsuredMotoristSingleLimit": null,
            "cslBodyPerAccident": null,
            "nonCslBodyPerPerson": null,
            "nonCslBodyPerAccident": null
        },
        "id": "90b6c796-5d7d-4417-a2b5-b7ee725a639e"
    }
];


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

  const { policy, coverage, insured, drivers, lossHistory, documents, vehicles} = store;
  const toReturn =  {
    policy: { ...policy.values,},
    insured: { ...insured?.values },
    drivers: {values: [...drivers?.values]},
    lossHistory: {incidents: [...lossHistory?.values]},
    documents,
    coverage: { ...coverage?.values},
  vehicles: { values: [...vehicles?.values]},
  };
  return toReturn;
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