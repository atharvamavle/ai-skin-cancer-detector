import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Scan", path: "/scan" },
  { label: "3D Explorer", path: "/explorer" },
  { label: "Nearby Care", path: "/nearby" },
  { label: "About", path: "/about" },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top bar with logo */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="container flex items-center justify-between h-16 pointer-events-auto">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            DermaGuard AI
          </Link>

          {/* Mobile toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {/* Floating bottom nav - desktop */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full bg-foreground/90 backdrop-blur-xl shadow-elevated border border-foreground/10"
      >
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-background/80 hover:text-background hover:bg-background/10"
              }`}
            >
              {item.label}
            </button>
          </Link>
        ))}
        <Link to="/scan">
          <button className="ml-1 px-5 py-2 rounded-full text-sm font-bold gradient-hero text-primary-foreground shadow-glow hover:opacity-90 transition-opacity">
            Start Scan
          </button>
        </Link>
      </motion.nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-16 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-b p-4 flex flex-col gap-2 md:hidden"
        >
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
              <Button
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                {item.label}
              </Button>
            </Link>
          ))}
          <Link to="/scan" onClick={() => setMobileOpen(false)}>
            <Button variant="hero" className="w-full rounded-full">Start Scan</Button>
          </Link>
        </motion.nav>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}
