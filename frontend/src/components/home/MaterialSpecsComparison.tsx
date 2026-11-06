import React, { useState } from 'react';
import { Layers, ShieldCheck, Thermometer, Flame, Gauge, Check } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';

interface MaterialSpec {
  id: string;
  name: string;
  category: string;
  technology: string;
  tensileStrengthMpa: number;
  heatDeflectionC: number;
  impactResistance: 'Moderate' | 'High' | 'Very High' | 'Extreme';
  surfaceSmoothness: 'Standard' | 'Smooth' | 'Ultra Glass-Like' | 'Matte Textured';
  bestFor: string[];
  description: string;
  colorSwatch: string;
}

const materialsData: MaterialSpec[] = [
  {
    id: 'pla-pro',
    name: 'PLA Tough Pro',
    category: 'Biopolymer',
    technology: 'FDM Precision',
    tensileStrengthMpa: 45,
    heatDeflectionC: 55,
    impactResistance: 'Moderate',
    surfaceSmoothness: 'Smooth',
    bestFor: ['Visual prototypes', 'Architectural scale maquettes', 'Consumer desktop accessories', 'Early fit-checks'],
    description: 'Renewable corn-starch based polymer fortified with impact modifiers. Exceptional dimensional accuracy and low warpage.',
    colorSwatch: '#087FC3',
  },
  {
    id: 'petg-pro',
    name: 'PETG Impact Grade',
    category: 'Engineering Copolyester',
    technology: 'FDM Functional',
    tensileStrengthMpa: 52,
    heatDeflectionC: 75,
    impactResistance: 'High',
    surfaceSmoothness: 'Smooth',
    bestFor: ['Water-tight enclosures', 'Mechanical clips & latches', 'Outdoor fixtures', 'Chemical-resistant containers'],
    description: 'Tough, shatter-resistant polymer with high interlayer adhesion. Resists water absorption, acids, and UV degradation.',
    colorSwatch: '#55B832',
  },
  {
    id: 'carbon-pa12',
    name: 'Carbon-Fiber PA12 Nylon',
    category: 'Advanced Composite',
    technology: 'FDM / SLS Industrial',
    tensileStrengthMpa: 82,
    heatDeflectionC: 145,
    impactResistance: 'Extreme',
    surfaceSmoothness: 'Matte Textured',
    bestFor: ['Drone & UAV frames', 'Automotive brackets', 'End-of-arm robotic tooling', 'High-stress structural parts'],
    description: 'Infused with 20% chopped high-modulus carbon fiber micro-strands. Offers aerospace stiffness-to-weight ratio.',
    colorSwatch: '#1E293B',
  },
  {
    id: 'sla-tough-resin',
    name: 'Engineering Tough Resin',
    category: 'Photopolymer',
    technology: '8K SLA Stereolithography',
    tensileStrengthMpa: 58,
    heatDeflectionC: 68,
    impactResistance: 'High',
    surfaceSmoothness: 'Ultra Glass-Like',
    bestFor: ['Collector 8K miniatures', 'Injection molding replicas', 'Medical device housings', 'Snapping flexures'],
    description: 'Cured layer-by-layer at 25-micron laser resolution. Zero layer lines visible to the naked eye with ABS-like flexibility.',
    colorSwatch: '#F59A16',
  },
  {
    id: 'polycarbonate',
    name: 'High-Temp Polycarbonate (PC)',
    category: 'Thermal Polymer',
    technology: 'High-Temp FDM',
    tensileStrengthMpa: 72,
    heatDeflectionC: 115,
    impactResistance: 'Very High',
    surfaceSmoothness: 'Smooth',
    bestFor: ['Under-the-hood automotive', 'High-voltage electrical switchgear', 'Heat lamp fixtures', 'Impact shields'],
    description: 'Exceptional optical clarity and extreme thermal resistance. Operates continuously in demanding thermal environments.',
    colorSwatch: '#64748B',
  },
];

export const MaterialSpecsComparison: React.FC = () => {
  const [activeMaterial, setActiveMaterial] = useState<MaterialSpec>(materialsData[0]);

  return (
    <section id="materials-matrix" className="section-py" style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        <SectionHeader
          badge="MATERIAL ENGINEERING"
          badgeVariant="blue"
          badgeIcon={<Gauge size={14} />}
          title="Additive Polymers & Resin Matrix"
          subtitle="Compare mechanical properties, heat deflection temperatures, and impact resilience to choose the ideal material for your design application."
          align="center"
        />

        {/* Material Selection Horizontal Selector */}
        <div
          style={{
            display: 'flex',
            gap: '0.65rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            marginBottom: '2rem',
            scrollbarWidth: 'none',
          }}
        >
          {materialsData.map((mat) => {
            const isSelected = activeMaterial.id === mat.id;
            return (
              <button
                key={mat.id}
                onClick={() => setActiveMaterial(mat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  backgroundColor: isSelected ? 'var(--color-primary-light)' : '#F8FAFC',
                  color: isSelected ? 'var(--color-navy)' : 'var(--color-text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: mat.colorSwatch,
                  }}
                />
                <span>{mat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Detail Matrix Card */}
        <div
          style={{
            backgroundColor: 'var(--color-bg)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '2.5rem',
          }}
          className="material-card-grid"
        >
          {/* Left Column: Specs and Description */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <Badge variant="blue" size="md">
                {activeMaterial.technology}
              </Badge>
              <Badge variant="neutral" size="md">
                {activeMaterial.category}
              </Badge>
            </div>

            <h3 style={{ fontSize: '1.65rem', color: 'var(--color-navy)', fontWeight: 800, marginBottom: '0.75rem' }}>
              {activeMaterial.name}
            </h3>

            <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
              {activeMaterial.description}
            </p>

            {/* Metrics Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Tensile Strength */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-navy)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ShieldCheck size={16} color="var(--color-primary)" />
                    Tensile Strength (MPa):
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>{activeMaterial.tensileStrengthMpa} MPa</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${(activeMaterial.tensileStrengthMpa / 100) * 100}%`,
                      height: '100%',
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>

              {/* Heat Deflection */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-navy)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Thermometer size={16} color="var(--color-orange)" />
                    Heat Deflection Temperature (°C):
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>{activeMaterial.heatDeflectionC}°C</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${(activeMaterial.heatDeflectionC / 160) * 100}%`,
                      height: '100%',
                      backgroundColor: 'var(--color-orange)',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>

              {/* Other Specs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                <div style={{ backgroundColor: 'var(--color-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>Impact Resistance:</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.95rem' }}>{activeMaterial.impactResistance}</span>
                </div>
                <div style={{ backgroundColor: 'var(--color-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>Surface Smoothness:</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.95rem' }}>{activeMaterial.surfaceSmoothness}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Applications & Checklist */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--color-navy)', fontWeight: 700, marginBottom: '1.25rem' }}>
                Recommended Engineering Applications
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {activeMaterial.bestFor.map((app, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--color-text)' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--color-green-light)',
                        color: 'var(--color-green)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Check size={13} />
                    </div>
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: '2rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)' }}>
                Need material consultation?
              </span>
              <button
                onClick={() => {
                  const el = document.getElementById('custom-configurator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  textDecoration: 'underline',
                }}
              >
                Configure in Project Studio →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

