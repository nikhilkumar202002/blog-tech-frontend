import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Service from "./components/sections/Service";
import OurServices from "./components/sections/OurServices";
import Platform from "./components/sections/Platform";
import Techcarousel from "./components/sections/Techcarousel";
import CEOMessage from "./components/sections/CEOMessage";
import Faq from "./components/sections/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Service />
      <Platform />
      <OurServices />
      <Techcarousel />
      <CEOMessage />
      <Faq />
    </>
  );
}
