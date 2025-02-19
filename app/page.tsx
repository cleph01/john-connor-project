import Image from "next/image";





import Navbar from "./components/Nav";
import Button from "./components/Button";
import Card from "./components/Card";
// Animation library
// Need this version of import language for Server Side Rendering (SSR)
import * as motion from "motion/react-client"
import Link from "next/link";
// alternative (client-side): import { motion } from "motion/react"





export default function Home() {
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
    
   
    {/* Logo */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Image
        src="/logo_skull.webp"
        alt="John Connor Project Logo"
        width={200}
        height={200}
        className="mb-4 sm:w-48 sm:h-48"
      />
    </motion.div>

    {/* Title & Tagline */}
    <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-widest text-red-500 text-center">
      The John Connor Project
    </h1>
    <p className="text-lg sm:text-xl text-blue-500 mt-2 text-center font-semibold">
    Reprogram the Future. One Technologist at a Time.
    </p>

    {/* Mission Statement */}
    <Card className="bg-gray-800 text-gray-300 mt-6 w-full max-w-md sm:max-w-3xl shadow-lg">
    <p className="text-base sm:text-lg leading-relaxed text-center">
        The John Connor Project is dedicated to empowering IT and cybersecurity professionals
        to defend Main Street from AI-driven threats. Just as mechanics, electricians, and
        plumbers are essential to physical infrastructure, cybersecurity experts must become
        the protectors of digital freedom. Our mission is to educate, connect, and mobilize
        technologists to safeguard individuals from surveillance, data exploitation, and
        AI-based manipulation.
      </p>
    </Card>

    {/* Call to Action */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="mt-6 w-full flex justify-center"
    >
      <Link href="/get-involved">
        <Button className="w-full sm:w-auto bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold px-6 py-3 rounded-xl shadow-lg">Join the Resistance</Button>
      </Link>
    </motion.div>
  </div>
  );
}
