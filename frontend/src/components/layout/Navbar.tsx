"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#producto", label: "Producto" },
  { href: "#modulos", label: "Módulos" },
  { href: "#como-funciona", label: "Cómo funciona" },
  // { href: "#subscripción", label: "Precios" },
  { href: "#quienes-somos", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="navbar fixed top-0 left-0 w-full z-50 bg-white/85 dark:bg-[#0d0d0d]/85 backdrop-blur-3xl border-b border-gray-200 dark:border-gray-800">
        <nav className="max-w-full mx-auto flex justify-between items-center py-4 px-6">
          {/* LOGO */}
          <Link href="/" aria-label="Inicio - Diamadmin" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Diamadmin"
              className="h-10 w-auto logo-filter"
            />
          </Link>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 text-sm font-medium">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-gray-600 dark:text-gray-300 hover:text-[#1B75BB] dark:hover:text-[#3DB5E6] transition">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a
                href="#contacto"
                className="px-5 py-2 bg-gradient-to-r from-[#1B75BB] to-[#3DB5E6] text-white text-sm font-bold rounded-full hover:scale-105 transition-transform shadow"
              >
                Solicitar demo
              </a>
            </div>
          </div>

          {/* MÓVIL — botón hamburguesa */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="p-2 rounded border border-gray-300 dark:border-gray-600 hover:border-[#3DB5E6] transition-colors"
            >
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* MENÚ MÓVIL — fuera del header para evitar que backdrop-blur rompa el fixed */}
      {open && (
        <div className="md:hidden fixed inset-0 bg-white dark:bg-[#0d0d0d] z-[60] flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <Link href="/" aria-label="Inicio - Diamadmin" onClick={() => setOpen(false)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="Diamadmin" className="h-10 w-auto logo-filter" />
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="p-2 rounded border border-gray-300 dark:border-gray-600 hover:border-[#3DB5E6] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <ul className="flex flex-col flex-1 justify-center px-8 gap-8 text-xl font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  onClick={() => setOpen(false)}
                  href={l.href}
                  className="block text-gray-700 dark:text-gray-200 hover:text-[#1B75BB] dark:hover:text-[#3DB5E6] transition"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="block text-center px-6 py-4 bg-gradient-to-r from-[#1B75BB] to-[#3DB5E6] text-white font-bold rounded-full text-base"
              >
                Solicitar demo
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
