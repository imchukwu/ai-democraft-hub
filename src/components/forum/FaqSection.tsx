import { useState } from "react";
import { Reveal, SectionHeader } from "./primitives";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "What are the registration fees for attending the Forum?",
    answer:
      "Registration is complimentary for accredited government officials, election management body delegates, civil society representatives, researchers, and media partners thanks to our strategic partners. Priority pass allocation applies to early applicants.",
  },
  {
    question: "How do international delegates receive visa support letters?",
    answer:
      "Upon completing registration, delegates receive an automated official Invitation Letter for Visa Application. For countries eligible for Visa-on-Arrival (VoA), our protocol team processes pre-approvals with the Nigeria Immigration Service.",
  },
  {
    question: "Can I participate virtually if I cannot travel to Abuja?",
    answer:
      "Yes. All plenary keynotes, thematic panel discussions, and policy lab reports will be livestreamed on the Forum platform with real-time Q&A and interactive polling enabled for registered virtual attendees.",
  },
  {
    question: "How can startups or civic tech labs apply for The Sandbox showcase?",
    answer:
      "Sandbox applications remain open until 10 September 2026. Teams building open-source AI auditing tools, election verification pipelines, or local language civic bots can submit their project via the Sandbox page.",
  },
  {
    question: "Are travel bursaries or grants available for youth and civil society?",
    answer:
      "Yes. A limited number of travel and accommodation bursaries are available for grassroots civil society leaders, young researchers, and independent journalists from low-income countries.",
  },
  {
    question: "Will session recordings and policy papers be accessible post-forum?",
    answer:
      "Yes. The website serves as a persistent open-access knowledge archive after the event. High-definition video recordings, transcripts, policy briefs, and the official Abuja Communiqué will be published in the Resources section.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="border-b border-slate-800 bg-parallax-dark py-20 text-slate-100 md:py-28">
      <div className="container-forum max-w-4xl">
        <SectionHeader
          eyebrow="Help & Support"
          title="Frequently Asked Questions"
          align="center"
          tone="dark"
          lede="Find answers to common questions about attending the Forum, visa pre-approval, virtual access, Sandbox applications, and post-event archives."
        />

        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={idx} delay={idx * 50}>
                <div className="rounded-xl border border-border bg-card overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-primary transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {isOpen ? (
                    <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                      {faq.answer}
                    </div>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
