"use client";

import Link from "next/link";
import { ArrowRight, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };


  return (
    <section className="relative bg-background py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <motion.div
          className="flex flex-col gap-6 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex self-center lg:self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary-light text-primary"
          >
            {` 📚 Bangladesh's Student Book Hub`}
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-tight"
          >
            Share Books, <br />
            <span className="text-primary">Bridge the Gap</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            {`Connect with fellow students across Bangladesh. Sell your used academic books or donate them to someone in need. Let's make education accessible for everyone.
`}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2"
          >
            <Link
              href="/books"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-text-inverse bg-primary hover:bg-primary-hover px-6 py-3 rounded-btn transition-base shadow-md focus-visible:outline-2 focus-visible:outline-primary-focus"
            >
              <span>Browse Books</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/books/add"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-primary bg-surface border border-primary/20 hover:bg-surface-hover px-6 py-3 rounded-btn transition-base shadow-xs focus-visible:outline-2 focus-visible:outline-primary-focus"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Post a Book</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex justify-center items-center"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full max-w-[500px] aspect-square rounded-3xl bg-gradient-to-tr from-primary-light to-secondary-light border border-border p-8 flex items-center justify-center relative group"
          >
            <div className="absolute inset-4 rounded-2xl bg-white/40 backdrop-blur-xs border border-white/50 shadow-xs flex flex-col items-center justify-center p-6 text-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-primary text-text-inverse flex items-center justify-center font-bold text-2xl shadow-md">
                BB
              </div>
              <h3 className="font-bold text-xl text-text-primary">Academic Books Exchange</h3>
              <p className="text-sm text-text-muted max-w-xs">Connecting Buyers, Sellers, and Donors within the Student Community.</p>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-accent/40 blur-xl" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}