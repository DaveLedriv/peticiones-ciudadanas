from sqlmodel import Session
from database import engine
from models import Usuario
from auth_utils import hash_password

admin = Usuario(
    username="admin1",
    hashed_password=hash_password("Sistemas10#")
)

with Session(engine) as session:
    session.add(admin)
    session.commit()
    print("✅ Usuario administrador creado")
