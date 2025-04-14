from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import peticiones, auth
from database import init_db

app = FastAPI()

# ✅ Middleware CORS: permite acceso desde Vercel y localhost
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://peticiones-ciudadanas.vercel.app/"],  # Reemplaza con tu dominio real
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()

# ✅ Rutas
app.include_router(auth.router)
app.include_router(peticiones.router)
