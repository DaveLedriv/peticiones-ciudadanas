from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import peticiones, auth
from database import init_db

app = FastAPI()

# 🔐 CORS CONFIGURADO PARA PRODUCCIÓN
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://peticiones-ciudadanas.vercel.app",  # ✅ tu frontend en producción
        "http://localhost:5173",                     # ✅ por si pruebas en local
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(auth.router)
app.include_router(peticiones.router)
