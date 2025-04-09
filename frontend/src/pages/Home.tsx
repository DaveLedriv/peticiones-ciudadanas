import PeticionForm from "../components/PeticionForm";
import Slider from "../components/Slider";
import CarouselDemo from "@/components/carousel-demo";
import CardHoverEffectDemo from "@/components/card-hover-effect-demo";


export default function Home() {
  return (
    <>
      {/* Slider debe estar fuera del contenedor centrado para ocupar toda la pantalla */}
      <section id = "inicio"> 
      <Slider />
      </section>
      

      {/* Carrusel*/}
      <CarouselDemo /> 

      {/* Sección principal con el contenido centrado */}
      <div className="flex flex-col gap-12 p-6 md:p-12 max-w-6xl mx-auto">

      <section id="sobre" className="bg-card text-card-foreground p-6 rounded-lg shadow border">
          <h2 className="text-2xl font-bold text-primary mb-4"> Sobre el autor</h2>
          <p className="text-muted-foreground leading-relaxed">
            Mi nombre es David Ledesma. Soy un ciudadano comprometido con el cambio y la participación activa de la sociedad en la mejora de nuestros municipios.
            A través de esta plataforma, quiero brindar una vía directa y moderna para que cada persona pueda alzar su voz y ser escuchada.
          </p>
        </section>

        <section className="bg-card text-card-foreground p-6 rounded-lg shadow border">
          <h2 className="text-2xl font-bold text-primary mb-4"> Mi historia</h2>
          <p className="text-muted-foreground leading-relaxed">
            Durante años he trabajado desde distintas trincheras sociales, y hoy quiero dar un paso más: abrir un espacio digital donde todas las voces tengan eco.
            Esta plataforma es solo el inicio de una transformación más amplia hacia una ciudadanía más empoderada.
          </p>
        </section>
        

        <section className="bg-card text-card-foreground p-6 rounded-lg shadow border">
          <h2 className="text-2xl font-bold text-primary mb-4"> Propuestas</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Crear canales directos de comunicación entre ciudadanos y autoridades.</li>
            <li>Fomentar la transparencia y el seguimiento público de las peticiones.</li>
            <li>Impulsar el uso de tecnología cívica para mejorar la calidad de vida.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-3xl font-bold text-center text-primary mb-8"> Proyectos destacados</h2>
            <CardHoverEffectDemo />
        </section>


        

        <section id="formulario" className="flex justify-center">
          <PeticionForm />
        </section>

      </div>
    </>
  );
}
