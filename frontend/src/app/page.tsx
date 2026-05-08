import Hero from "@/components/sections/Hero";
import Producto from "@/components/sections/Producto";
import Modulos from "@/components/sections/Modulos";
import ComoFunciona from "@/components/sections/ComoFunciona";
import Suscripcion from "@/components/sections/Suscripcion";
import QuienesSomos from "@/components/sections/QuienesSomos";
import Contacto from "@/components/sections/Contacto";

export default function Home() {
  return (
    <>
      <Hero />
      <Producto />
      <Modulos />
      <ComoFunciona />
      {/* <Suscripcion /> */}
      <QuienesSomos />
      <Contacto />
    </>
  );
}
