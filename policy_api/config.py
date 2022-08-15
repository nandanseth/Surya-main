from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Manage CORS
LOCAL_PORT = 3000
PRODUCTION_ORIGIN = "https://delta-pagoda-337917.ue.r.appspot.com"

origins = [
    f"http://localhost:{LOCAL_PORT}",  # This is strictly for local development.
    PRODUCTION_ORIGIN,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
