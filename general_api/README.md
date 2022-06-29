# General Surya API

This is a RESTful API meant for handling all operations that don't fall into a particular category but serve the Surya app.

# Setup

## Requirements

- Python 3.8+

1. Create and activate a virtual environment if you have not already.

```
python -m venv env
source env/bin/activate
```

2. Install dependencies.

```
pip install -r requirements.txt
```

3. Run the app.

```
uvicorn main:app --reload
```

Your app should start running at [localhost:8000](http://localhost:8000/).

# Service

| Environment | URL                                                     |
| ----------- | ------------------------------------------------------- |
| Prod        | https://general-api-dot-surya-systems.uc.r.appspot.com/ |
| Dev         | N/A                                                     |

# Endpoints

The following endpoints are available in this service.

**Demo**

```
GET /demo
```

**Response**

```javascript
{
  "policy": {
    "values": {
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
    }
  },
  "coverage": {
    "values": {
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
    "errors": []
  },
  "insured": {
    "values": {
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
    "isAddActive": false
  },
  "drivers": {
    "values": [
      {
        "driverName": null,
        "states": null,
        "licenseNumber": null,
        "licenseEffDate": null,
        "licenseExpDate": null
      }
    ],
    "defaults": {
      "driverName": null,
      "states": null,
      "licenseNumber": null,
      "licenseEffDate": null,
      "licenseExpDate": null
    }
  },
  "lossHistory": {
    "values": [
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
    "defaults": {
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
  },
  "documents": {},
  "vehicles": {
    "values": [
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
    ],
    "defaultValue": "No",
    "yesNoValues": [
      "Yes",
      "No"
    ],
    "yesNoOptions": [
      {
        "label": "Yes",
        "value": "Yes"
      },
      {
        "label": "No",
        "value": "No"
      }
    ],
    "defaults": {
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
  }
}
```
