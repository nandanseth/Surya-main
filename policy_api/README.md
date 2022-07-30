# Policy API

Manage policies through these endpoints.

# Local Development Setup

**Pre-Requisites**

- Python 3.8+ must be installed.
- Google App Engine Python Runtime has been installed. (**See**: [Setting Up Your Development Environment](https://cloud.google.com/appengine/docs/standard/python3/setting-up-environment))

**Assumptions**

- You have already ran `gcloud auth login`.
  - If you're using Windows Subsystem, remember to use the `--no-launch-browser` flag (`gcloud auth application-default login --no-launch-browser`).
- You already have already set the environment variavble `GOOGLE_APPLICATION_CREDENTIALS` to a service account credentials JSON file.
  - If not, you should read the guide on how to do so. If you don't want to read, the **tl;dr** is:
  1. Create a service account [here](https://console.cloud.google.com/iam-admin/serviceaccounts/create?project=delta-pagoda-337917).
  2. Generate a key file [here](https://console.cloud.google.com/iam-admin/serviceaccounts/details/100820157649746532316/keys?project=delta-pagoda-337917).
  3. Download the key file and save it as `service-account.json` somewhere, and copy its file path.
  4. Finally, append the setting of `GOOGLE_APPLICATION_CREDENTIALS` to your `.bashrc` file: `echo 'export GOOGLE_APPLICATION_CREDENTIALS="<path to key file goes here>"' >> ~/.bashrc`
  5. Restart your terminal or run `source ~/.bashrc`.


- `dev_appserver.py` exists. Run `which dev_appserver.py`.

**How to run this service with live data from GCP...**

If you want access to live data found within GCP services used by this service, do the following:

1) Make sure you're in a Python virtual environment. If you are not, create one using `python3 -m venv env`, and then activating the environment by running `source env/bin/activate`.
2. Run `make install`.
3. Run `make run-gcp`.

*You should see server messages from the `dev_appserver.py` script.*

**How to run this service without dev_appserver.py...**

Running this service without the need to read from GCP services is pretty straightforward. Just **make sure you are authenticated via `gcloud auth login` before proceeding.**

1) Make sure you're in a Python virtual environment. If you are not, create one using `python3 -m venv env`, and then activating the environment by running `source env/bin/activate`.
2. Run `make install`.
3. Run `make run`.

*You should see `uvicorn` messages indicating that the server is running.*

# Service

| Environment | URL                                                          |
| ----------- | ------------------------------------------------------------ |
| Prod        | https://policy-api-dot-delta-pagoda-337917.ue.r.appspot.com/ |
| Dev         | N/A                                                          |
| local       | http://localhost:3001                                                          |

# Endpoints

## Fetch all policies

### Example

```http
GET /policies/
```

```json
[
  {
    "policy": null,
    "coverage": null,
    "created_at": 1646796575.739563,
    "loss_history": null,
    "documents": {},
    "drivers": null,
    "insured": null,
    "id": "732c9438-80d5-4db5-9623-f024e521c6fa"
  },
  {
    "drivers": null,
    "policy": null,
    "insured": null,
    "documents": {},
    "loss_history": null,
    "created_at": 1646795046.390487,
    "coverage": null,
    "id": "ac4c6814-93be-48a8-aa21-f63df5c4226c"
  }
]
```

## Fetch and filter policies

```http
GET /policies/?title=&date=&premium=
```

Example

```

```

_Response_

```json

```

## Fetch policy by ID

Retrieves a single policy document based on its UUID.

```http
GET /policies/:id/
```

Example

```
curl http://localhost:8000/policies/732c9438-80d5-4db5-9623-f024e521c6fa/
```

_Response_

```json
{
  "insured": {
    "address2": null,
    "licenseNumber": null,
    "licenseExp": null,
    "email": null,
    "licenseEff": null,
    "licenseState": "Oregon",
    "suffix": null,
    "entity": "Individual",
    "zipCode": null,
    "agent": "Quantum Risk Solutions (QRSBRK)",
    "ssn": null,
    "firstName": null,
    "address1": null,
    "contactNumber": null,
    "state": "Oregon",
    "gender": "Male",
    "lastName": null,
    "phoneNumber": null,
    "taxIdNumber": null,
    "isAddActive": null,
    "city": null,
    "contactEmail": null,
    "dob": null,
    "contactName": null,
    "middleName": null,
    "corporationName": null
  },
  "vehicles": {
    "values": [
      {
        "state": "Oregon",
        "vehicleState": null,
        "shl": null,
        "vehicleWeight": "0 - 10,000",
        "baseExpDate": null,
        "plateNumber": null,
        "wheelChair": "Yes",
        "garageAddress2": null,
        "baseType": "Black Car",
        "fuelType": "Gas",
        "garageCounty": null,
        "yesNo": "No",
        "modelYear": null,
        "garageZipCode": null,
        "garageCity": null,
        "make": null,
        "baseName": null,
        "vin": null,
        "model": null,
        "vehicleType": "Car Service",
        "seating": null,
        "baseNumber": null,
        "garageAddress1": null,
        "garageZipCode2": null,
        "category": "Taxicabs and Limousines",
        "vehicleCategory": "Taxicab - Owner-Driver",
        "garageState": "Oregon",
        "garageCountry": null,
        "classification": null,
        "rateClassCode": null,
        "zoneCode": null
      }
    ]
  },
  "policy": {
    "radius": "Local",
    "expirationDate": null,
    "effectiveDate": null,
    "underwritingCode": "New Business",
    "sizeClass": "Light Trucks ",
    "lineOfBusiness": "Commercial",
    "classCode": "Non-fleet",
    "agent": "Quantum Risk Solutions (QRSBRK)",
    "coverageTerm": "Annual",
    "states": "Oregon",
    "policyLineItem": "Owner Operator",
    "policyCategory": "Taxicabs and Limousines",
    "businessUseClass": "Service",
    "classification": null
  },
  "drivers": {
    "defaults": null,
    "values": [
      {
        "states": "Oregon",
        "driverName": null,
        "licenseExpDate": null,
        "licenseNumber": null,
        "licenseEffDate": null
      }
    ]
  },
  "loss_history": null,
  "created_at": 1651859369.697056,
  "coverage": {
    "underMotoristBodyPerPerson": "25,000",
    "csl": "Yes",
    "uninsuredMotorist": "Combined Single Limit",
    "errors": null,
    "medicalSplitAutoEntry": "Excluded",
    "overall": "Combined Single Limit",
    "pIProtectionSingleEntry": "Excluded",
    "medicalSplitPropertyDamage": "10,000",
    "cslSingleAuto": "Excluded",
    "underinsuredMotorist": "Combined Single Limit",
    "underMotoristAuto": "Excluded",
    "underinsuredMotoristSingleLimit": "35,000",
    "deductableAmount": null,
    "cslSplitAuto": "Excluded",
    "medicalSingleEntry": "Excluded",
    "nonCslBodyPerAccident": "25,000",
    "nonOwnedCSL": "Yes",
    "unMotoristAuto": "Excluded",
    "unMotoristBodyPerAccident": "25,000",
    "nonCslSingleAuto": "Excluded",
    "uninsuredMotoristSingleAutoEntry": "Excluded",
    "splitSectionBodyPerPerson": "25,000",
    "medicalSplitBodyPerPerson": "25,000",
    "personalInjury": "Combined Single Limit",
    "splitSectionBodyPerAccidentOptions": "25,000",
    "underMotoristProperty": "10,000",
    "nonCslProperty": "10,000",
    "cslBodyPerPerson": "25,000",
    "unMotoristProperty": "10,000",
    "nonCslSingleLimit": "35,000",
    "combinedSectionEntry": "Excluded",
    "medicalSplitBodyPerAccident": "25,000",
    "unMotoristBodyPerPerson": "25,000",
    "pIProtectionSplitAutoEntry": "Excluded",
    "pIProtectionSplitPropertyDamage": "10,000",
    "medicalSingleLimit": "35,000",
    "nonCslBodyPerPerson": "25,000",
    "underinsuredMotoristSingleAutoEntry": "Excluded",
    "uninsuredMotoristSingleLimit": "35,000",
    "cslSingleLimit": "35,000",
    "splitSectionAutoEntryOptions": "Excluded",
    "splitSectionPropertyDamageOptions": "10,000",
    "pIProtectionSingleLimit": "35,000",
    "deductable": null,
    "combinedSectionLimit": "35,000",
    "cslBodyPerAccident": "25,000",
    "nonCslSplitAuto": "Excluded",
    "pIProtectionSplitBodyPerPerson": "25,000",
    "deductableAutoEntry": null,
    "underMotoristBodyPerAccident": "25,000",
    "medicalPayments": "Combined Single Limit",
    "pIProtectionSplitBodyPerAccident": "25,000",
    "cslProperty": "10,000"
  },
  "documents": {
    
  },
  "id": "17264e26-fa53-48da-a450-c477cb456687"
}
```

## Create a new policy

```http
POST /policies/
```

Example

```
curl -L -X POST 'http://localhost:8000/policies/' -H 'Content-Type: application/json' --data-raw '{"foo":"bar"}'
```

_Response_

```json
{ "created": true, "policy_id": "2f97b469-8807-4ba9-8098-d67a576a297c" }
```

## Update a policy

```http
PUT /policies/:id/
```

Example

```

```

_Response_

```json

```
