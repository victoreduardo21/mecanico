import React, { useState } from 'react';
import { FAQS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {FAQS.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className="border border-slate-800 rounded-xl overflow-hidden bg-[#141417]/85 hover:bg-[#141417] transition-colors"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer text-white focus:outline-none select-none"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="font-display font-medium text-sm md:text-base leading-tight">
                  {faq.question}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="border-t border-slate-800/80 p-4 bg-neutral-950/40 text-xs md:text-sm text-slate-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
