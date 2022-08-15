from pydantic import BaseModel
from typing import List, Optional


class Driver(BaseModel):
    driverName: Optional[str]
    states: Optional[str]
    licenseNumber: Optional[str]
    licenseEffDate: Optional[str]
    licenseExpDate: Optional[str]
    driverEffDate: Optional[str]
    driverExpDate: Optional[str]


class DriverDefaults(BaseModel):
    driverName: Optional[str]
    states: Optional[str]
    licenseNumber: Optional[str]
    licenseEffDate: Optional[str]
    licenseExpDate: Optional[str]


class Drivers(BaseModel):
    values: Optional[List[Driver]]
    defaults: Optional[DriverDefaults]
