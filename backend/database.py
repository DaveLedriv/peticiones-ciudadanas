from sqlmodel import SQLModel, create_engine, Session
from dotenv import load_dotenv
import os

# Cargar variables de entorno desde archivo .env (local)
load_dotenv()

# Leer URL desde variable de entorno (Render o local)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./default.db")

# Crear el engine
engine = create_engine(DATABASE_URL, echo=True)

# Inicializar base de datos
def init_db():
    SQLModel.metadata.create_all(engine)

# Obtener sesión
def get_session():
    with Session(engine) as session:
        yield session
