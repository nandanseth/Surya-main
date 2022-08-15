from pydantic import BaseModel
from typing import List, Optional


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
