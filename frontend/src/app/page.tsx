import Hero from "@/components/sections/Hero";
import Producto from "@/components/sections/Producto";
import Modulos from "@/components/sections/Modulos";
import QuienesSomos from "@/components/sections/QuienesSomos";
import ComoFunciona from "@/components/sections/ComoFunciona";
import ListaEspera from "@/components/sections/ListaEspera";
import Contacto from "@/components/sections/Contacto";

export default function Home() {
  return (
    <>
      <Hero />
      <Producto />
      <Modulos />
      <QuienesSomos />
      <ComoFunciona />
      <ListaEspera />
      <Contacto />
    </>
  );
}
