import Image from "next/image";
import "../styles/Section.css";

const technologies = [
  {
    name: "Java",
    src: "/tech_logos/731_java.png",
    width: 280,
    height: 480,
    className: "java",
  },
  {
    name: "React Native",
    src: "/tech_logos/react-native.png",
    width: 384,
    height: 102,
    className: "react-native",
  },
  {
    name: "Spring Boot",
    src: "/tech_logos/spring-boot.png",
    width: 700,
    height: 174,
    className: "spring-boot",
  },
  {
    name: "PostgreSQL",
    src: "/tech_logos/pngwing.com.png",
    width: 2977,
    height: 535,
    className: "postgresql",
  },
  {
    name: "Hibernate",
    src: "/tech_logos/Hibernate_logo_a.png",
    width: 2313,
    height: 642,
    className: "hibernate",
  },
  {
    name: "Apache Maven",
    src: "/tech_logos/Apache_Maven_logo.png",
    width: 340,
    height: 86,
    className: "maven",
  },
];

export default function Techcarousel() {
  return (
    <section className="tech-carousel-section" aria-labelledby="tech-carousel-title">
      <div className="site-container">
        <h2 className="tech-carousel-title" id="tech-carousel-title">
          Our <span className="tech-carousel-title-accent">Technology</span> Stack
        </h2>

        <div className="tech-carousel-viewport">
          <div className="tech-carousel-track">
            {[0, 1].map((copy) => (
              <div
                className="tech-carousel-group"
                aria-hidden={copy === 1}
                key={copy}
              >
                {technologies.map((technology) => (
                  <div
                    className={`tech-carousel-logo tech-carousel-logo--${technology.className}`}
                    key={technology.name}
                  >
                    <Image
                      src={technology.src}
                      alt={technology.name}
                      width={technology.width}
                      height={technology.height}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
