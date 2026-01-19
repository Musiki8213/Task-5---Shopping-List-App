import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/5.png')] bg-cover bg-center blur-[6px]"></div>
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 px-3 sm:px-6 py-4 max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-lg sm:text-2xl font-extrabold text-center mb-4 tracking-wide">
          About <span className="text-white">ShopMate</span>
        </h1>

        {/* Card */}
        <div className="backdrop-blur-[6px] bg-white/10 p-3 sm:p-5 rounded-xl shadow-xl border border-white/10 
                        max-h-[65vh] sm:max-h-[70vh] overflow-y-auto">
          {/* Mission */}
          <section className="mb-4">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Our Mission
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              At <span className="text-white font-semibold">ShopMate</span>, we
              make shopping easier, smarter, and more organized by helping you
              manage lists effortlessly.
            </p>
          </section>

          {/* What We Offer */}
          <section className="mb-4">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              What We Offer
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Clean interface for managing lists</li>
              <li>Upload images for quick identification</li>
              <li>Secure & personal shopping lists</li>
              <li>Local JSON-based storage</li>
            </ul>
          </section>

        

          {/* Footer */}
          <section className="text-center">
            <p className="text-gray-300 italic text-xs sm:text-sm">
              “Smart organization leads to smart living.”
            </p>
            <p className="mt-2 text-gray-400 text-xs">
              © {new Date().getFullYear()} ShopMate
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
