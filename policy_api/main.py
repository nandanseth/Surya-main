import uuid
from datetime import datetime
from typing import List, Optional

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from google.cloud import firestore

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = firestore.Client()


class Label(BaseModel):
    label: str
    value: str


class PolicyMeta(BaseModel):
    states: Optional[str] = None
    classification: Optional[str] = None
    lineOfBusiness: Optional[str] = None
    policyLineItem: Optional[str] = None
    coverageTerm: Optional[str] = None
    policyCategory: Optional[str] = None
    underwritingCode: Optional[str] = None
    agent: Optional[str] = None
    effectiveDate: Optional[str] = None
    expirationDate: Optional[str] = None
    radius: Optional[str] = None
    classCode: Optional[str] = None
    businessUseClass: Optional[str] = None
    sizeClass: Optional[str] = None


class Coverage(BaseModel):
    overall: Optional[Label] = None
    personalInjury: Optional[Label] = None
    medicalPayments: Optional[Label] = None
    underinsuredMotorist: Optional[Label] = None
    uninsuredMotorist: Optional[Label] = None
    csl: Optional[Label] = None
    nonOwnedCSL: Optional[Label] = None
    deductable: Optional[str] = None
    deductableAmount: Optional[str] = None
    deductableAutoEntry: Optional[str] = None
    combinedSectionLimit: Optional[str] = None
    combinedSectionEntry: Optional[str] = None
    splitSectionBodyPerPerson: Optional[str] = None
    splitSectionBodyPerAccidentOptions: Optional[str] = None
    splitSectionPropertyDamageOptions: Optional[str] = None
    splitSectionAutoEntryOptions: Optional[str] = None
    pIProtectionSingleLimit: Optional[str] = None
    pIProtectionSingleEntry: Optional[str] = None
    pIProtectionSplitBodyPerPerson: Optional[str] = None
    pIProtectionSplitBodyPerAccident: Optional[str] = None
    pIProtectionSplitPropertyDamage: Optional[str] = None
    pIProtectionSplitAutoEntry: Optional[str] = None
    medicalSingleLimit: Optional[str] = None
    medicalSingleEntry: Optional[str] = None
    medicalSplitBodyPerPerson: Optional[str] = None
    medicalSplitBodyPerAccident: Optional[str] = None
    medicalSplitPropertyDamage: Optional[str] = None
    medicalSplitAutoEntry: Optional[str] = None
    underinsuredMotoristSingleLimit: Optional[str] = None
    underinsuredMotoristSingleAutoEntry: Optional[str] = None
    underMotoristBodyPerPerson: Optional[str] = None
    underMotoristBodyPerAccident: Optional[str] = None
    underMotoristProperty: Optional[str] = None
    underMotoristAuto: Optional[str] = None
    uninsuredMotoristSingleLimit: Optional[str] = None
    uninsuredMotoristSingleAutoEntry: Optional[str] = None
    unMotoristBodyPerPerson: Optional[str] = None
    unMotoristBodyPerAccident: Optional[str] = None
    unMotoristProperty: Optional[str] = None
    unMotoristAuto: Optional[str] = None
    cslSingleLimit: Optional[str] = None
    cslSingleAuto: Optional[str] = None
    nonCslSingleLimit: Optional[str] = None
    nonCslSingleAuto: Optional[str] = None
    cslBodyPerPerson: Optional[str] = None
    cslBodyPerAccident: Optional[str] = None
    cslProperty: Optional[str] = None
    cslSplitAuto: Optional[str] = None
    nonCslBodyPerPerson: Optional[str] = None
    nonCslBodyPerAccident: Optional[str] = None
    nonCslProperty: Optional[str] = None
    nonCslSplitAuto: Optional[str] = None
    errors: Optional[List]


