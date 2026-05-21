import { Suspense } from "react";
import ConfirmarContent from "./ConfirmarContent";

export const metadata = {
  title: "Confirmar suscripción",
  robots: { index: false },
};

export default function ConfirmarPage() {
  return (
    <Suspense>
      <ConfirmarContent />
    </Suspense>
  );
}
