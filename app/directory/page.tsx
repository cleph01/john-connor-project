import CardContent from "../components/CardContent";

const PublicDirectory = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 text-center mb-6">
        Public Directory
      </h1>
      <p className="text-gray-400 text-sm sm:text-base md:text-lg text-center mb-8">
        Connect with verified technologists and cybersecurity professionals in your area for digital protection and guidance.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <CardContent
          title="Jane Doe"
          description="Cybersecurity Analyst - Greenville, SC"
        >
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl w-full transition-all duration-300">
            Contact
          </button>
        </CardContent>
        <CardContent
          title="John Smith"
          description="Network Engineer - Charlotte, NC"
        >
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl w-full transition-all duration-300">
            Contact
          </button>
        </CardContent>
      </div>
    </div>
  );
}

export default PublicDirectory;