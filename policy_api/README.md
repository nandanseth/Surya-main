# Policy API

Manage policies through these endpoints.

# Service

| Environment | URL |
| ----------- | --- |
| Prod | https://policy-api-dot-surya-systems.uc.r.appspot.com/ |
| Dev  |  N/A  |


# Endpoints

## Fetch all policies

### Example

```http
GET /policies/
```

```json
[{"policy":null,"coverage":null,"created_at":1646796575.739563,"loss_history":null,"documents":{},"drivers":null,"insured":null,"id":"732c9438-80d5-4db5-9623-f024e521c6fa"},{"drivers":null,"policy":null,"insured":null,"documents":{},"loss_history":null,"created_at":1646795046.390487,"coverage":null,"id":"ac4c6814-93be-48a8-aa21-f63df5c4226c"}]
```

## Fetch and filter policies


```http
GET /policies/?title=&date=&premium=
```

Example

```
```

*Response*
```json
```

## Fetch policy by ID

```http
GET /policies/:id/
```

Example

```
curl http://localhost:8000/policies/732c9438-80d5-4db5-9623-f024e521c6fa/
```

*Response*

```json
{"coverage":null,"drivers":null,"loss_history":null,"created_at":1646796575.739563,"documents":{},"policy":null,"insured":null,"id":"732c9438-80d5-4db5-9623-f024e521c6fa"}
```

## Create a new policy

```http
POST /policies/
```

Example

```
curl -L -X POST 'http://localhost:8000/policies/' -H 'Content-Type: application/json' --data-raw '{"foo":"bar"}'
```

*Response*
```json
{"created":true,"policy_id":"2f97b469-8807-4ba9-8098-d67a576a297c"}
```

## Update a policy

```http
PUT /policies/:id/
```

Example

```
```

*Response*

```json
```