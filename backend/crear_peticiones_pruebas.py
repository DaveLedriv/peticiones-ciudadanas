from datetime import datetime, timedelta
from random import choice, randint
from sqlmodel import Session
from database import engine
from models import Peticion

nombres = ["Juan Pérez", "María García", "Carlos Sánchez", "Ana López", "Luis Martínez", "Laura Torres"]
correos = ["juan@mail.com", "maria@mail.com", "carlos@mail.com", "ana@mail.com", "luis@mail.com", "laura@mail.com"]
telefonos = ["1234567890", "9876543210", "5551234567", "4449876543", "2223334444"]
municipios = ["Álamo", "Tuxpan", "Pánuco", "Papantla", "Poza Rica"]
categorias = ["salud", "educacion", "transporte", "seguridad", "infraestructura", "otro"]
asuntos = ["Falta de alumbrado", "Baches", "Inseguridad", "Mejora de transporte", "Problemas de salud"]
mensajes = [
    "Solicito apoyo para mejorar las condiciones de las calles en mi colonia.",
    "Hace falta patrullaje en la zona.",
    "Solicito más rutas de transporte público.",
    "El centro de salud no tiene medicamentos.",
    "Necesitamos una escuela secundaria más cercana.",
]

with Session(engine) as session:
    for i in range(20):
        peticion = Peticion(
            nombre=choice(nombres),
            correo=choice(correos),
            telefono=choice(telefonos),
            municipio=choice(municipios),
            direccion=f"Calle Ficticia #{randint(1, 100)}",
            categoria=choice(categorias),
            asunto=choice(asuntos),
            mensaje=choice(mensajes),
            fecha=datetime.utcnow() - timedelta(days=randint(0, 30))
        )
        session.add(peticion)
    session.commit()

print("✅ 20 peticiones ficticias creadas exitosamente.")
