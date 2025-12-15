import { Github, Linkedin, Globe2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { hitVisitor, getVisitor } from "./../lib/counterApi";
import logoDark from "./../assets/logo_dark.png";
import logoLight from "./../assets/logo_light.png";

export default function Footer() {
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchVisitors() {
      const visitedKey = "helloworld_site_visited";
      try {
        console.log("[fetchVisitors] started");

        const already = localStorage.getItem(visitedKey);

        console.log("[fetchVisitors] localStorage check", {
          key: visitedKey,
          exists: Boolean(already),
          value: already,
        });

        if (!already) {
          console.log("[fetchVisitors] first visit → incrementing counter");

          const res = await hitVisitor();

          console.log("[fetchVisitors] hitVisitor response", res);

          if (mounted) {
            setVisitors(res);
          }

          localStorage.setItem(visitedKey, String(Date.now()));

          console.log("[fetchVisitors] localStorage updated", {
            key: visitedKey,
            timestamp: Date.now(),
          });
        } else {
          console.log("[fetchVisitors] repeat visit → fetching counter");

          const res = await getVisitor();

          console.log("[fetchVisitors] getVisitor response", res);

          if (mounted) {
            setVisitors(res);
          }
        }
      } catch (error) {
        console.error("[fetchVisitors] error", error);
      }
    }

    fetchVisitors();

    return () => {
      mounted = false;
      console.log("[fetchVisitors] cleanup → component unmounted");
    };
  }, []);

  return (
    <footer className="bg-card border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 md:justify-items-center gap-2 md:gap-12 mb-2">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src={logoLight}
                  alt="HelloWorld Logo"
                  className="block dark:hidden w-full h-full object-contain"
                />
                <img
                  src={logoDark}
                  alt="HelloWorld Logo"
                  className="hidden dark:block w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-lg">HelloWorld!</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Exploring ideas, sharing knowledge, building better software.
            </p>

            {/* Contact Icons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-background rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-background rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-background rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Portfolio"
              >
                <Globe2 size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-background rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Visitors:{" "}
              <span className="font-semibold">
                {visitors !== null
                  ? new Intl.NumberFormat().format(visitors)
                  : "No visitors"}
              </span>
            </p>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/blogs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Latest Blogs
                </Link>
              </li>
              <li>
                <a
                  href="https://personal-portfolio1-zeta.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Software Development</li>
              <li className="text-muted-foreground">
                Automation and Analytics
              </li>
              <li className="text-muted-foreground">
                UI/UX & Graphic Designing
              </li>
              <li className="text-muted-foreground">
                Search Engine Optimization
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 algoarena.tech. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <p className="text-sm text-muted-foreground">
                Built with ❤️ and {"</>"} by{" "}
                <span className="font-semibold">Shivam Ray</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
