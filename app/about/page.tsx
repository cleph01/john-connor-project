import * as motion from "motion/react-client"
import Image from "next/image";
import Card from "../components/Card";

export default function About(){
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen flex flex-col items-center p-4">
     

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-6"
      >
        <h1 className="text-2xl font-bold uppercase tracking-widest text-red-500 mb-3 sm:text-3xl md:text-5xl">
          About The John Connor Project
        </h1>
        <p className="text-base text-blue-500 font-semibold mx-auto sm:text-lg md:text-xl max-w-2xl">
          Empowering a new generation of technologists to defend digital freedom and protect
          Main Street from AI-driven threats.
        </p>
      </motion.div>

      {/* Imagery Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full mt-8 sm:mt-10 md:max-w-3xl lg:max-w-4xl"
      >
        <Image
          src="/logo_skull.webp"
          alt="John Connor Project Android Logo"
          width={800}
          height={400}
          className="rounded-2xl shadow-xl w-full object-cover"
        />
      </motion.div>

      {/* Mission and Vision Section */}
      <Card className="bg-gray-800 text-gray-300 mt-6 w-full shadow-lg md:max-w-3xl lg:max-w-4xl">
       
          <h2 className="text-xl font-bold text-red-500 mb-3 text-center sm:text-2xl md:text-3xl">
            Our Mission
          </h2>
          <p className="text-sm leading-relaxed mb-5 sm:text-base md:text-lg">
            The John Connor Project exists to elevate IT and cybersecurity professionals as guardians
            of the digital frontier. Our knowledge and expertise should extend beyond serving big business —
            it should protect communities, families, and individuals from AI-driven threats.
          </p>

          <h2 className="text-xl font-bold text-red-500 mb-3 text-center sm:text-2xl md:text-3xl">
            Our Vision
          </h2>
          <p className="text-sm leading-relaxed sm:text-base md:text-lg">
            Just as society values mechanics, electricians, and plumbers for maintaining physical
            infrastructure, we envision a world where cybersecurity experts are equally recognized for
            safeguarding digital freedom. We aim to build a resilient network of technologists prepared
            to confront surveillance, data exploitation, and AI-based manipulation.
          </p>
       
      </Card>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mt-6 w-full flex justify-center"
      >
        <a href="/get-involved">
          <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold px-4 py-3 rounded-xl shadow-lg sm:w-auto">
            Join the Resistance
          </button>
        </a>
      </motion.div>
    </div>
  );
}
