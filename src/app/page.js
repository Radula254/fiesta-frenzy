import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex-cols gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            vestibulum lectus nec justo dignissim, nec suscipit quam fermentum.
            Fusce eget leo at nisi eleifend scelerisque. Sed vitae velit nec
            velit malesuada sollicitudin.
          </p>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          vestibulum lectus nec justo dignissim, nec suscipit quam fermentum.
          Fusce eget leo at nisi eleifend scelerisque. Sed vitae velit nec velit
          malesuada sollicitudin.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            vestibulum lectus nec justo dignissim, nec suscipit quam fermentum.
          </p>
        
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders 
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact us'} 
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+254798765432">+254 798 765 432</a>
        </div>
      </section>
    </>
  );
}
