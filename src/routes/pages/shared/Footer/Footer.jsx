// File: Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-red-700 text-white py-10 px-6 md:px-20 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About Us */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <p className="text-base leading-relaxed">
            Al Mandhar Pest Control, established in 2002, is a trusted and reliable pest
            control company serving the areas of Sharjah and Dubai. With our commitment
            to excellence and customer satisfaction, we have built a strong reputation in
            the industry.
          </p>
          <div className="flex items-center gap-2 mt-6 text-lg">
            <p className="text-xl">📄</p>
            <p className="tracking-wide">Company Profile</p>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Usefull Links</h2>
          <ul className="space-y-2 text-base">
            <li>Home</li>
            <li>Pest Control Dubai</li>
            <li>Blog</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Top Services */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Services</h2>
          <ul className="space-y-2 text-base">
            <li>Cockroach Control</li>
            <li>Termites Control</li>
            <li>Bed Bugs Control</li>
            <li>Rodent Control</li>
            <li>Mosquitoes Control</li>
            <li>Ants Control</li>
            <li>Spider Control</li>
            <li>Bird Control</li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <ul className="space-y-3 text-base">
            <li className="flex items-start gap-3">
              <div className="text-xl mt-1">📍</div>
              <p>office 101 al zarouni building frej al murar deira dubai uae</p>
            </li>
            <li className="flex items-center gap-3">
              <div className="text-xl">✉️</div>
              <p>info@mpcpest.ae</p>
            </li>
            <li className="flex items-center gap-3">
              <div className="text-xl">📞</div>
              <p>0563339199</p>
            </li>
            <li className="flex items-center gap-3">
              <div className="text-xl">💬</div>
              <p>0563339199</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/30 mt-10 pt-6 text-center text-base">
        <p>
          Copyright © 2024{" "}
          <span className="font-semibold">Al Mandhar Pest Control</span> All rights reserved.
        </p>
        <p className="mt-2">
          Development &amp; SEO By{" "}
          <span className="font-semibold">NextGent.Org</span>
        </p>
      </div>
    </footer>
  );
}
