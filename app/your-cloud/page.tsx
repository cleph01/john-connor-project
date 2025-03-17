import React from "react";

const DecoupleNASPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <header className="bg-gray-800 p-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center">
          Take Back Your Memories: Decouple from Big Tech and Own Your Photo
          Storage
        </h1>
      </header>

      <main className="container mx-auto p-4">
        <section className="text-center py-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Your Memories, Your Control: Break Free from Big Tech Storage
          </h2>
          <p className="text-base sm:text-lg mb-6">
            Reclaim your photos and videos with a secure, self-hosted NAS
            solution.
          </p>
          <div className="flex justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Learn How to Decouple
            </button>
          </div>
        </section>

        <section className="py-8">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            The Illusion of Convenience
          </h3>
          <p className="mb-4">
            For years, we've been told that cloud storage is the ultimate
            convenience. iCloud and Google Photos have become the default for
            storing our precious memories. But this convenience comes at a cost:
            your data is no longer yours. It's stored on servers you don't
            control, subject to the whims of corporations that prioritize profit
            over privacy.
          </p>
          <p className="mb-4">
            Big Tech companies want to keep you locked into their ecosystems.
            They profit from your data, using it to target ads and build
            detailed profiles of your life. They count on you being unaware of
            the alternatives.
          </p>
          <p className="mb-4">
            Five to ten years ago, setting up a personal media server was a
            complex and expensive undertaking. But technology has evolved.
            Today, powerful and user-friendly Network Attached Storage (NAS)
            devices make it easier than ever to take back control.
          </p>
        </section>

        <section className="py-8">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Own Your Memories, Secure Your Privacy
          </h3>
          <p className="mb-4">
            Imagine a world where your photos and videos are stored safely
            within your own home, accessible only to you and those you choose to
            share them with. That's the power of a NAS. You have complete
            control over your data, with no fear of privacy breaches or
            unexpected changes to terms of service.
          </p>
          <p className="mb-4">
            A NAS is essentially a private cloud server that you own and manage.
            It connects to your home network, allowing you to access your files
            from any device, anywhere in the world. It provides ample storage
            space, robust security features, and the flexibility to customize
            your setup to your specific needs.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Store all your photos, videos, and other files in one secure
              location.
            </li>
            <li>Access your media from any device, anywhere in the world.</li>
            <li>Create automatic backups to protect your data.</li>
            <li>
              Share photos and videos with family and friends without relying on
              third-party services.
            </li>
            <li>
              Use the facial recognition CLI to organize and name your pictures.
            </li>
          </ul>
        </section>

        <section className="py-8">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Demystifying the NAS
          </h3>
          <p className="mb-4">
            Setting up a NAS is simpler than you might think. Most NAS devices
            come with user-friendly interfaces and step-by-step instructions.
            You'll need a NAS device, a hard drive, and a network connection.
          </p>
          <p className="mb-4">The basic process involves:</p>
          <ol className="list-decimal list-inside mb-4">
            <li>Connecting the NAS to your router.</li>
            <li>Installing the hard drive.</li>
            <li>Configuring the NAS software.</li>
            <li>Transferring your photos and videos.</li>
          </ol>
          <p className="mb-4">
            Many NAS devices also offer mobile apps, allowing you to access your
            files from your smartphone or tablet. The JohnConnorProject will be
            providing detailed roadmaps and tutorials to assist you through the
            process.
          </p>
        </section>

        <section className="py-8 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Start Your Decoupling Journey Today
          </h3>
          <p className="mb-4">
            Don't let Big Tech control your memories any longer. Take the first
            step towards digital sovereignty. Explore our resources, learn how
            to set up your own NAS, and reclaim your data.
          </p>
          <div className="flex justify-center flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Learn How to Decouple
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
              Explore NAS Devices
            </button>
          </div>
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

export default DecoupleNASPage;
