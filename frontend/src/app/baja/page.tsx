import { Suspense } from "react";
import BajaContent from "./BajaContent";

export const metadata = {
  title: "Baja del newsletter",
  robots: { index: false },
};

export default function BajaPage() {
  return (
    <Suspense>
      <BajaContent />
    </Suspense>
  );
}
