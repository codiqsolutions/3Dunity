import React from 'react';
import { Cpu, UploadCloud, Layers, Rocket, ShieldCheck } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';

const features = [
  {
    icon: <Cpu size={26} />,
    title: 'High-Precision Additive Fleet',
    description:
      'Calibrated industrial FDM, SLS, and 8K SLA systems capable of down to 0.05mm layer pitch and ±0.05mm dimensional repeatability.',
    accentColor: 'var(--color-primary)',
  },
  {
    icon: <UploadCloud size={26} />,
    title: 'Instant 3D CAD File Analysis',
    description:
      'Upload STL, OBJ, STEP, or 3MF files. Our engine calculates mass, infill mechanics, print orientation, and real-time pricing.',
    accentColor: 'var(--color-primary)',
  },
  {
    icon: <Layers size={26} />,
    title: 'Certified Engineering Polymers',
    description:
      'Choose from over 50 verified polymers: eco-friendly PLA, chemically resistant PETG, carbon-fiber reinforced nylon, and optical resins.',
    accentColor: 'var(--color-green)',
  },
  {
    icon: <Rocket size={26} />,
    title: 'Rapid Prototype to Batch Runs',
    description:
      'Whether you need a single proof-of-concept prototype in 24 hours or a production run of 500 units, we scale seamlessly.',
    accentColor: 'var(--color-orange)',
  },
];

export const ValuePropsSection: React.FC = () => {
  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        <SectionHeader
          badge="THE 3DUNITY ADVANTAGE"
          badgeVariant="blue"
          title="Engineering Precision Built Into Every Layer"
          subtitle="We combine aerospace-grade additive manufacturing machines with cutting-edge software to bring your 3D models into physical reality."
          align="center"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.75rem',
          }}
          className="value-props-grid"
        >
          {features.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'all var(--transition-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(8, 127, 195, 0.35)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.accentColor,
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {item.icon}
              </div>

              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-navy)', fontWeight: 700, lineHeight: 1.3 }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

