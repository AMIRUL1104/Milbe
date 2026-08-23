"use client";

import { Atom, Wrench, Stethoscope, Briefcase, Palette, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import Link from "next/link";

export default function Categories() {
  const categories = [
    { name: "Science", icon: Atom, count: "140+ Books" },
    { name: "Engineering", icon: Wrench, count: "90+ Books" },
    { name: "Medical", icon: Stethoscope, count: "75+ Books" },
    { name: "Business", icon: Briefcase, count: "110+ Books" },
    { name: "Arts", icon: Palette, count: "45+ Books" },
    { name: "Admission", icon: GraduationCap, count: "210+ Books" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Popular Categories"
          subtitle="Find exactly what you need by browsing through academic disciplines."
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={`/books?category=${cat.name.toLowerCase()}`}
                className="block focus-visible:outline-2 focus-visible:outline-primary rounded-card"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-border hover:border-primary p-6 rounded-card flex flex-col items-center text-center gap-3 transition-colors duration-300 hover:shadow-xs group h-full cursor-pointer bg-surface"
                >
                  <div className="w-12 h-12 rounded-xl bg-background group-hover:bg-primary-light text-text-muted group-hover:text-primary flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-bold text-sm text-text-primary group-hover:text-primary transition-colors duration-300">
                    {cat.name}
                  </h3>

                  <span className="text-xs text-text-muted group-hover:text-text-secondary transition-colors">
                    {cat.count}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}