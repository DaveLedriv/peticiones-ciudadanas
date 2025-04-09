"use client";

import { HoverEffect } from "@/components/UI/card-hover-effect";

export default function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "Stripe",
    description:
      "Empresa tecnológica que construye infraestructura económica para internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "Servicio de streaming con películas, series, anime y más en dispositivos conectados.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "Compañía tecnológica global especializada en servicios y productos en línea.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "Empresa enfocada en construir productos que fomentan la conexión global.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "Compañía líder en e-commerce, cloud computing y tecnología de consumo.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "Gigante tecnológico que desarrolla software, hardware y servicios digitales.",
    link: "https://microsoft.com",
  },
];
