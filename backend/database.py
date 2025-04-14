from sqlmodel import SQLModel, create_engine, Session

# 🔽 IMPORTA TUS MODELOS AQUÍ
from models import Peticion, Usuario

DATABASE_URL = "postgresql://postgres.xpzlzwkusueordfomcxj:Hola0810-10@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
