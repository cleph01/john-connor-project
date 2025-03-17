const IPOverHamRoadmap = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 text-center mb-6">
        IP Over HAM Radio Roadmap
      </h1>
      <p className="text-gray-400 text-sm sm:text-base md:text-lg text-center mb-4">
        A structured path to establishing censorship-resistant communication
        networks using IP over HAM radio.
      </p>

      <section className="mb-8 bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-red-400 mb-4">
          Phase 1: Research & Licensing
        </h2>
        <p className="text-gray-300 text-sm">
          Understand regulatory requirements and obtain an amateur radio license
          to legally operate HAM radio equipment.
        </p>
      </section>

      <section className="mb-8 bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-red-400 mb-4">
          Phase 2: Equipment & Setup
        </h2>
        <p className="text-gray-300 text-sm">
          Acquire necessary hardware, such as transceivers, TNCs, and antennas,
          and set up a basic HAM radio station.
        </p>
      </section>

      <section className="mb-8 bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-red-400 mb-4">
          Phase 3: Experimentation with Digital Modes
        </h2>
        <p className="text-gray-300 text-sm">
          Learn and test digital transmission protocols like AX.25, Winlink, and
          packet radio for data communication.
        </p>
      </section>

      <section className="mb-8 bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-red-400 mb-4">
          Phase 4: Implementing IP Networking
        </h2>
        <p className="text-gray-300 text-sm">
          Explore AMPRNet (44.0.0.0/8) and mesh networking techniques to
          establish IP-based communication over HAM radio.
        </p>
      </section>

      <section className="mb-8 bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-red-400 mb-4">
          Phase 5: Deployment & Community Building
        </h2>
        <p className="text-gray-300 text-sm">
          Develop a resilient, decentralized network and educate others on
          setting up their own censorship-resistant communication systems.
        </p>
      </section>
    </div>
  );
};
export default IPOverHamRoadmap;
