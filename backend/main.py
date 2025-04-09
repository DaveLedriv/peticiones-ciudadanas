from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import peticiones, auth
from database import init_db

app = FastAPI()

# ✅ MIDDLEWARE CORS (antes de los routers)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

# ✅ IMPORTANTE: después del middleware
app.include_router(auth.router)
app.include_router(peticiones.router)
