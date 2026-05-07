import { HeroImpact } from "./components/HeroImpact";
import { HoneycombSection } from "./components/HoneycombSection";
import { FeaturesSection } from "./components/FeaturesSection";

export default function App() {
  return (
    <div className="size-full overflow-y-auto">
      <HeroImpact />
      <FeaturesSection />
      <HoneycombSection />
    </div>
  );
}