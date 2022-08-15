from pydantic import BaseModel
from typing import Optional


class Payment(BaseModel):
    premium: Optional[str]
