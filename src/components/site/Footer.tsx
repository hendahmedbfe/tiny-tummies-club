import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import logo from "@/assets/reham-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={logo.url}
            alt="Reham Emam Kids Clinic"
            loading="lazy"
            width={120}
            height={120}
            className="h-16 w-16 object-contain"
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Baby Food Essentials is the parent-facing kitchen of Reham Emam Kids Clinic — evidence-based
            infant nutrition, texture progression and speech-friendly feeding.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold">Quick links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/recipes" className="hover:text-primary">Recipes Hub</Link></li>
            <li><Link to="/journal" className="hover:text-primary">The Feeding Journal</Link></li>
            <li><Link to="/ebooks" className="hover:text-primary">E-Books & Guides</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Dr. Reham</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold">Medical disclaimer</h4>
          <p className="mt-4 rounded-2xl bg-sage-soft p-4 text-sm text-foreground">
            Content is educational and does not replace personalized clinical advice. Always discuss your
            child's feeding plan with their own paediatrician.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold">Follow along</h4>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <Instagram className="h-4 w-4" /> @rehamemamkidsclinic
            </a>
            <p>hello@babyfoodessentials.com</p>
          </div>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Reham Emam Kids Clinic. All rights reserved.
      </div>
    </footer>
  );
}
