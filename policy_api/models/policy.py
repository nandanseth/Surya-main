from pydantic import BaseModel
from typing import Optional
from . import Insured, Drivers, LossHistory, Coverage, Vehicles, Payment

import models


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
