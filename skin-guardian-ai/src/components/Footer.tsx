import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-16 mb-20 md:mb-0">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">DermaGuard AI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-assisted skin lesion screening prototype. Not a medical device.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm tracking-widest uppercase mb-4 text-foreground">Product</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/scan" className="hover:text-primary transition-colors">Scan</Link></li>
              <li><Link to="/explorer" className="hover:text-primary transition-colors">3D Explorer</Link></li>
              <li><Link to="/nearby" className="hover:text-primary transition-colors">Nearby Care</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm tracking-widest uppercase mb-4 text-foreground">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm tracking-widest uppercase mb-4 text-foreground">Contact</h4>
            <p className="text-sm text-muted-foreground">contact@dermaguard.ai</p>
            <p className="text-sm text-muted-foreground mt-1.5">Research Project</p>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} DermaGuard AI. This is a research prototype — not a certified medical device.
        </div>
      </div>
    </footer>
  );
}
