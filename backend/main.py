from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import peticiones, auth
from database import init_db

app = FastAPI()

# 🔐 CORS CONFIGURADO PARA PRODUCCIÓN Y LOCAL
origins = [
    "https://peticiones-ciudadanas.vercel.app",  # Frontend desplegado en Vercel
    "http://localhost:5173",                     # Desarrollo local
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicialización de la base de datos al arrancar
@app.on_event("startup")
def on_startup():
    init_db()

# Importa tus routers después del middleware
app.include_router(auth.router)
app.include_router(peticiones.router)
