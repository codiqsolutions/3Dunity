import React from 'react';
import { Lightbulb, Box, Printer, Truck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  colors: {
    iconColor: string;
    bg: string;
    border: string;
    tagBg: string;
    tagText: string;
  };
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Share Your Idea',
    description: 'Send your design, reference images or requirements.',
    icon: <Lightbulb size={30} strokeWidth={2} />,
    colors: {
      iconColor: '#F59A16',
      bg: '#FFFBEB',
      border: '#FDE68A',
      tagBg: '#FEF3C7',
      tagText: '#B45309',
    },
  },
  {
    number: '02',
    title: 'We Create the Model',
    description: 'Our team prepares or optimizes the print-ready 3D model.',
    icon: <Box size={30} strokeWidth={2} />,
    colors: {
      iconColor: '#087FC3',
      bg: '#EBF5FF',
      border: '#BAE6FD',
      tagBg: '#E0F2FE',
      tagText: '#0369A1',
    },
  },
  {
    number: '03',
    title: '3D Printing',
    description: 'High-quality printing with the best material and precision.',
    icon: <Printer size={30} strokeWidth={2} />,
    colors: {
      iconColor: '#55B832',
      bg: '#F0FDF4',
      border: '#BBF7D0',
      tagBg: '#DCFCE7',
      tagText: '#15803D',
    },
  },
  {
    number: '04',
    title: 'Delivery to You',
    description: 'Your custom product, safely quality-checked & delivered.',
    icon: <Truck size={30} strokeWidth={2} />,
    colors: {
      iconColor: '#0284C7',
      bg: '#E0F2FE',
      border: '#BAE6FD',
      tagBg: '#E0F2FE',
      tagText: '#0284C7',
    },
  },
];

export const HowItWorksSection: React.FC = () => {
  const navigate = useNavigate();

  const handleRequestQuote = () => {
    navigate('/custom-quote');
  };

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        {/* Section Header */}
        <div className="how-it-works-header">
          <h2 className="how-it-works-title">
            How <span className="title-highlight">It Works</span>
          </h2>
          <p className="how-it-works-subtitle">
            From your idea to a real 3D product – simple and transparent.
          </p>
        </div>

        {/* 4-Step Timeline Row */}
        <div className="how-it-works-wrapper">
          <div className="how-it-works-steps-row">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                {/* Step Card */}
                <div className="how-it-works-step-card">
                  {/* Step Number Tag */}
                  <span
                    className="step-number-tag"
                    style={{
                      backgroundColor: step.colors.tagBg,
                      color: step.colors.tagText,
                    }}
                  >
                    Step {step.number}
                  </span>

                  {/* Illustrated Circular Icon with Colored Border & Background */}
                  <div
                    className="step-icon-bubble"
                    style={{
                      backgroundColor: step.colors.bg,
                      borderColor: step.colors.border,
                      color: step.colors.iconColor,
                    }}
                  >
                    {step.icon}
                  </div>

                  {/* Step Title & Subtitle */}
                  <h3 className="step-card-title">{step.title}</h3>
                  <p className="step-card-desc">{step.description}</p>
                </div>

                {/* Connecting Arrow between steps (not after the last step) */}
                {index < steps.length - 1 && (
                  <div className="step-connector-arrow" aria-hidden="true">
                    <div className="step-arrow-circle">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner linking to custom inquiry flow */}
        <div className="how-it-works-cta-banner">
          <span className="how-it-works-cta-text">
            Have a custom idea or 3D model ready to print?
          </span>
          <button
            onClick={handleRequestQuote}
            className="how-it-works-cta-btn"
            aria-label="Request Custom Model"
          >
            <span>Request Custom Model</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};