class Insured(BaseModel):
    agent: Optional[str] = None
    entity: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    middleName: Optional[str] = None
    dob: Optional[str] = None
    suffix: Optional[str] = None
    gender: Optional[str] = None
    ssn: Optional[str] = None
    address1: Optional[str] = None
    address2: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zipCode: Optional[str] = None
    email: Optional[str] = None
    phoneNumber: Optional[str] = None
    licenseState: Optional[str] = None
    licenseNumber: Optional[str] = None
    licenseEff: Optional[str] = (None,)
    licenseExp: Optional[str] = None
    contactName: Optional[str] = None
    contactNumber: Optional[str] = None
    contactEmail: Optional[str] = None
    corporationName: Optional[str] = None
    taxIdNumber: Optional[str] = None
    isAddActive: Optional[bool] = None


class DriverDefaults(BaseModel):
    driverName: Optional[str] = None
    states: Optional[str] = None
    licenseNumber: Optional[str] = None
    licenseEffDate: Optional[str] = None
    licenseExpDate: Optional[str] = None


class Driver(BaseModel):
    driverName: Optional[str] = None
    states: Optional[str] = None
    licenseNumber: Optional[str] = None
    licenseEffDate: Optional[str] = None
    licenseExpDate: Optional[str] = None


class Drivers(BaseModel):
    values: Optional[List[Driver]] = None
    defaults: Optional[DriverDefaults] = None


class LossHistoryDefaults(BaseModel):
    accidentDate: Optional[str] = None
    reportedDate: Optional[str] = None
    claimNumber: Optional[str] = None
    claimType: Optional[str] = None
    subClaimNumber: Optional[str] = None
    totalIncurred: Optional[str] = None
    liabilityPaid: Optional[str] = None
    openReserve: Optional[str] = None
    status: Optional[str] = None
    previousPolicyNumber: Optional[str] = None
    priorCarrierName: Optional[str] = None
    originalInceptionDate: Optional[str] = None
    expirationDate: Optional[str] = None
    isExperienceMode: Optional[str] = None
    isPolicyTransferred: Optional[str] = None


class LossIncident(BaseModel):
    accidentDate: Optional[str] = None
    reportedDate: Optional[str] = None
    claimNumber: Optional[str] = None
    claimType: Optional[str] = None
    subClaimNumber: Optional[str] = None
    totalIncurred: Optional[str] = None
    liabilityPaid: Optional[str] = None
    openReserve: Optional[str] = None
    status: Optional[str] = None
    previousPolicyNumber: Optional[str] = None
    priorCarrierName: Optional[str] = None
    originalInceptionDate: Optional[str] = None
    expirationDate: Optional[str] = None
    isExperienceMode: Optional[str] = None
    isPolicyTransferred: Optional[str] = None


class LossHistory(BaseModel):
    incidents: Optional[List[LossIncident]] = None
    defaults: Optional[LossHistoryDefaults] = None


class Policy(BaseModel):
    policy: Optional[PolicyMeta] = None
    coverage: Optional[Coverage] = None
    insured: Optional[Insured] = None
    drivers: Optional[Drivers] = None
    loss_history: Optional[LossHistory] = None
    documents: Optional[dict] = None
    # vehicles: Optional[List[Vehicle]] = None


@app.get("/")
def home():
    return {"status": "ok"}


@app.get("/policies/")
def get_policies(title: str, date: str, premium: str):
    policies = db.collection("policies")
    return JSONResponse(content={"policies": policies})


@app.get("/policies/{policy_uuid}/", response_model=Policy)
def get_policy(policy_id: str):
    policy = db.collection("policies").where("id", "==", policy_id).get()
    return JSONResponse(content=policy.dict)


@app.post("/policies/", response_model=Policy)  # create a policy
def create_policy(policy: Policy):
    policies = db.collection("policies")
    policy_uuid = str(uuid.uuid4())
    now = datetime.utcnow()
    policies.document(policy_uuid).set({**policy.dict(), "created": now})


@app.put("/policies/{policy_uuid}/", response_model=Policy)  # create a policy
def update_policy(policy_id: str, policy: Policy):
    return


"""
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
        #########
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
        ######
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
        #######
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
        ######
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
        #######
        "documents": {},
        #######
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
"""
