from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://surya-systems.uc.r.appspot.com/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"status": "ok"}


@app.get("/demo")
def demo_manifest():
    manifest = {
        "policy": {
            "values": {
                "states": None,
                "classification": None,
                "lineOfBusiness": None,
                "policyLineItem": None,
                "coverageTerm": None,
                "policyCategory": None,
                "underwritingCode": None,
                "agent": None,
                "effectiveDate": None,
                "expirationDate": None,
                "radius": None,
                "classCode": None,
                "businessUseClass": None,
                "sizeClass": None,
            }
        },
        "coverage": {
            "values": {
                "overall": {
                    "value": "Combined Single Limit",
                    "label": "Combined Single Limit",
                },
                "personalInjury": {
                    "value": "Combined Single Limit",
                    "label": "Combined Single Limit",
                },
                "medicalPayments": {
                    "value": "Combined Single Limit",
                    "label": "Combined Single Limit",
                },
                "underinsuredMotorist": {
                    "value": "Combined Single Limit",
                    "label": "Combined Single Limit",
                },
                "uninsuredMotorist": {
                    "value": "Combined Single Limit",
                    "label": "Combined Single Limit",
                },
                "csl": {
                    "value": "Combined Single Limit",
                    "label": "Combined Single Limit",
                },
                "nonOwnedCSL": {
                    "value": "Combined Single Limit",
                    "label": "Combined Single Limit",
                },
                "deductable": None,
                "deductableAmount": None,
                "deductableAutoEntry": None,
                "combinedSectionLimit": None,
                "combinedSectionEntry": None,
                "splitSectionBodyPerPerson": None,
                "splitSectionBodyPerAccidentOptions": None,
                "splitSectionPropertyDamageOptions": None,
                "splitSectionAutoEntryOptions": None,
                "pIProtectionSingleLimit": None,
                "pIProtectionSingleEntry": None,
                "pIProtectionSplitBodyPerPerson": None,
                "pIProtectionSplitBodyPerAccident": None,
                "pIProtectionSplitPropertyDamage": None,
                "pIProtectionSplitAutoEntry": None,
                "medicalSingleLimit": None,
                "medicalSingleEntry": None,
                "medicalSplitBodyPerPerson": None,
                "medicalSplitBodyPerAccident": None,
                "medicalSplitPropertyDamage": None,
                "medicalSplitAutoEntry": None,
                "underinsuredMotoristSingleLimit": None,
                "underinsuredMotoristSingleAutoEntry": None,
                "underMotoristBodyPerPerson": None,
                "underMotoristBodyPerAccident": None,
                "underMotoristProperty": None,
                "underMotoristAuto": None,
                "uninsuredMotoristSingleLimit": None,
                "uninsuredMotoristSingleAutoEntry": None,
                "unMotoristBodyPerPerson": None,
                "unMotoristBodyPerAccident": None,
                "unMotoristProperty": None,
                "unMotoristAuto": None,
                "cslSingleLimit": None,
                "cslSingleAuto": None,
                "nonCslSingleLimit": None,
                "nonCslSingleAuto": None,
                "cslBodyPerPerson": None,
                "cslBodyPerAccident": None,
                "cslProperty": None,
                "cslSplitAuto": None,
                "nonCslBodyPerPerson": None,
                "nonCslBodyPerAccident": None,
                "nonCslProperty": None,
                "nonCslSplitAuto": None,
            },
            "errors": [],
        },
        "insured": {
            "values": {
                "agent": None,
                "entity": None,
                "firstName": None,
                "lastName": None,
                "middleName": None,
                "dob": None,
                "suffix": None,
                "gender": None,
                "ssn": None,
                "address1": None,
                "address2": None,
                "city": None,
                "state": None,
                "zipCode": None,
                "email": None,
                "phoneNumber": None,
                "licenseState": None,
                "licenseNumber": None,
                "licenseEff": None,
                "licenseExp": None,
                "contactName": None,
                "contactNumber": None,
                "contactEmail": None,
                "corporationName": None,
                "taxIdNumber": None,
            },
            "isAddActive": False,
        },
        "drivers": {
            "values": [
                {
                    "driverName": None,
                    "states": None,
                    "licenseNumber": None,
                    "licenseEffDate": None,
                    "licenseExpDate": None,
                }
            ],
            "defaults": {
                "driverName": None,
                "states": None,
                "licenseNumber": None,
                "licenseEffDate": None,
                "licenseExpDate": None,
            },
        },
        "lossHistory": {
            "values": [
                {
                    "accidentDate": None,
                    "reportedDate": None,
                    "claimNumber": None,
                    "claimType": None,
                    "subClaimNumber": None,
                    "totalIncurred": None,
                    "liabilityPaid": None,
                    "openReserve": None,
                    "status": None,
                    "previousPolicyNumber": None,
                    "priorCarrierName": None,
                    "originalInceptionDate": None,
                    "expirationDate": None,
                    "isExperienceMode": None,
                    "isPolicyTransferred": None,
                }
            ],
            "defaults": {
                "accidentDate": None,
                "reportedDate": None,
                "claimNumber": None,
                "claimType": None,
                "subClaimNumber": None,
                "totalIncurred": None,
                "liabilityPaid": None,
                "openReserve": None,
                "status": None,
                "previousPolicyNumber": None,
                "priorCarrierName": None,
                "originalInceptionDate": None,
                "expirationDate": None,
                "isExperienceMode": None,
                "isPolicyTransferred": None,
            },
        },
        "documents": {},
        "vehicles": {
            "values": [
                {
                    "yesNo": "No",
                    "category": None,
                    "classification": None,
                    "vehicleCategory": None,
                    "vehicleType": None,
                    "state": None,
                    "vehicleState": None,
                    "vehicleWeight": None,
                    "fuelType": None,
                    "vin": None,
                    "make": None,
                    "model": None,
                    "modelYear": None,
                    "seating": None,
                    "wheelChair": None,
                    "plateNumber": None,
                    "garageZipCode": None,
                    "zoneCode": None,
                    "rateClassCode": None,
                    "baseName": None,
                    "baseType": None,
                    "baseNumber": None,
                    "baseExpDate": None,
                    "shl": None,
                    "garageAddress1": None,
                    "garageAddress2": None,
                    "garageZipCode2": None,
                    "garageCity": None,
                    "garageCounty": None,
                    "garageState": None,
                    "garageCountry": None,
                }
            ],
            "defaultValue": "No",
            "yesNoValues": ["Yes", "No"],
            "yesNoOptions": [
                {"label": "Yes", "value": "Yes"},
                {"label": "No", "value": "No"},
            ],
            "defaults": {
                "yesNo": "No",
                "category": None,
                "classification": None,
                "vehicleCategory": None,
                "vehicleType": None,
                "state": None,
                "vehicleState": None,
                "vehicleWeight": None,
                "fuelType": None,
                "vin": None,
                "make": None,
                "model": None,
                "modelYear": None,
                "seating": None,
                "wheelChair": None,
                "plateNumber": None,
                "garageZipCode": None,
                "zoneCode": None,
                "rateClassCode": None,
                "baseName": None,
                "baseType": None,
                "baseNumber": None,
                "baseExpDate": None,
                "shl": None,
                "garageAddress1": None,
                "garageAddress2": None,
                "garageZipCode2": None,
                "garageCity": None,
                "garageCounty": None,
                "garageState": None,
                "garageCountry": None,
            },
        },
    }
    return JSONResponse(content=manifest)
