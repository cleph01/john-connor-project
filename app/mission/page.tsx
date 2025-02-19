import Image from "next/image";

import Card from "../components/Card";
import CardContent from "../components/CardContent";

// Animation library
// Need this version of import language for Server Side Rendering (SSR)
import * as motion from "motion/react-client"

const Mission = () => {
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
          Our Mission
        </h1>
        <p className="text-base text-blue-500 font-semibold mx-auto sm:text-lg md:text-xl max-w-2xl">
          Building the Resistance. One Technologist at a Time — equipping individuals and communities
          with the knowledge and tools to defend against AI-driven digital threats.
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

      {/* Core Objectives Section */}
      <Card className="bg-gray-800 text-gray-300 mt-6 w-full shadow-lg md:max-w-3xl lg:max-w-4xl">
        <CardContent title="What Drives Us" description="The John Connor Project is more than a movement; it’s a mission to ensure cybersecurity
            professionals play a critical role in protecting digital freedom. We believe that every individual
            deserves to understand how to safeguard their data, defend against AI exploitation, and
            maintain autonomy in an increasingly connected world."
        >
          <h2 className="text-xl font-bold text-red-500 mb-3 text-center sm:text-2xl md:text-3xl">
            How We Achieve Our Mission
          </h2>
          <ul className="list-disc list-inside text-sm leading-relaxed sm:text-base md:text-lg space-y-3">
            <li>
              Creating accessible educational resources on digital security, AI threats, and personal defense.
            </li>
            <li>
              Establishing a public directory of cybersecurity professionals for communities and small businesses.
            </li>
            <li>
              Promoting self-hosted AI solutions to prevent data exploitation by large corporations.
            </li>
            <li>
              Connecting technologists with individuals seeking practical, real-world cybersecurity solutions.
            </li>
          </ul>
        </CardContent>
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
            Get Involved Now
          </button>
        </a>
      </motion.div>
    </div>
  );
}

export default Mission;