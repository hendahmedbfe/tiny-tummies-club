import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import logo from "@/assets/reham-emam-logo-transparent.png.asset.json";
import googlePlayBadge from "@/assets/google-play-badge.png.asset.json";

const appUrl = "https://play.google.com/store/apps/details?id=com.babyfoodessentials.app";

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center justify-center">
          <img
            src={logo.url}
            alt="Reham Emam Kids Clinic"
            loading="lazy"
            width={120}
            height={120}
            className="h-16 w-16 object-contain"
          />
        </div>


        <div>
          <h4 className="text-sm font-bold">Quick links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/blogs" className="hover:text-primary">Blogs</Link></li>
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
              href="https://www.instagram.com/babyfoodessentials/?__pwa=1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <Instagram className="h-4 w-4" /> @babyfoodessentials
            </a>
            <a href="mailto:babyfoodessentials@gmail.com" className="block hover:text-primary">
              babyfoodessentials@gmail.com
            </a>
            <a
              href={appUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Get Baby Food Essentials on Google Play"
              className="mt-4 inline-block"
            >
              <img
                src={googlePlayBadge.url}
                alt="Get it on Google Play"
                loading="lazy"
                width={646}
                height={192}
                className="h-auto w-40"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Reham Emam Kids Clinic. All rights reserved.
      </div>
    </footer>
  );
}
