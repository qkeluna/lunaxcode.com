"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer 
      id="contact" 
      className="bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]"
    >
      {/* Main Footer Content */}
      <div 
        className="container mx-auto px-[var(--container-padding)] lg:px-12 max-w-[1200px]"
        style={{ paddingTop: 'var(--section-padding-md)', paddingBottom: 'var(--section-padding-sm)' }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="text-2xl font-bold text-[var(--text-primary)]">
                Lunaxcode
              </div>
            </div>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed max-w-md">
              Code at the Speed of Light. Professional websites and mobile apps for Filipino SMEs.
              We combine cutting-edge AI technology with human expertise to deliver exceptional
              digital solutions that drive business growth.
            </p>
            <div className="flex space-x-3">
              {[
                { Icon: Mail, href: "mailto:hello@lunaxcode.com", label: "Email" },
                { Icon: Phone, href: "tel:+639123456789", label: "Phone" },
                { Icon: MapPin, href: "#", label: "Location" },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="w-9 h-9 bg-[var(--surface-elevated)] rounded-lg flex items-center justify-center hover:bg-[var(--accent-primary)] hover:text-white transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-h5 font-semibold text-[var(--text-primary)] mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                { name: "Landing Pages", id: "features" },
                { name: "Website Development", id: "features" },
                { name: "Mobile Apps", id: "features" },
                { name: "AI Integration", id: "features" },
                { name: "SEO Optimization", id: "features" },
                { name: "Maintenance", id: "features" },
              ].map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => scrollToSection(service.id)}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-left text-body-sm"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-h5 font-semibold text-[var(--text-primary)] mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[var(--accent-secondary)] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-[var(--text-secondary)] text-caption">Email</div>
                  <a
                    href="mailto:hello@lunaxcode.com"
                    className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors duration-200 text-body-sm"
                  >
                    hello@lunaxcode.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[var(--accent-success)] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-[var(--text-secondary)] text-caption">Phone</div>
                  <a
                    href="tel:+639123456789"
                    className="text-[var(--text-primary)] hover:text-[var(--accent-success)] transition-colors duration-200 text-body-sm"
                  >
                    +63 912 345 6789
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[var(--accent-warning)] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-[var(--text-secondary)] text-caption">Location</div>
                  <div className="text-[var(--text-primary)] text-body-sm">Metro Manila, Philippines</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border-subtle)] py-8">
        <div className="container mx-auto px-[var(--container-padding)] lg:px-12 max-w-[1200px]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[var(--text-tertiary)] text-caption mb-4 md:mb-0">
              © {new Date().getFullYear()} Lunaxcode. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-caption">
              <button
                onClick={() => scrollToSection("features")}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                Terms of Service
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}