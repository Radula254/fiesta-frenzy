import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-2">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          Ignite Your Spirit<br />with the Ultimate<br /> Celebration of<br />
          <span className="text-primary">Fiesta Fever</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Join the fiesta frenzy, where every moment bursts with joy, laughter,
          and vibrant celebration under the festive skies!
        </p>
        <div className="flex gap-4 text-sm">
            <button className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full">
                Order now
                <Right /> 
            </button>
            <button className="flex border-0 gap-2 py-2 items-center text-gray-600 font-semibold">
                Learn more
                <Right />
            </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/chicken.jpeg"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"chicken"}
          className="rounded-full"
        />
      </div>
    </section>
  );
}
