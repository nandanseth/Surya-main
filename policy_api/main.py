import json
import uuid
from datetime import datetime
from typing import Optional

from fastapi.responses import JSONResponse
from google.cloud import firestore

import config
import models
from utilities.general import get_dict_updates

# TODO Refactor this. The indirection isn't necessary. This is just to get this delivered.
app = config.app

# Initiate a firestore client instance for storing anf fetching data.
db = firestore.Client()


@app.get("/")
def home():
    """Basic hello-world for a ping.

    Returns:
        str: JSON-formatted string with a friendly message.
    """
    return {"status": "ok"}


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


@app.get("/policies/{policy_id}/", response_model=models.Policy)
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


@app.post("/policies/", response_model=models.Policy)
def create_policy(policy_payload: models.Policy):
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

    for d in policy["drivers"]:
        d["driverEffDate"] = policy["effectiveDate"]
        d["driverExpDate"] = policy["expirationDate"]

    for v in policy["vehicles"]:
        for vehicle_state in v:
            vehicle_state["baseEffDate"] = policy["effectiveDate"]
            vehicle_state["baseExpDate"] = policy["expirationDate"]

    created_policy = policies.document(policy_uuid).set(
        {**policy, "created_at": datetime.utcnow()}
    )
    if created_policy:
        return JSONResponse(
            content={
                "created": True,
                "policy_id": policy_uuid,
                "error": None,
                "payload": policy_payload.json(),
            }
        )
    return JSONResponse(
        content={
            "created": False,
            "policy_id": None,
            "payload": policy_payload,
            "error": "There was a problem creating the policy.",
        }
    )


def add_endorsement_to_db(policy_id: str, old_policy: dict, new_policy: dict):
    """Creates an endorsement object in the endorsements collection within Firestore.
    This function assumes the policy is being updated entirely. The whole new policy
    dictionary is required for this function to work as intended.

    Args:
        policy_id (str): A UUID4 string representing an existing policy.
        old_policy (dict): The original policy being update
        new_policy (dict): The updated policy.
    """

    # Verify that a policy exists with the policy ID supplied by the caller.
    policy = db.collection("policies").document(policy_id)
    if policy:
        endorsement = {
            "old": old_policy,
            "new": new_policy,
            "changes": get_dict_updates(old_policy, new_policy),
        }
        endorsements = db.collection("endorsements")
        endorsement_uuid = str(uuid.uuid4())

        # Add an endorsement to the endorsements collection.
        endorsements.document(endorsement_uuid).set(
            {**endorsement, "id": endorsement_uuid, "created_at": datetime.utcnow()}
        )


@app.put("/policies/{policy_id}/", response_model=models.Policy)
def update_policy(policy_id: str, policy_payload: models.Policy):
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
