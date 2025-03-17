import React from "react";

const ProxyVotingToolPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <header className="bg-gray-800 p-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center">
          Empower Your Proxy Vote: Self-Hosted AI for Informed Decisions
        </h1>
      </header>

      <main className="container mx-auto p-4">
        <section className="text-center py-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Take Back Your Voice: The Financial Proxy Statements is Power
          </h2>
          <p className="text-base sm:text-lg mb-6">
            Empower yourself to make informed voting decisions with our
            open-source, self-hosted proxy analysis tool.
          </p>
          <div className="flex justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Explore the Roadmap
            </button>
          </div>
        </section>

        <section className="py-8">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Introduction
          </h3>
          <p className="mb-4">
            Your retirement funds, held by investment giants like Vanguard,
            State Street, and BlackRock, come with voting rights – rights that
            these firms have effectively usurped. They wield immense influence
            over corporate policy and, by extension, our society, all because
            they control <em>our</em> proxy votes. This concentration of power
            allows them to make decisions that often prioritize their own
            interests over those of individual investors.
          </p>
          <p className="mb-4">
            The complexity of proxy statements has historically been a barrier
            to individual participation. But now, with the advent of self-hosted
            Large Language Models (LLMs), we have the potential to reclaim that
            power. This tool is designed to demystify those complex documents,
            empowering you to understand and exercise your voting rights
            directly, from the security of your own self-hosted environment.
          </p>
          <p className="mb-4">
            This is about more than just voting; it's about reclaiming our
            digital sovereignty and challenging the centralized control that has
            eroded our influence. It's about taking back <em>our</em> voice.
          </p>
        </section>

        <section className="py-8">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Key Features
          </h3>
          <ul className="list-disc list-inside">
            <li>
              AI-Powered Summarization: Get concise summaries of complex proxy
              statements.
            </li>
            <li>
              Personalized Analysis: Tailor the AI's analysis to your values and
              priorities.
            </li>
            <li>
              Self-Hosted Security: Keep your data private and secure within
              your own environment.
            </li>
            <li>
              Open-Source and Transparent: Contribute to the development of a
              tool that empowers everyone.
            </li>
            <li>
              Community-Driven Insights: Share and discuss proxy voting
              information with other investors.
            </li>
          </ul>
        </section>

        <section className="py-8">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Your Path to Informed Proxy Voting
          </h3>
          <h4 className="text-lg sm:text-xl font-semibold mb-2">
            Choose Your Deployment Option
          </h4>

          <div className="mb-6">
            <h5 className="text-base sm:text-lg font-semibold mb-2">
              NAS Deployment
            </h5>
            <p className="mb-2">
              For maximum control and privacy, we recommend deploying the proxy
              voting tool on your Network Attached Storage (NAS) device. This
              option allows you to keep your data completely within your own
              network.
            </p>
            <ul className="list-disc list-inside mb-2">
              <li>
                Compatible NAS device with sufficient processing power and
                storage (we are still researching minimum capacity requirements)
              </li>
              <li>Docker or similar containerization software.</li>
              <li>Basic command-line knowledge.</li>
              <li>Reliable internet connection.</li>
              <li>Python 3.x Installed.</li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View the NAS Deployment Roadmap
            </button>
          </div>

          <div>
            <h5 className="text-base sm:text-lg font-semibold mb-2">
              Cloud Deployment (Alternative)
            </h5>
            <p className="mb-2">
              If a NAS deployment isn't feasible, you can also leverage cloud
              computing resources. This option provides flexibility and
              scalability, but it's essential to choose a provider with strong
              privacy and security practices.
            </p>
            <ul className="list-disc list-inside mb-2">
              <li>Cloud computing account with sufficient resources.</li>
              <li>Docker or similar containerization software.</li>
              <li>Basic command-line knowledge.</li>
              <li>Reliable internet connection.</li>
              <li>Python 3.x Installed.</li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View the Cloud Deployment Roadmap
            </button>
          </div>
        </section>

        <section className="py-8 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Join the Movement
          </h3>
          <p className="mb-4">
            Empower yourself and your community. Explore the deployment options,
            and take control of your proxy votes today.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Explore the Roadmap
          </button>
        </section>
      </main>

      <footer className="bg-gray-800 p-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} JohnConnorProject.org. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default ProxyVotingToolPage;
