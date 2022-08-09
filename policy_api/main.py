import json
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

# Manage CORS
LOCAL_PORT = 3000
PRODUCTION_ORIGIN = "https://delta-pagoda-337917.ue.r.appspot.com"

origins = [
    f"http://localhost:{LOCAL_PORT}",  # This is strictly for local development.
    PRODUCTION_ORIGIN,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initiate a firestore client instance for storing anf fetching data.
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
    overall: Optional[str]
    personalInjury: Optional[str]
    medicalPayments: Optional[str]
    underinsuredMotorist: Optional[str]
    uninsuredMotorist: Optional[str]
    csl: Optional[str]
    nonOwnedCSL: Optional[str]
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
    driverEffDate: Optional[str]
    driverExpDate: Optional[str]


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
    # TODO Change this to "states" in the future. This is temporary to suit the front-end.
    values: Optional[List[VehicleState]]


class Payment(BaseModel):
    premium: Optional[str]


class Policy(BaseModel):
    policy: Optional[PolicyMeta]
    insured: Optional[Insured]
    drivers: Optional[Drivers]
    loss_history: Optional[LossHistory]
    documents: Optional[dict]
    coverage: Optional[Coverage]
    vehicles: Optional[Vehicles]
    payment: Optional[Payment]


@app.get("/")
def home():
    """Basic hello-world for a ping.

    Returns:
        str: JSON-formatted string with a friendly message.
    """
    return {"status": "ok"}


# TODO: Might need this later, so it was written.
def datetime_with_nanosecs_to_str(v: DatetimeWithNanoseconds):
    return f"{v.year},{v.month},{v.day},{v.hour}, {v.minute}, {v.second}, {v.tzinfo}"


@app.get("/policies/")
def get_policies(
    title: Optional[str] = None,
    date: Optional[str] = None,
    premium: Optional[str] = None,
) -> JSONResponse:
    """Returns all existing policies. WARNING: This can cause huge bottleneck
    if the number of policies increases dramatically. Consider limiting response
    via pagination and offering a page_size:str query string parameter.

    Args:
        title (Optional[str], optional): Filter by Policy title. Defaults to None.
        date (Optional[str], optional): Filter by date created. Defaults to None.
        premium (Optional[str], optional): Filter by premium. Defaults to None.

    Returns:
        JSONResponse: JSONResponse object containing a list of Policy JSON objects.
    """
    _policies = db.collection("policies").stream()

    # TODO This will grow to be huge. Beware.
    policies = []

    for p in _policies:
        p_id = p.id
        p = p.to_dict()
        # p["created_at"] = datetime_with_nanosecs_to_str(p["created_at"])
        p["id"] = p_id
        p["created_at"] = p["created_at"].timestamp()
        policies.append(p)

    # TODO Filters taken out because FE wanted to do the filtering instead.
    # TODO This will eventually cause issue on the FE since the size of this will grow huge.
    # TODO Re-implement filters. ex: (_policies.where(...).order_by(...))
    return JSONResponse(content=policies)


@app.get("/policies/{policy_id}/", response_model=Policy)
def get_policy(policy_id: str):
    """Fetch a Policy based on a UUID string.

    Args:
        policy_id (str): UUID of a Policy

    Returns:
        JSONResponse: JSONResponse object containing a Policy JSON object string.
    """
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
def create_policy(policy_payload: Policy):
    """Create a Policy and store it in the database via POST method.

    Args:
        policy_payload (Policy): Contains everything necessary to store policy info.

    Returns:
        JSONResponse: JSONResponse object containing the created Policy.
        Format:
        {
            "created": bool,
            "policy_id": str||None,
            "payload": Type[Policy],
            "error": str||None,
        }

    """
    policies = db.collection("policies")
    policy_uuid = str(uuid.uuid4())
    policy = json.loads(policy_payload.json())

    for i, _ in policy["drivers"]:
        policy["drivers"][i]["driverEffDate"] = policy["effectiveDate"]
        policy["drivers"][i]["driverEffDate"] = policy["expirationDate"]

    created_policy = policies.document(policy_uuid).set(
        {**policy, "created_at": datetime.utcnow()}
    )
    if created_policy:
        return JSONResponse(
            content={"created": True, "policy_id": policy_uuid, "error": None, "payload": policy_payload.json(),}
        )
    return JSONResponse(
        content={
            "created": False,
            "policy_id": None,
            "payload": policy_payload,
            "error": "There was a problem creating the policy.",
        }
    )


@app.put("/policies/{policy_id}/", response_model=Policy)
def update_policy(policy_id: str, policy_payload: Policy):
    policies_ref = db.collection("policies")
    policy = policies_ref.document(policy_id)

    if policy.exists:
        try:
            policy.update(policy_payload)
            return JSONResponse(
                content={"updated": True, "policy_id": policy_id, "error": None}
            )
        except Exception as e:
            return JSONResponse(
                content={
                    "created": False,
                    "policy_id": None,
                    "payload_was": policy_payload,
                    "error": "There was a problem updating the policy. Check the payload submitted.",
                }
            )
