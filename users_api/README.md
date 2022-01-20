# Users API


This is a RESTful API meant for handling all-user related operations such as adding user accounts and authentication operations.

# Setup 

## Requirements

- Python 3.8+

1. Create and activate a virtual environment if you have not already.

```
python -m venv env
source env/bin/activate
```

2. Install dependencies.

```
pip install -r requirements.txt
```

3. Make and run database migrations.

```
python manage.py makemigrations
python manage.py migrate
```

4. Run the Users API server.

```
python manage.py runserver
```

Your server should start running at [localhost:8000](https://localhost:8000/).

# Endpoints

The following endpoints are required of the Surya front-end.

## Login

```http
POST /accounts/login
Content-Type application/json
```

**POST Body**

```json
{
    "email": "valid_email@example.com",
    "password": "exAmPl3p4sSw0rD123!"
}
```

**Response**

```json
{
    "detail": "Login successful",
    "token": "95d468fce4ec733c6fe6e1ec6cd1018c1996bd5d"
}
```

**Example cURL**

```bash
curl -L -X POST 'http://localhost:8000/accounts/login/' -H 'Content-Type: application/json' --data-raw '{
    "email": "valid_email@example.com",
    "password": "exAmPl3p4sSw0rD123!"
}'
```

## Other Endpoints

The following endpoints are available, but they aren't necessarily required for the Surya project at the time of this commit.

## Logout

```http
POST /accounts/logout
Content-Type application/json
```

**POST Body**

```json
{
    "token": "95d468fce4ec733c6fe6e1ec6cd1018c1996bd5d"
}
```

**Response**

```json
{}
```

## Register

```http
POST /accounts/register
Content-Type application/json
```

**POST Body**

```json
{
    "password": "exAmPl3p4sSw0rD123!",
    "first_name": "Surya",
    "last_name": "Ayrus",
    "email": "Surya@example.com",
    "password_confirm": "exAmPl3p4sSw0rD123!",
}
```

**Response**

```json
{
    "id": 1018,
    "first_name": "Surya",
    "last_name": "Ayrus",
    "email": "Surya@example.com"
}
```