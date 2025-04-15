import { useState } from "react";

export default function PeticionForm() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    municipio: "",
    direccion: "",
    categoria: "",
    asunto: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/peticiones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      

      if (!res.ok) throw new Error("Error al enviar la petición");

      setEnviado(true);
      setError(false);
      setForm({
        nombre: "",
        correo: "",
        telefono: "",
        municipio: "",
        direccion: "",
        categoria: "",
        asunto: "",
        mensaje: "",
      });

      setTimeout(() => setEnviado(false), 3000);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl bg-card text-card-foreground shadow-xl rounded-2xl p-10 border border-border"
    >
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
         Envía tu Petición Ciudadana
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-muted-foreground">
            Nombre completo *
          </label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            type="text"
            required
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-muted-foreground">
            Correo electrónico *
          </label>
          <input
            name="correo"
            value={form.correo}
            onChange={handleChange}
            type="email"
            required
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-muted-foreground">
            Teléfono de contacto *
          </label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            type="tel"
            required
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-muted-foreground">
            Municipio *
          </label>
          <input
            name="municipio"
            value={form.municipio}
            onChange={handleChange}
            type="text"
            required
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-muted-foreground">
            Dirección (opcional)
          </label>
          <input
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-muted-foreground">
            Categoría de la petición *
          </label>
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition"
          >
            <option value="">Selecciona una categoría</option>
            <option value="transporte">Transporte</option>
            <option value="seguridad">Seguridad</option>
            <option value="salud">Salud</option>
            <option value="educacion">Educación</option>
            <option value="infraestructura">Infraestructura</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-muted-foreground">
            Asunto *
          </label>
          <input
            name="asunto"
            value={form.asunto}
            onChange={handleChange}
            type="text"
            required
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-muted-foreground">
            Descripción detallada *
          </label>
          <textarea
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            rows={5}
            required
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition resize-none"
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-8 bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition"
      >
        🚀 Enviar Petición
      </button>

      {enviado && (
        <p className="text-green-600 text-center mt-4 text-sm">
          ✅ ¡Petición enviada con éxito!
        </p>
      )}
      {error && (
        <p className="text-red-600 text-center mt-4 text-sm">
          ❌ Ocurrió un error. Inténtalo nuevamente.
        </p>
      )}
    </form>
  );
}
