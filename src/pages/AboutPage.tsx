import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Background Blur & Overlay */}
      <div className="absolute inset-0 bg-[url('/5.png')] bg-cover bg-center filter blur-[6px]"></div>
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 p-8 max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide">
          About <span className="text-white">ShopMate</span> 
        </h1>

        {/* Card Section */}
        <div className="backdrop-blur-[8px] bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
          {/* Mission */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              At <span className="text-white font-semibold">ShopMate</span>, our goal is to make your
              shopping experience easier, smarter, and more organized. We help you create, manage, and
              track shopping lists effortlessly — whether you’re grabbing groceries, gadgets, or gifts.
            </p>
          </section>

          {/* What We Offer */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Simple and clean interface for managing lists.</li>
              <li>Option to upload item images for quick identification.</li>
              <li> Secure and personal — your lists belong only to you.</li>
              <li> Data stored locally via JSON server for easy customization.</li>
            </ul>
          </section>

          {/* Team Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Meet the Owner</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4 text-center shadow-md hover:bg-white/20 transition">
              
                <h3 className="text-lg font-semibold">Sithomola Musiki</h3>
                <p className="text-gray-400 text-sm">Frontend Developer</p>
              </div>

              <div className="bg-white/10 rounded-lg p-4 text-center shadow-md hover:bg-white/20 transition">
               
                <h3 className="text-lg font-semibold">Sithomola Musiki</h3>
                <p className="text-gray-400 text-sm">Backend Engineer</p>
              </div>

              <div className="bg-white/10 rounded-lg p-4 text-center shadow-md hover:bg-white/20 transition">
              
                <h3 className="text-lg font-semibold">Sithomola Musiki</h3>
                <p className="text-gray-400 text-sm">UI/UX Designer</p>
              </div>
            </div>
          </section>

          {/* Closing Message */}
          <section className="text-center">
            <p className="text-gray-300 italic">
              “At ShopMate, we believe that smart organization leads to smart living.”
            </p>
            <p className="mt-4 text-gray-400 text-sm">
              © {new Date().getFullYear()} NavBar. All rights reserved.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
