"use client";

import { Accordion } from "@heroui/react";
import {
  ChevronDown,
  HelpCircle,
  Truck,
  BookMarked,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import SectionHeading from "../shared/SectionHeading";

export default function FAQ() {
  const items = [
    {
      content:
        "Yes, posting books for sale or donation is entirely free. If a book is listed for sale, the buyer pays the price set by the seller directly during exchange.",
      icon: <HelpCircle className="w-4 h-4" />,
      title: "Is BookBridge completely free to use?",
    },
    {
      content:
        "Once the seller accepts your book request, contact details will be unlocked. You can then message or call each other to arrange an in-person meeting or shipping.",
      icon: <Truck className="w-4 h-4" />,
      title: "How do I collect a book after requesting it?",
    },
    {
      content:
        "No, BookBridge is strictly tailored for academic books (e.g., School, HSC, Admission, Engineering, Medical, Honours text-books) to help students specifically.",
      icon: <BookMarked className="w-4 h-4" />,
      title: "Can I post non-academic books here?",
    },
    {
      content:
        "Admins monitor posts to ensure content guideline compliance, preventing non-academic or spam listings from cluttering the marketplace platform.",
      icon: <ShieldCheck className="w-4 h-4" />,
      title: "What does the Admin moderation do?",
    },
    {
      content:
        "Absolutely! There are no split accounts. Any registered student can upload books to sell/donate (Seller) or request listings from others (Buyer).",
      icon: <UserCheck className="w-4 h-4" />,
      title: "Can a user act as both a buyer and a seller?",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Got questions? We have answers to the most common queries."
        />

        <Accordion className="w-full flex flex-col gap-3">
          {items.map((item, index) => (
            <Accordion.Item
              key={index}
              className="bg-surface border border-border rounded-card overflow-hidden px-4 py-2"
            >
              <Accordion.Heading>
                <Accordion.Trigger
                  className="w-full flex items-center justify-between text-left font-semibold text-text-primary py-3 transition-colors hover:text-primary group"
                >
                  <div className="flex items-center">
                    {item.icon ? (
                      <span className="mr-3 shrink-0 text-text-muted group-hover:text-primary transition-colors">
                        {item.icon}
                      </span>
                    ) : null}
                    <span>{item.title}</span>
                  </div>

                  <Accordion.Indicator className="text-text-muted group-hover:text-primary transition-transform duration-200">
                    <ChevronDown className="w-4 h-4" />
                  </Accordion.Indicator>
                </Accordion.Trigger>
              </Accordion.Heading>

              <Accordion.Panel>
                <Accordion.Body className="text-sm font-normal text-text-secondary leading-relaxed pt-1 pb-4">
                  {item.content}
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
}