import Navigation from "@/components/ui/Navigation";
import SearchHero from "@/components/ui/SearchHero";
import PropertyCard from "@/components/ui/PropertyCard";
import { mockProperties } from "@/lib/mock-data";

export default function Home() {
  const featuredProperties = mockProperties.filter(p => p.featured);
  const newProperties = mockProperties.filter(p => !p.featured);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SearchHero />

        {/* Featured Collections */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic">Featured Collections</h2>
              <p className="text-nordic/70 mt-1 text-sm">Curated properties for the discerning eye.</p>
            </div>
            <a className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity" href="#">
              View all <span className="material-icons text-sm">arrow_forward</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} featuredMode={true} />
            ))}
          </div>
        </section>

        {/* New in Market */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic">New in Market</h2>
              <p className="text-nordic/70 mt-1 text-sm">Fresh opportunities added this week.</p>
            </div>
            <div className="hidden md:flex bg-white p-1 rounded-lg shadow-sm border border-nordic/5">
              <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic text-white">All</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic/70 hover:text-nordic">Buy</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic/70 hover:text-nordic">Rent</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-white border border-nordic/10 hover:border-mosque hover:text-mosque text-nordic font-medium rounded-lg transition-all hover:shadow-md">
              Load more properties
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
