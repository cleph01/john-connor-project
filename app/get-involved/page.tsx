const GetInvolved = () => {
    return (
      <div className="p-4 sm:p-6 md:p-8 bg-gray-900 min-h-screen">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 text-center mb-6">
          Get Involved
        </h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg text-center mb-8">
          Join the mission. Register as a technologist or cybersecurity professional to help protect your community from AI-driven threats.  <u>This is not a charity.</u>  You will negotiate a fair price between you and your client.
        </p>
        <form className="bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-md max-w-lg mx-auto space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            placeholder="Location (City, State)"
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <textarea
            placeholder="Briefly describe your expertise and how you can contribute."
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[120px]"
          />
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            Submit Application
          </button>
        </form>
      </div>
    );
  }

  export default GetInvolved;