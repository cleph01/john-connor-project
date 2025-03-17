import React from "react";
import CardContent from "../components/CardContent";

const Resources = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 text-center mb-6">
        Resources
      </h1>
      <p className="text-gray-400 text-sm sm:text-base md:text-lg text-center mb-8">
        Explore interactive tools, educational materials, and trusted resources
        to protect your digital presence and counter AI-driven threats.
      </p>

      <section className="mb-8 bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-red-400 mb-4">
          Home Cybersecurity Best Practices Checklist
        </h2>
        <p className="text-gray-300 text-sm mb-4">
          This checklist provides actionable steps to secure your home network
          and devices. Each item directly counters AI-driven threats by
          strengthening your digital perimeter. Trusted tools are linked for
          each checklist item for seamless access.
        </p>
        <ul className="list-disc text-gray-300 ml-6 mb-4">
          <li>
            Use a reputable VPN for encrypted browsing -{" "}
            <a href="https://protonvpn.com" className="text-red-400 underline">
              ProtonVPN
            </a>
          </li>
          <li>
            Deploy a firewall for network protection -{" "}
            <a href="https://pfSense.org" className="text-red-400 underline">
              pfSense
            </a>
          </li>
          <li>
            Implement a password manager -{" "}
            <a href="https://bitwarden.com" className="text-red-400 underline">
              Bitwarden
            </a>
          </li>
        </ul>
        <a
          href="/downloads/home-cybersecurity-checklist.pdf"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl w-full block text-center transition-all duration-300"
          download
        >
          Download Checklist
        </a>
      </section>

      <section className="mb-8 bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-red-400 mb-4">
          Interactive Cybersecurity Quiz
        </h2>
        <p className="text-gray-300 text-sm mb-4">
          Test your knowledge of home cybersecurity best practices. The quiz
          highlights vulnerabilities often exploited by AI-driven threats and
          offers personalized recommendations based on your answers.
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl w-full transition-all duration-300">
          Take the Quiz
        </button>
      </section>

      <div className="space-y-8 mb-8">
        {/* Alternative Internet Communication Section */}
        <section className="mb-8 bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-red-400 mb-4">
            Alternative Internet Communication
          </h2>
          <p className="text-gray-300 text-sm mb-4">
            Learn about censorship-resistant communication networks like IP over
            HAM radio. Understand how decentralized and resilient networks can
            ensure digital sovereignty in an era of increasing censorship.
          </p>
          <a
            href="/resources/ip-over-ham-roadmap"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl w-full block text-center transition-all duration-300"
          >
            Explore the Roadmap
          </a>
        </section>

        {/* Educational Materials Section */}
        <section className="bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-400 mb-4">
            Educational Materials
          </h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>
              Cybersecurity Basics: Understanding personal digital safety.
            </li>
            <li>Guides on secure communication and encryption.</li>
            <li>Recommended reading and video content for deeper learning.</li>
          </ul>
        </section>

        {/* Toolkits & Downloads Section */}
        <section className="bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-400 mb-4">
            Toolkits & Downloads
          </h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Open-source privacy tools for everyday use.</li>
            <li>Secure communication platform recommendations.</li>
            <li>Step-by-step VPN and firewall setup guides.</li>
          </ul>
        </section>

        {/* Video Library Section */}
        <section className="bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-400 mb-4">
            Video Library
          </h2>
          <p className="text-gray-300 mb-4">
            Explore expert interviews, webinars, and explainers focused on
            defending against AI-driven threats and fostering digital
            resilience.
          </p>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300">
            View Videos
          </button>
        </section>

        {/* External Resources Section */}
        <section className="bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-400 mb-4">
            External Resources
          </h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Trusted cybersecurity organizations and platforms.</li>
            <li>Government resources on digital protection.</li>
            <li>Community groups and discussion forums.</li>
          </ul>
        </section>

        {/* Self-Hosting & AI Defense Section */}
        <section className="bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-400 mb-4">
            Self-Hosting & AI Defense
          </h2>
          <p className="text-gray-300 mb-4">
            Learn how to self-host AI tools for independent truth-seeking and
            protect yourself from AI-driven digital threats.
          </p>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300">
            Learn More
          </button>
        </section>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <CardContent
          title="Trusted Tools for Cybersecurity"
          description="Links to vetted tools that align with checklist recommendations, including VPNs, firewalls, and password managers."
        />
        <CardContent
          title="Educational Materials"
          description="Comprehensive guides and articles on digital security and AI defense strategies."
        />
        <CardContent
          title="Toolkits & Frameworks"
          description="Practical resources for implementing robust cybersecurity solutions at home."
        />
        <CardContent
          title="Video Library"
          description="Watch expert tutorials and presentations on AI defense tactics."
        />
        <CardContent
          title="External Resources"
          description="Curated links to respected cybersecurity communities and organizations."
        />
        <CardContent
          title="Self-Hosting & AI Defense"
          description="Learn how to deploy self-hosted AI tools for personal security and truth-seeking."
        />
      </section>
    </div>
  );
};

export default Resources;
