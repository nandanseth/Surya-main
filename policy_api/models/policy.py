from pydantic import BaseModel
from typing import Optional
from models.insured import Insured
from models.drivers import Drivers
from models.loss_history import LossHistory
from models.coverage import Coverage
from models.vehicles import Vehicles
from models.payment import Payment

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


class Policy(BaseModel):
    policy: Optional[PolicyMeta]
    insured: Optional[Insured]
    drivers: Optional[Drivers]
    loss_history: Optional[LossHistory]
    documents: Optional[dict]
    coverage: Optional[Coverage]
    vehicles: Optional[Vehicles]
    payment: Optional[Payment]
