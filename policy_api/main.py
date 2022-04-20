import json
from sqlite3 import Date
import uuid
from datetime import datetime
from typing import List, Optional

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from google.cloud import firestore
from google.api_core.datetime_helpers import DatetimeWithNanoseconds

app = FastAPI()

origins = [
    "localhost",
    "localhost:3000",
    "https://delta-pagoda-337917.ue.r.appspot.com",
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
    states: Optional[str]
    classification: Optional[str]
    lineOfBusiness: Optional[str]
    policyLineItem: Optional[str]
    coverageTerm: Optional[str]
    policyCategory: Optional[str]
    underwritingCode: Optional[str]
    agent: Optional[str]
    effectiveDate: Optional[str]
    expirationDate: Optional[str]
    radius: Optional[str]
    classCode: Optional[str]
    businessUseClass: Optional[str]
    sizeClass: Optional[str]


class Coverage(BaseModel):
    overall: Optional[Label]
    personalInjury: Optional[Label]
    medicalPayments: Optional[Label]
    underinsuredMotorist: Optional[Label]
    uninsuredMotorist: Optional[Label]
    csl: Optional[Label]
    nonOwnedCSL: Optional[Label]
    deductable: Optional[str]
    deductableAmount: Optional[str]
    deductableAutoEntry: Optional[str]
    combinedSectionLimit: Optional[str]
    combinedSectionEntry: Optional[str]
    splitSectionBodyPerPerson: Optional[str]
    splitSectionBodyPerAccidentOptions: Optional[str]
    splitSectionPropertyDamageOptions: Optional[str]
    splitSectionAutoEntryOptions: Optional[str]
    pIProtectionSingleLimit: Optional[str]
    pIProtectionSingleEntry: Optional[str]
    pIProtectionSplitBodyPerPerson: Optional[str]
    pIProtectionSplitBodyPerAccident: Optional[str]
    pIProtectionSplitPropertyDamage: Optional[str]
    pIProtectionSplitAutoEntry: Optional[str]
    medicalSingleLimit: Optional[str]
    medicalSingleEntry: Optional[str]
    medicalSplitBodyPerPerson: Optional[str]
    medicalSplitBodyPerAccident: Optional[str]
    medicalSplitPropertyDamage: Optional[str]
    medicalSplitAutoEntry: Optional[str]
    underinsuredMotoristSingleLimit: Optional[str]
    underinsuredMotoristSingleAutoEntry: Optional[str]
    underMotoristBodyPerPerson: Optional[str]
    underMotoristBodyPerAccident: Optional[str]
    underMotoristProperty: Optional[str]
    underMotoristAuto: Optional[str]
    uninsuredMotoristSingleLimit: Optional[str]
    uninsuredMotoristSingleAutoEntry: Optional[str]
    unMotoristBodyPerPerson: Optional[str]
    unMotoristBodyPerAccident: Optional[str]
    unMotoristProperty: Optional[str]
    unMotoristAuto: Optional[str]
    cslSingleLimit: Optional[str]
    cslSingleAuto: Optional[str]
    nonCslSingleLimit: Optional[str]
    nonCslSingleAuto: Optional[str]
    cslBodyPerPerson: Optional[str]
    cslBodyPerAccident: Optional[str]
    cslProperty: Optional[str]
    cslSplitAuto: Optional[str]
    nonCslBodyPerPerson: Optional[str]
    nonCslBodyPerAccident: Optional[str]
    nonCslProperty: Optional[str]
    nonCslSplitAuto: Optional[str]
    errors: Optional[List]


class Insured(BaseModel):
    agent: Optional[str]
    entity: Optional[str]
    firstName: Optional[str]
    lastName: Optional[str]
    middleName: Optional[str]
    dob: Optional[str]
    suffix: Optional[str]
    gender: Optional[str]
    ssn: Optional[str]
    address1: Optional[str]
    address2: Optional[str]
    city: Optional[str]
    state: Optional[str]
    zipCode: Optional[str]
    email: Optional[str]
    phoneNumber: Optional[str]
    licenseState: Optional[str]
    licenseNumber: Optional[str]
    licenseEff: Optional[str]
    licenseExp: Optional[str]
    contactName: Optional[str]
    contactNumber: Optional[str]
    contactEmail: Optional[str]
    corporationName: Optional[str]
    taxIdNumber: Optional[str]
    isAddActive: Optional[bool]


class DriverDefaults(BaseModel):
    driverName: Optional[str]
    states: Optional[str]
    licenseNumber: Optional[str]
    licenseEffDate: Optional[str]
    licenseExpDate: Optional[str]


class Driver(BaseModel):
    driverName: Optional[str]
    states: Optional[str]
    licenseNumber: Optional[str]
    licenseEffDate: Optional[str]
    licenseExpDate: Optional[str]


class Drivers(BaseModel):
    values: Optional[List[Driver]]
    defaults: Optional[DriverDefaults]


class LossHistoryDefaults(BaseModel):
    accidentDate: Optional[str]
    reportedDate: Optional[str]
    claimNumber: Optional[str]
    claimType: Optional[str]
    subClaimNumber: Optional[str]
    totalIncurred: Optional[str]
    liabilityPaid: Optional[str]
    openReserve: Optional[str]
    status: Optional[str]
    previousPolicyNumber: Optional[str]
    priorCarrierName: Optional[str]
    originalInceptionDate: Optional[str]
    expirationDate: Optional[str]
    isExperienceMode: Optional[str]
    isPolicyTransferred: Optional[str]


class LossIncident(BaseModel):
    accidentDate: Optional[str]
    reportedDate: Optional[str]
    claimNumber: Optional[str]
    claimType: Optional[str]
    subClaimNumber: Optional[str]
    totalIncurred: Optional[str]
    liabilityPaid: Optional[str]
    openReserve: Optional[str]
    status: Optional[str]
    previousPolicyNumber: Optional[str]
    priorCarrierName: Optional[str]
    originalInceptionDate: Optional[str]
    expirationDate: Optional[str]
    isExperienceMode: Optional[str]
    isPolicyTransferred: Optional[str]


class LossHistory(BaseModel):
    incidents: Optional[List[LossIncident]]
    defaults: Optional[LossHistoryDefaults]

# Documents (empty)

# Vehicles
class VehicleState(BaseModel):
    yesNo: Optional[str]
    category: Optional[str]
    classification: Optional[str]
    vehicleCategory: Optional[str]
    vehicleType: Optional[str]
    state: Optional[str]
    vehicleState: Optional[str]
    vehicleWeight: Optional[str]
    fuelType: Optional[str]
    vin: Optional[str]
    make: Optional[str]
    model: Optional[str]
    modelYear: Optional[str]
    seating: Optional[str]
    wheelChair: Optional[str]
    plateNumber: Optional[str]
    garageZipCode: Optional[str]
    zoneCode: Optional[str]
    rateClassCode: Optional[str]
    baseName: Optional[str]
    baseType: Optional[str]
    baseNumber: Optional[str]
    baseExpDate: Optional[str]
    shl: Optional[str]
    garageAddress1: Optional[str]
    garageAddress2: Optional[str]
    garageZipCode2: Optional[str]
    garageCity: Optional[str]
    garageCounty: Optional[str]
    garageState: Optional[str]
    garageCountry: Optional[str]

class VehicleDefaults(BaseModel):
    yesNo: Optional[str]
    category: Optional[str]
    classification: Optional[str]
    vehicleCategory: Optional[str]
    vehicleType: Optional[str]
    state: Optional[str]
    vehicleState: Optional[str]
    vehicleWeight: Optional[str]
    fuelType: Optional[str]
    vin: Optional[str]
    make: Optional[str]
    model: Optional[str]
    modelYear: Optional[str]
    seating: Optional[str]
    wheelChair: Optional[str]
    plateNumber: Optional[str]
    garageZipCode: Optional[str]
    zoneCode: Optional[str]
    rateClassCode: Optional[str]
    baseName: Optional[str]
    baseType: Optional[str]
    baseNumber: Optional[str]
    baseExpDate: Optional[str]
    shl: Optional[str]
    garageAddress1: Optional[str]
    garageAddress2: Optional[str]
    garageZipCode2: Optional[str]
    garageCity: Optional[str]
    garageCounty: Optional[str]
    garageState: Optional[str]
    garageCountry: Optional[str]
    
class Vehicles(BaseModel):
    vehicles: Optional[List[VehicleState]]
    defaultValue: Optional[str]
    yesNoValues: Optional[str]
    yesNoOptions: Optional[List[Label]]
    defaults: Optional[VehicleDefaults]


class Policy(BaseModel):
    policy: Optional[PolicyMeta]
    coverage: Optional[Coverage]
    insured: Optional[Insured]
    drivers: Optional[Drivers]
    loss_history: Optional[LossHistory]
    documents: Optional[dict]
    vehicles: Optional[Vehicles]


@app.get("/")
def home():
    return {"status": "ok"}


# TODO: Might need this later, so it was written.
def datetime_with_nanosecs_to_str(v: DatetimeWithNanoseconds):
    return f"{v.year},{v.month},{v.day},{v.hour}, {v.minute}, {v.second}, {v.tzinfo}"


@app.get("/policies/")
def get_policies(
    title: Optional[str] = None,
    date: Optional[str] = None,
    premium: Optional[str] = None,
):
    _policies = db.collection("policies").stream()

    policies = []
    for p in _policies:
        p_id = p.id
        p = p.to_dict()
        # p["created_at"] = _datetime_with_nanosecs_to_str(p["created_at"])
        # p["created_at"] = p["created_at"].strftime("%A, %d. %B %Y %I:%M%p")
        p["id"] = p_id
        p["created_at"] = p["created_at"].timestamp()
        policies.append(p)
    return JSONResponse(content=policies)


@app.get("/policies/{policy_id}/", response_model=Policy)
def get_policy(policy_id: str):
    policy_ref = db.collection("policies").document(policy_id)
    policy = policy_ref.get()
    if policy.exists:
        policy_id = policy.id
        policy = policy.to_dict()
        policy["id"] = policy_id
        policy["created_at"] = policy["created_at"].timestamp()
        return JSONResponse(content=policy)
    return JSONResponse(content={"error": "Document not found."})


@app.post("/policies/", response_model=Policy)
def create_policy(policy: Policy):
    policies = db.collection("policies")
    policy_uuid = str(uuid.uuid4())

    created_policy = policies.document(policy_uuid).set(
        {**policy.dict(), "created_at": datetime.utcnow()}
    )
    if created_policy:
        return JSONResponse(
            content={"created": True, "policy_id": policy_uuid, "error": None}
        )
    return JSONResponse(
        content={
            "created": False,
            "policy_id": None,
            "error": "There was a problem creating the policy.",
        }
    )


@app.put("/policies/{policy_id}/", response_model=Policy)
def update_policy(policy_id: str, policy: Policy):
    policies_ref = db.collection("policies")
    policy = policies_ref.document(policy_id)

    if policy.exists:
        try:
            policy.update(policy)
            return JSONResponse(
                content={"updated": True, "policy_id": policy_id, "error": None}
            )
        except Exception as e:
            return JSONResponse(
                content={
                    "created": False,
                    "policy_id": None,
                    "payload_was": policy,
                    "error": "There was a problem updating the policy. Check the payload submitted.",
                }
            )


"""
    manifest = {
        "policy": {
            "values": {
                "states" = Optional[str],
                "classification" = Optional[str],
                "lineOfBusiness" = Optional[str],
                "policyLineItem" = Optional[str],
                "coverageTerm" = Optional[str],
                "policyCategory" = Optional[str],
                "underwritingCode" = Optional[str],
                "agent" = Optional[str],
                "effectiveDate" = Optional[str],
                "expirationDate" = Optional[str],
                "radius" = Optional[str],
                "classCode" = Optional[str],
                "businessUseClass" = Optional[str],
                "sizeClass" = Optional[str],
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
                "deductable" = Optional[str],
                "deductableAmount" = Optional[str],
                "deductableAutoEntry" = Optional[str],
                "combinedSectionLimit" = Optional[str],
                "combinedSectionEntry" = Optional[str],
                "splitSectionBodyPerPerson" = Optional[str],
                "splitSectionBodyPerAccidentOptions" = Optional[str],
                "splitSectionPropertyDamageOptions" = Optional[str],
                "splitSectionAutoEntryOptions" = Optional[str],
                "pIProtectionSingleLimit" = Optional[str],
                "pIProtectionSingleEntry" = Optional[str],
                "pIProtectionSplitBodyPerPerson" = Optional[str],
                "pIProtectionSplitBodyPerAccident" = Optional[str],
                "pIProtectionSplitPropertyDamage" = Optional[str],
                "pIProtectionSplitAutoEntry" = Optional[str],
                "medicalSingleLimit" = Optional[str],
                "medicalSingleEntry" = Optional[str],
                "medicalSplitBodyPerPerson" = Optional[str],
                "medicalSplitBodyPerAccident" = Optional[str],
                "medicalSplitPropertyDamage" = Optional[str],
                "medicalSplitAutoEntry" = Optional[str],
                "underinsuredMotoristSingleLimit" = Optional[str],
                "underinsuredMotoristSingleAutoEntry" = Optional[str],
                "underMotoristBodyPerPerson" = Optional[str],
                "underMotoristBodyPerAccident" = Optional[str],
                "underMotoristProperty" = Optional[str],
                "underMotoristAuto" = Optional[str],
                "uninsuredMotoristSingleLimit" = Optional[str],
                "uninsuredMotoristSingleAutoEntry" = Optional[str],
                "unMotoristBodyPerPerson" = Optional[str],
                "unMotoristBodyPerAccident" = Optional[str],
                "unMotoristProperty" = Optional[str],
                "unMotoristAuto" = Optional[str],
                "cslSingleLimit" = Optional[str],
                "cslSingleAuto" = Optional[str],
                "nonCslSingleLimit" = Optional[str],
                "nonCslSingleAuto" = Optional[str],
                "cslBodyPerPerson" = Optional[str],
                "cslBodyPerAccident" = Optional[str],
                "cslProperty" = Optional[str],
                "cslSplitAuto" = Optional[str],
                "nonCslBodyPerPerson" = Optional[str],
                "nonCslBodyPerAccident" = Optional[str],
                "nonCslProperty" = Optional[str],
                "nonCslSplitAuto" = Optional[str],
            },
            "errors": [],
        },
        ######
        "insured": {
            "values": {
                "agent" = Optional[str],
                "entity" = Optional[str],
                "firstName" = Optional[str],
                "lastName" = Optional[str],
                "middleName" = Optional[str],
                "dob" = Optional[str],
                "suffix" = Optional[str],
                "gender" = Optional[str],
                "ssn" = Optional[str],
                "address1" = Optional[str],
                "address2" = Optional[str],
                "city" = Optional[str],
                "state" = Optional[str],
                "zipCode" = Optional[str],
                "email" = Optional[str],
                "phoneNumber" = Optional[str],
                "licenseState" = Optional[str],
                "licenseNumber" = Optional[str],
                "licenseEff" = Optional[str],
                "licenseExp" = Optional[str],
                "contactName" = Optional[str],
                "contactNumber" = Optional[str],
                "contactEmail" = Optional[str],
                "corporationName" = Optional[str],
                "taxIdNumber" = Optional[str],
            },
            "isAddActive": False,
        },
        #######
        "drivers": {
            "values": [
                {
                    "driverName" = Optional[str],
                    "states" = Optional[str],
                    "licenseNumber" = Optional[str],
                    "licenseEffDate" = Optional[str],
                    "licenseExpDate" = Optional[str],
                }
            ],
            "defaults": {
                "driverName" = Optional[str],
                "states" = Optional[str],
                "licenseNumber" = Optional[str],
                "licenseEffDate" = Optional[str],
                "licenseExpDate" = Optional[str],
            },
        },
        ######
        "lossHistory": {
            "values": [
                {
                    "accidentDate" = Optional[str],
                    "reportedDate" = Optional[str],
                    "claimNumber" = Optional[str],
                    "claimType" = Optional[str],
                    "subClaimNumber" = Optional[str],
                    "totalIncurred" = Optional[str],
                    "liabilityPaid" = Optional[str],
                    "openReserve" = Optional[str],
                    "status" = Optional[str],
                    "previousPolicyNumber" = Optional[str],
                    "priorCarrierName" = Optional[str],
                    "originalInceptionDate" = Optional[str],
                    "expirationDate" = Optional[str],
                    "isExperienceMode" = Optional[str],
                    "isPolicyTransferred" = Optional[str],
                }
            ],
            "defaults": {
                "accidentDate" = Optional[str],
                "reportedDate" = Optional[str],
                "claimNumber" = Optional[str],
                "claimType" = Optional[str],
                "subClaimNumber" = Optional[str],
                "totalIncurred" = Optional[str],
                "liabilityPaid" = Optional[str],
                "openReserve" = Optional[str],
                "status" = Optional[str],
                "previousPolicyNumber" = Optional[str],
                "priorCarrierName" = Optional[str],
                "originalInceptionDate" = Optional[str],
                "expirationDate" = Optional[str],
                "isExperienceMode" = Optional[str],
                "isPolicyTransferred" = Optional[str],
            },
        },
        #######
        "documents": {},
        #######
        "vehicles": {
            "values": [
                {
                    "yesNo": "No",
                    "category" = Optional[str],
                    "classification" = Optional[str],
                    "vehicleCategory" = Optional[str],
                    "vehicleType" = Optional[str],
                    "state" = Optional[str],
                    "vehicleState" = Optional[str],
                    "vehicleWeight" = Optional[str],
                    "fuelType" = Optional[str],
                    "vin" = Optional[str],
                    "make" = Optional[str],
                    "model" = Optional[str],
                    "modelYear" = Optional[str],
                    "seating" = Optional[str],
                    "wheelChair" = Optional[str],
                    "plateNumber" = Optional[str],
                    "garageZipCode" = Optional[str],
                    "zoneCode" = Optional[str],
                    "rateClassCode" = Optional[str],
                    "baseName" = Optional[str],
                    "baseType" = Optional[str],
                    "baseNumber" = Optional[str],
                    "baseExpDate" = Optional[str],
                    "shl" = Optional[str],
                    "garageAddress1" = Optional[str],
                    "garageAddress2" = Optional[str],
                    "garageZipCode2" = Optional[str],
                    "garageCity" = Optional[str],
                    "garageCounty" = Optional[str],
                    "garageState" = Optional[str],
                    "garageCountry" = Optional[str],
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
                "category" = Optional[str],
                "classification" = Optional[str],
                "vehicleCategory" = Optional[str],
                "vehicleType" = Optional[str],
                "state" = Optional[str],
                "vehicleState" = Optional[str],
                "vehicleWeight" = Optional[str],
                "fuelType" = Optional[str],
                "vin" = Optional[str],
                "make" = Optional[str],
                "model" = Optional[str],
                "modelYear" = Optional[str],
                "seating" = Optional[str],
                "wheelChair" = Optional[str],
                "plateNumber" = Optional[str],
                "garageZipCode" = Optional[str],
                "zoneCode" = Optional[str],
                "rateClassCode" = Optional[str],
                "baseName" = Optional[str],
                "baseType" = Optional[str],
                "baseNumber" = Optional[str],
                "baseExpDate" = Optional[str],
                "shl" = Optional[str],
                "garageAddress1" = Optional[str],
                "garageAddress2" = Optional[str],
                "garageZipCode2" = Optional[str],
                "garageCity" = Optional[str],
                "garageCounty" = Optional[str],
                "garageState" = Optional[str],
                "garageCountry" = Optional[str],
            },
        },
    }
    return JSONResponse(content=manifest)
"""
