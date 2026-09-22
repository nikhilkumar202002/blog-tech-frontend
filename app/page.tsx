import Hero from "@/app/components/sections/home/Hero";
import About from "@/app/components/sections/home/About";
import Service from "@/app/components/sections/home/Service";
import OurServices from "@/app/components/sections/home/OurServices";
import Platform from "@/app/components/sections/home/Platform";
import Techcarousel from "@/app/components/sections/home/Techcarousel";
import CEOMessage from "@/app/components/sections/home/CEOMessage";
import Faq from "@/app/components/sections/home/Faq";

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
