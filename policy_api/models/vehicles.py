from pydantic import BaseModel
from typing import List, Optional


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
    baseEffDate: Optional[str]
    shl: Optional[str]
    garageAddress1: Optional[str]
    garageAddress2: Optional[str]
    garageZipCode2: Optional[str]
    garageCity: Optional[str]
    garageCounty: Optional[str]
    garageState: Optional[str]
    garageCountry: Optional[str]
    overallPremium: Optional[str]
    personalInjuryProtectionPremium: Optional[str]
    medicalPaymentsPremium: Optional[str]
    underinsuredMotoristPremium: Optional[str]
    uninsuredMotoristPremium: Optional[str]
    hiredCSLPremium: Optional[str]
    nonOwnedCSLPremium: Optional[str]


class Vehicles(BaseModel):
    # TODO Change this to "states" in the future. This is temporary to suit the front-end.
    values: Optional[List[VehicleState]]
