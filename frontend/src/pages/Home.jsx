import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-green-100 py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-4">
          Smart Household Waste Segregation & Pickup System
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          A civic platform to help households segregate degradable and
          non-degradable waste and request corporation pickup to avoid
          public nuisance and maintain clean surroundings.
        </p>
      </section>

      {/* AWARENESS SECTION */}
      <section className="py-16 px-6 bg-white">
        <h3 className="text-3xl font-semibold text-center mb-10 text-gray-800">
          Why Waste Segregation Matters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="border-l-4 border-green-600 p-6 shadow rounded">
            <h4 className="text-xl font-bold text-green-700 mb-2">
              🟢 Degradable Waste
            </h4>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Food waste</li>
              <li>Vegetable peels</li>
              <li>Leaves and organic waste</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              Should be kept separately for easy collection and processing.
            </p>
          </div>

          <div className="border-l-4 border-red-600 p-6 shadow rounded">
            <h4 className="text-xl font-bold text-red-600 mb-2">
              🔴 Non-Degradable Waste
            </h4>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Plastic items</li>
              <li>Metal waste</li>
              <li>Glass and e-waste</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              Mixing causes hygiene issues and delays corporation pickup.
            </p>
          </div>
        </div>
      </section>

      {/* COMMUNITY MESSAGE */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Supporting Corporation Workers & Community Cleanliness
        </h3>

        <div className="max-w-4xl mx-auto space-y-4 text-gray-700">
          <p>
            “Segregated household waste helps corporation workers collect
            faster and efficiently.”
          </p>
          <p>
            “Proper waste handling reduces street nuisance and health risks.”
          </p>
          <p>
            “Your responsibility keeps the community clean and safe.”
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-700 text-white text-center py-4">
        © Smart Waste Segregation System | Corporation Service Platform
      </footer>
    </>
  );
}

export default Home;
