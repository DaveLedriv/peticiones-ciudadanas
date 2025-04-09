from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from typing import Optional

class Usuario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    hashed_password: str

class Peticion(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    correo: str
    telefono: str
    municipio: str
    direccion: Optional[str]
    categoria: str
    asunto: str
    mensaje: str
    fecha: datetime = Field(default_factory=datetime.utcnow)
