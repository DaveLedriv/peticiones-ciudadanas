import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Obtener la URL de la base de datos desde la variable de entorno
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("La variable de entorno DATABASE_URL no está definida.")

# Crear el motor de la base de datos
engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
try:
    with engine.connect() as connection:
        print("Conexión a la base de datos establecida exitosamente.")
except Exception as e:
    print(f"Error al conectar a la base de datos: {e}")
