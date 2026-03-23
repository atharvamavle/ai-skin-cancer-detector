import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, ExternalLink, Search } from "lucide-react";
import { motion } from "framer-motion";

interface Clinic {
  name: string;
  address: string;
  phone: string;
  type: string;
}

const MOCK_CLINICS: Clinic[] = [
  { name: "City Dermatology Center", address: "123 Medical Ave, Suite 200", phone: "(555) 123-4567", type: "Dermatologist" },
  { name: "SkinHealth Clinic", address: "456 Healthcare Blvd", phone: "(555) 234-5678", type: "Skin Cancer Clinic" },
  { name: "Metro Hospital — Dermatology Dept", address: "789 Hospital Dr", phone: "(555) 345-6789", type: "Hospital" },
  { name: "Advanced Skin Care Associates", address: "321 Wellness Ln", phone: "(555) 456-7890", type: "Dermatologist" },
];

export default function NearbyCarePage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating blobs */}
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -25, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="gradient-blob gradient-blob-purple w-[400px] h-[400px] -top-20 right-[10%]"
      />
      <motion.div
        animate={{ x: [0, -10, 0], y: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="gradient-blob gradient-blob-green w-[250px] h-[250px] bottom-20 left-[5%]"
      />

      <div className="container relative z-10 py-12">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-sm font-semibold text-primary tracking-widest uppercase">Locate</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-3">Find Nearby Care</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Locate dermatologists and skin cancer clinics near you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex gap-3 max-w-lg mb-10"
        >
          <Input
            placeholder="Enter your city or zip code…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="rounded-full h-12 px-5 bg-card border-2"
          />
          <Button onClick={handleSearch} variant="default" className="rounded-full h-12 px-6">
            <Search className="h-4 w-4 mr-1" /> Search
          </Button>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-2xl border bg-card overflow-hidden mb-10 shadow-card"
          style={{ height: 350 }}
        >
          <iframe
            title="Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/search?key=&q=dermatologist+${encodeURIComponent(query || "New York")}`}
          />
          {!query && (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              <MapPin className="h-5 w-5 mr-2" />
              Enter a location above to see the map
            </div>
          )}
        </motion.div>

        {/* Results */}
        {searched && (
          <div className="grid md:grid-cols-2 gap-4">
            {MOCK_CLINICS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl border bg-card p-6 shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg">{c.name}</h3>
                    <span className="inline-block text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium mt-1">
                      {c.type}
                    </span>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {c.address}</p>
                  <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {c.phone}</p>
                </div>
                <Button variant="outline" size="sm" className="mt-4 rounded-full border-2" asChild>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(c.name + " " + c.address)}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5 mr-1" /> Open in Maps
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        )}

        {!searched && (
          <div className="text-center py-16 rounded-2xl bg-card border shadow-card">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Search for a location to see nearby dermatologists and skin cancer clinics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
