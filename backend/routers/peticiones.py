from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select
from database import get_session
from models import Peticion
from auth import verificar_token_autorizacion
from fastapi import HTTPException


router = APIRouter()

@router.post("/peticiones", response_model=Peticion)
def crear_peticion(peticion: Peticion, session: Session = Depends(get_session)):
    session.add(peticion)
    session.commit()
    session.refresh(peticion)
    return peticion

@router.get("/peticiones")
def listar_peticiones(
    session: Session = Depends(get_session),
    usuario=Depends(verificar_token_autorizacion),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100)
):
    offset = (page - 1) * limit
    query = select(Peticion)
    
    all_results = session.exec(query).all()   # ← obtenemos todos los resultados
    total = len(all_results)                  # ← usamos len() en vez de count()

    paginados = all_results[offset:offset+limit]  # ← seccionamos por paginación
    return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": paginados
    }

@router.delete("/peticiones/{peticion_id}")
def eliminar_peticion(
    peticion_id: int,
    session: Session = Depends(get_session),
    usuario=Depends(verificar_token_autorizacion),
):
    peticion = session.get(Peticion, peticion_id)
    if not peticion:
        raise HTTPException(status_code=404, detail="Petición no encontrada")
    session.delete(peticion)
    session.commit()
    return {"message": "Petición eliminada correctamente"}