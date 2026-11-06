import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What 3D file formats does 3Dunity accept for custom fabrication?',
    answer:
      'We accept industry standard CAD and mesh formats including .STL, .OBJ, .STEP (AP203/AP214), .STP, .3MF, and .PLY. You can also upload 2D PDF technical drawings or reference sketches with dimensional callouts if you require our engineering team to model the CAD part for you.',
  },
  {
    question: 'What dimensional tolerances can I expect on finished prints?',
    answer:
      'Our industrial SLA stereolithography resin fleet achieves tolerances as tight as ±0.05mm. Calibrated engineering FDM machines achieve ±0.1mm to ±0.2mm depending on build geometry and polymer thermal shrinkage rates. If your project has critical mating faces or press-fit tolerances, note them in your project submission.',
  },
  {
    question: 'Can you install threaded brass inserts, magnets, or hardware?',
    answer:
      'Yes! We provide full secondary hardware integration including heat-set brass threaded inserts (M2 up to M8), press-fit neodymium magnets, stainless steel dowel pins, and O-ring sealing grooves. Simply mention your hardware needs in the custom project notes.',
  },
  {
    question: 'How fast will my order ship?',
    answer:
      'Ready-made catalog models are kept in calibrated stock or printed on-demand within 24 hours. Custom single-part prototypes typically dispatch within 48 hours. Batch manufacturing runs of 20 to 200 units take approximately 3 to 5 business days.',
  },
  {
    question: 'Do you offer bulk volume discounts for small-batch production?',
    answer:
      'Yes! Our automated pricing engine automatically calculates tiered volume discounts: 7% off at 5 units, 12% off at 10 units, 18% off at 20 units, and 25% off for 50+ units. For commercial orders over 200 units, contact our enterprise fabrication team.',
  },
  {
    question: 'What is 3Dunity’s Fit & Quality Guarantee?',
    answer:
      'If your custom part deviates from the approved CAD model or fails to meet the agreed dimensional tolerances, we will reprint and dispatch replacement parts at zero cost to you, or issue a 100% prompt refund.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq-section" className="section-py" style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        <SectionHeader
          badge="FREQUENTLY ASKED QUESTIONS"
          badgeVariant="blue"
          badgeIcon={<HelpCircle size={14} />}
          title="Everything You Need to Know"
          subtitle="Answers to common questions regarding supported CAD formats, machine tolerances, materials, and batch delivery."
          align="center"
        />

        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: 'var(--radius-lg)',
                  border: `1.5px solid ${isOpen ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  overflow: 'hidden',
                  transition: 'border-color var(--transition-fast)',
                }}
              >
                <button
                  onClick={() => toggle(index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    gap: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: isOpen ? 'var(--color-primary)' : 'var(--color-navy)',
                    }}
                  >
                    {faq.question}
                  </span>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-normal)',
                      color: isOpen ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.5rem 1.35rem 1.5rem',
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.925rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid rgba(226, 232, 240, 0.7)',
                      paddingTop: '1rem',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

