import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Peticion {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  municipio: string;
  direccion: string;
  categoria: string;
  asunto: string;
  mensaje: string;
  fecha: string;
}

export default function Dashboard() {
  const [peticiones, setPeticiones] = useState<Peticion[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const navigate = useNavigate();

  const fetchPeticiones = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8000/peticiones?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then((data) => {
        setPeticiones(data.data);
        setTotal(data.total);
      })
      .catch((err) => {
        console.error("Error al obtener peticiones:", err);
        navigate("/login");
      });
  };

  useEffect(() => {
    fetchPeticiones();
  }, [page]);

  const eliminarPeticion = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const confirm = window.confirm("¿Marcar esta petición como completada?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:8000/peticiones/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar");

      setPeticiones((prev) => prev.filter((p) => p.id !== id));
      setSelectedId(null);
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("❌ No se pudo eliminar la petición.");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
        📊 Panel de Peticiones Recibidas
      </h1>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 mb-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Municipio</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Asunto</th>
              <th className="px-4 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {peticiones.map((p) => (
              <>
                <tr
                  key={p.id}
                  className="hover:bg-blue-50 cursor-pointer transition"
                  onClick={() => setSelectedId((prev) => (prev === p.id ? null : p.id))}
                >
                  <td className="px-4 py-3">{p.nombre}</td>
                  <td className="px-4 py-3">{p.municipio}</td>
                  <td className="px-4 py-3 capitalize">{p.categoria}</td>
                  <td className="px-4 py-3">{p.asunto}</td>
                  <td className="px-4 py-3">
                    {new Date(p.fecha).toLocaleDateString()}
                  </td>
                </tr>

                {selectedId === p.id && (
                  <tr>
                    <td colSpan={5} className="bg-gray-50 px-6 py-4">
                      <div className="text-sm text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p><strong>📧 Correo:</strong> {p.correo}</p>
                          <p><strong>📱 Teléfono:</strong> {p.telefono}</p>
                          <p><strong>🏙️ Municipio:</strong> {p.municipio}</p>
                          {p.direccion && <p><strong>📍 Dirección:</strong> {p.direccion}</p>}
                        </div>
                        <div>
                          <p><strong>📂 Categoría:</strong> {p.categoria}</p>
                          <p><strong>📝 Asunto:</strong> {p.asunto}</p>
                          <p><strong>📨 Mensaje:</strong> {p.mensaje}</p>
                          <p><strong>📅 Fecha de envío:</strong> {new Date(p.fecha).toLocaleString()}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => eliminarPeticion(p.id)}
                        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        ✅ Marcar como Completado
                      </button>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
