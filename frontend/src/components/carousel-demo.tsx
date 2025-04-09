"use client";

import Carousel from "../components/UI/carousel";

export default function CarouselDemo() {
  const slideData = [
    {
      title: "Montañas místicas",
      button: "Explorar",
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d",
    },
    {
      title: "Sueños urbanos",
      button: "Explorar",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c",
    },
    {
      title: "Noches de neón",
      button: "Explorar",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c",
    },
    {
      title: "Susurros del desierto",
      button: "Explorar",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c",
    },
  ];

  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
