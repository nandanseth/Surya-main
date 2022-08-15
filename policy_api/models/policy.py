from pydantic import BaseModel
from typing import Optional

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
    policy: Optional[models.PolicyMeta]
    insured: Optional[models.Insured]
    drivers: Optional[models.Drivers]
    loss_history: Optional[models.LossHistory]
    documents: Optional[dict]
    coverage: Optional[models.Coverage]
    vehicles: Optional[models.Vehicles]
    payment: Optional[models.Payment]
