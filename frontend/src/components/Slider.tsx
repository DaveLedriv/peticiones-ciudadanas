import { useEffect, useState } from "react";

const images = [
  {
    url: "https://movimientociudadanosonora.com/wp-content/uploads/2021/10/logoMC.png",
    title: "Tu voz importa",
    subtitle: "Envía tus propuestas y mejora tu comunidad",
  },
  {
    url: "https://source.unsplash.com/1920x1080/?public,speech",
    title: "Participación ciudadana real",
    subtitle: "Haz peticiones que lleguen a quienes deciden",
  },
  {
    url: "https://source.unsplash.com/1920x1080/?people,city",
    title: "Transparencia y acción",
    subtitle: "Seguimiento y respuesta a tus ideas",
  },
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-screen h-[90vh]">
      <img
        src={images[index].url}
        alt={`slide-${index}`}
        className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow">
          {images[index].title}
        </h1>
        <p className="mt-4 text-white text-lg md:text-2xl max-w-2xl drop-shadow">
          {images[index].subtitle}
        </p>
        <a
          href="#formulario"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Ir al formulario
        </a>
      </div>
    </section>
  );
}
