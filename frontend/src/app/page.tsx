import Hero from "@/components/sections/Hero";
import Producto from "@/components/sections/Producto";
import Modulos from "@/components/sections/Modulos";
import QuienesSomos from "@/components/sections/QuienesSomos";
import ComoFunciona from "@/components/sections/ComoFunciona";
import Contacto from "@/components/sections/Contacto";
// import Suscripcion from "@/components/sections/Suscripcion";

export default function Home() {
  return (
    <>
      <Hero />
      <Producto />
      <Modulos />
      <QuienesSomos />
      <ComoFunciona />
      <Contacto />
      {/* <Suscripcion /> */}
    </>
  );
}
