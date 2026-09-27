import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Welcome } from "@/components/sections/Welcome";
import { About } from "@/components/sections/About";
import { Menu } from "@/components/sections/Menu";
import { Booking } from "@/components/sections/Booking";
import { Location } from "@/components/sections/Location";
import { Closing } from "@/components/sections/Closing";
import { FloatingCta } from "@/components/ui/FloatingCta";
import { restaurantJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()).replace(/</g, "\\u003c") }}
      />
      <main className="overflow-x-clip">
        <Hero />
        <Marquee />
        <Welcome />
        <About />
        <Menu />
        <Booking />
        <Location />
        <Closing />
      </main>
      <FloatingCta />
    </>
  );
}
