import Hero from "@/app/components/sections/home/Hero";
import About from "@/app/components/sections/home/About";
import Products from "@/app/components/sections/home/Products";
import Platform from "@/app/components/sections/home/Platform";
import Techcarousel from "@/app/components/sections/home/Techcarousel";
import CEOMessage from "@/app/components/sections/home/CEOMessage";
import Faq from "@/app/components/sections/home/Faq";
import OurServices from "./components/sections/home/OurServices";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <Platform />
      <OurServices/>
      <Techcarousel />
      <CEOMessage />
      <Faq />
    </>
  );
}
