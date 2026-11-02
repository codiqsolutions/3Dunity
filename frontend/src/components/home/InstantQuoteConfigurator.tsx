import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  UploadCloud,
  FileCheck,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Clock,
  DollarSign,
  AlertCircle,
  HelpCircle,
  Sliders,
} from 'lucide-react';
import { customRequestApi } from '../../api/customRequestApi';
import { CustomQuoteEstimate } from '../../types/customRequest';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

const customFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid work or personal email'),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  projectTitle: z.string().min(3, 'Project title is required'),
  projectDescription: z.string().min(10, 'Please describe your requirements (at least 10 characters)'),
  toleranceRequirement: z.string().default('Standard (±0.2mm)'),
});

type CustomFormData = z.infer<typeof customFormSchema>;

const TECHNOLOGIES = [
  { id: 'FDM', name: 'FDM / FFF', desc: 'Ideal for functional parts, large enclosures & rigid engineering brackets.' },
  { id: 'SLA Resin', name: '8K SLA Resin', desc: 'Ultra-fine 25μm layer smoothness for miniatures, jewelry & visual prototypes.' },
  { id: 'SLS', name: 'SLS Nylon', desc: 'High mechanical strength, complex geometry with zero support marks.' },
  { id: 'Direct Metal (DMLS)', name: 'Metal DMLS', desc: 'Direct 3D metal sintering for aerospace & extreme stress components.' },
];

const MATERIALS = [
  { id: 'PLA Tough (Standard)', name: 'PLA Tough (Eco)', tech: 'FDM', rate: 'Standard' },
  { id: 'PETG Pro Chemical & Impact', name: 'PETG Pro Impact', tech: 'FDM', rate: 'High Strength' },
  { id: 'PA12 Carbon-Fiber Composite', name: 'Carbon Fiber PA12', tech: 'FDM/SLS', rate: 'Aerospace Grade' },
  { id: 'Engineering Tough Resin', name: 'Tough Resin 8K', tech: 'SLA Resin', rate: 'Ultra HD' },
  { id: 'High-Temp Polycarbonate', name: 'Polycarbonate (PC)', tech: 'FDM', rate: '110°C Heat' },
];

const FINISHES = [
  { id: 'Raw / As-Printed', name: 'Raw / As-Printed', desc: 'Clean layer lines preserved, ideal for functional tests.' },
  { id: 'Sanded Smooth', name: 'Sanded Smooth', desc: 'Hand-sanded to 400-grit for matte tactile feel.' },
  { id: 'Vapor Smoothed', name: 'Vapor Smoothed', desc: 'Chemical vapor gloss, airtight & watertight sealing.' },
  { id: 'Primer & Painted', name: 'Primer & Painted', desc: 'Automotive grade surface finish with custom color coat.' },
];

export const InstantQuoteConfigurator: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<'FDM' | 'SLA Resin' | 'SLS' | 'Direct Metal (DMLS)'>('FDM');
  const [selectedMaterial, setSelectedMaterial] = useState('PLA Tough (Standard)');
  const [infill, setInfill] = useState(25);
  const [selectedFinish, setSelectedFinish] = useState<'Raw / As-Printed' | 'Sanded Smooth' | 'Vapor Smoothed' | 'Primer & Painted'>('Raw / As-Printed');
  const [quantity, setQuantity] = useState(1);
  const [colorPref, setColorPref] = useState('Industrial Charcoal');

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live estimate state
  const [estimate, setEstimate] = useState<CustomQuoteEstimate | null>(null);
  const [calculatingEstimate, setCalculatingEstimate] = useState(false);

  // Submit state
  const [submitSuccessModal, setSubmitSuccessModal] = useState<any | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CustomFormData>({
    resolver: zodResolver(customFormSchema),
    defaultValues: {
      toleranceRequirement: 'Standard (±0.2mm)',
    },
  });

  // Calculate live estimate whenever parameters change
  useEffect(() => {
    let isCancelled = false;

    const fetchEstimate = async () => {
      try {
        setCalculatingEstimate(true);
        const res = await customRequestApi.getEstimate({
          technology: selectedTech,
          material: selectedMaterial,
          infillPercentage: infill,
          surfaceFinish: selectedFinish,
          quantity,
        });
        if (!isCancelled && res.data) {
          setEstimate(res.data);
        }
      } catch (err) {
        console.warn('Could not calculate estimate:', err);
      } finally {
        if (!isCancelled) setCalculatingEstimate(false);
      }
    };

    fetchEstimate();

    return () => {
      isCancelled = true;
    };
  }, [selectedTech, selectedMaterial, infill, selectedFinish, quantity]);

  // File drop / upload handling
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f.size > 50 * 1024 * 1024) {
        alert(`File ${f.name} exceeds 50MB maximum size limit.`);
        continue;
      }
      newFiles.push(f);
    }
    setUploadedFiles((prev) => [...prev, ...newFiles].slice(0, 5));
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: CustomFormData) => {
    setSubmitError(null);
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      if (data.phone) formData.append('phone', data.phone);
      if (data.companyName) formData.append('companyName', data.companyName);
      formData.append('projectTitle', data.projectTitle);
      formData.append('projectDescription', data.projectDescription);
      formData.append('technology', selectedTech);
      formData.append('material', selectedMaterial);
      formData.append('colorPreference', colorPref);
      formData.append('infillPercentage', String(infill));
      formData.append('surfaceFinish', selectedFinish);
      formData.append('quantity', String(quantity));
      formData.append('toleranceRequirement', data.toleranceRequirement);

      uploadedFiles.forEach((file) => {
        formData.append('files', file);
      });

      const res = await customRequestApi.submitRequest(formData);
      if (res.success && res.data) {
        setSubmitSuccessModal(res.data);
        reset();
        setUploadedFiles([]);
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit custom 3D printing project. Please try again.');
    }
  };

  return (
    <section id="custom-configurator" className="section-py configurator-section">
      <div className="container">
        <SectionHeader
          badge="CUSTOM 3D FABRICATION"
          badgeVariant="orange"
          title="Instant 3D Printing Quote & Project Studio"
          subtitle="Upload your 3D CAD files (.STL, .OBJ, .STEP) or submit technical sketches. Configure material polymers, infill density, and surface treatment with real-time manufacturing estimates."
          align="center"
        />

        <div className="configurator-container">
          <div className="configurator-grid">
            {/* Left Column: Interactive Form & Upload */}
            <div className="configurator-form-panel">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* 1. Technology Selector */}
                <div className="form-group">
                  <label className="form-label">
                    1. Select 3D Printing Technology
                  </label>
                  <div className="option-grid">
                    {TECHNOLOGIES.map((tech) => (
                      <div
                        key={tech.id}
                        className={`option-card ${selectedTech === tech.id ? 'selected' : ''}`}
                        onClick={() => setSelectedTech(tech.id as any)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="option-title">{tech.name}</span>
                          {selectedTech === tech.id && <CheckCircle2 size={16} color="var(--color-primary)" />}
                        </div>
                        <span className="option-desc">{tech.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Material Selector */}
                <div className="form-group">
                  <label className="form-label">
                    2. Select Polymer or Resin Material
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {MATERIALS.map((mat) => (
                      <button
                        type="button"
                        key={mat.id}
                        onClick={() => setSelectedMaterial(mat.id)}
                        style={{
                          padding: '0.45rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          border: `1.5px solid ${selectedMaterial === mat.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                          backgroundColor: selectedMaterial === mat.id ? 'var(--color-primary-light)' : '#FFFFFF',
                          color: selectedMaterial === mat.id ? 'var(--color-primary)' : 'var(--color-text)',
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        {mat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Infill Density Slider */}
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>
                      3. Internal Infill Density: <strong>{infill}%</strong>
                    </label>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                      {infill <= 20 ? 'Lightweight Draft' : infill <= 45 ? 'Optimal Structural' : infill <= 75 ? 'Heavy Mechanical' : 'Solid Monolithic'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={infill}
                    onChange={(e) => setInfill(Number(e.target.value))}
                    className="slider-track"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    <span>10% (Visual/Draft)</span>
                    <span>40% (Standard)</span>
                    <span>100% (Solid Solid)</span>
                  </div>
                </div>

                {/* 4. Surface Post-Processing Finish */}
                <div className="form-group">
                  <label className="form-label">
                    4. Surface Finish & Post-Processing
                  </label>
                  <div className="option-grid">
                    {FINISHES.map((finish) => (
                      <div
                        key={finish.id}
                        className={`option-card ${selectedFinish === finish.id ? 'selected' : ''}`}
                        onClick={() => setSelectedFinish(finish.id as any)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="option-title">{finish.name}</span>
                          {selectedFinish === finish.id && <CheckCircle2 size={16} color="var(--color-primary)" />}
                        </div>
                        <span className="option-desc">{finish.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Drag & Drop File Upload */}
                <div className="form-group">
                  <label className="form-label">
                    5. Upload 3D Files or Technical Drawings (Up to 5 files, 50MB max each)
                  </label>
                  <div
                    className={`upload-dropzone ${isDragOver ? 'drag-active' : ''}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      handleFiles(e.dataTransfer.files);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".stl,.obj,.step,.stp,.3mf,.ply,.png,.jpg,.jpeg,.webp,.pdf"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                    <UploadCloud size={36} color="var(--color-primary)" style={{ margin: '0 auto 0.5rem' }} />
                    <div style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.95rem' }}>
                      Drag & Drop your 3D CAD files here or <span style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>browse</span>
                    </div>
                    <div style={{ fontSize: '0.785rem', color: 'var(--color-text-secondary)', marginTop: '0.35rem' }}>
                      Supports: .STL, .OBJ, .STEP, .3MF, .PDF drawings, or reference photos
                    </div>
                  </div>

                  {/* Uploaded Files Chips */}
                  {uploadedFiles.length > 0 && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {uploadedFiles.map((f, i) => (
                        <div key={i} className="upload-file-chip">
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600, color: 'var(--color-navy)' }}>
                            <FileCheck size={16} color="var(--color-green)" />
                            {f.name} <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>({(f.size / (1024 * 1024)).toFixed(2)} MB)</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(i);
                            }}
                            style={{ color: '#94A3B8' }}
                            title="Remove file"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 6. Customer & Project Details */}
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', marginBottom: '1rem' }}>
                    6. Project & Contact Information
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Marcus Vance"
                        {...register('fullName')}
                        className="form-input"
                      />
                      {errors.fullName && (
                        <span style={{ color: '#EF4444', fontSize: '0.775rem' }}>{errors.fullName.message}</span>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Work / Personal Email *</label>
                      <input
                        type="email"
                        placeholder="marcus@company.com"
                        {...register('email')}
                        className="form-input"
                      />
                      {errors.email && (
                        <span style={{ color: '#EF4444', fontSize: '0.775rem' }}>{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label className="form-label">Project Title *</label>
                      <input
                        type="text"
                        placeholder="Custom Robotic Housing v2"
                        {...register('projectTitle')}
                        className="form-input"
                      />
                      {errors.projectTitle && (
                        <span style={{ color: '#EF4444', fontSize: '0.775rem' }}>{errors.projectTitle.message}</span>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Color Preference</label>
                      <input
                        type="text"
                        placeholder="Matte Black, Industrial Gray, etc."
                        value={colorPref}
                        onChange={(e) => setColorPref(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Requirements & Technical Notes *</label>
                    <textarea
                      rows={3}
                      placeholder="Specify critical dimensions, load requirements, threaded inserts needed, or assembly guidelines..."
                      {...register('projectDescription')}
                      className="form-textarea"
                    />
                    {errors.projectDescription && (
                      <span style={{ color: '#EF4444', fontSize: '0.775rem' }}>{errors.projectDescription.message}</span>
                    )}
                  </div>
                </div>

                {submitError && (
                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      backgroundColor: '#FEF2F2',
                      border: '1px solid #FCA5A5',
                      borderRadius: 'var(--radius-md)',
                      color: '#B91C1C',
                      fontSize: '0.85rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {submitError}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                  leftIcon={<Sparkles size={18} />}
                >
                  Submit Project for Formal Verification & Print
                </Button>
              </form>
            </div>

            {/* Right Column: Live Instant Quote Summary */}
            <div className="configurator-summary-panel">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-navy)', margin: 0 }}>
                    Manufacturing Quote
                  </h3>
                  <Badge variant="green" size="sm">
                    Live Calculation
                  </Badge>
                </div>

                {/* Quantity Stepper */}
                <div
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                    Production Quantity:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: '#F8FAFC' }}>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        style={{ padding: '0.5rem 0.85rem', fontWeight: 700 }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: 700, fontSize: '1rem' }}>
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        style={{ padding: '0.5rem 0.85rem', fontWeight: 700 }}
                      >
                        +
                      </button>
                    </div>

                    {estimate?.breakdown?.volumeDiscountPct ? (
                      <Badge variant="orange" size="sm">
                        {estimate.breakdown.volumeDiscountPct}% Bulk Discount Applied
                      </Badge>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        Bulk discounts at 5+, 10+, 20+ units
                      </span>
                    )}
                  </div>
                </div>

                {/* Selected Specifications Breakdown */}
                <div
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    fontSize: '0.85rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Technology</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{selectedTech}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Material Polymer</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{selectedMaterial.split(' ')[0]}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Infill Core</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{infill}% Gyroid</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Surface Finish</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{selectedFinish}</span>
                  </div>
                </div>

                {/* Pricing Breakdown Card */}
                {estimate && (
                  <div
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                      <span>Unit Fabrication Rate:</span>
                      <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>${estimate.unitPrice.toFixed(2)} / unit</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                      <span>Estimated Production Time:</span>
                      <span style={{ fontWeight: 600, color: 'var(--color-navy)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={14} color="var(--color-primary)" />
                        {estimate.estimatedDays} Business Days
                      </span>
                    </div>

                    <div
                      style={{
                        borderTop: '1px dashed var(--color-border)',
                        paddingTop: '0.85rem',
                        marginTop: '0.4rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Estimated Total:</span>
                        <span style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-display)' }}>
                          ${estimate.estimatedPrice.toFixed(2)}
                        </span>
                      </div>
                      <Badge variant="blue" size="sm">
                        CAD Verified
                      </Badge>
                    </div>
                  </div>
                )}
              </div>

              {/* Trust Callout */}
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  <ShieldCheck size={16} color="var(--color-green)" />
                  <span>Free manual DFM (Design for Manufacturing) review by engineer</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  <CheckCircle2 size={16} color="var(--color-green)" />
                  <span>Non-Disclosure & IP Protection guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submission Success Confirmation Modal */}
        <Modal
          isOpen={!!submitSuccessModal}
          onClose={() => setSubmitSuccessModal(null)}
          title="Project Submitted Successfully!"
          subtitle={`Reference ID: #3DU-${submitSuccessModal?._id?.substring(0, 8) || 'PRINT'}`}
        >
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-green-light)',
                color: 'var(--color-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
              Your Custom 3D Printing Project Has Been Logged!
            </h3>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 1.5rem' }}>
              We have received your CAD specifications for <strong>{submitSuccessModal?.projectTitle}</strong>. Our additive fabrication engineers will run automated geometry checks and reach out to <strong>{submitSuccessModal?.email}</strong> within 4 hours.
            </p>

            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                padding: '1rem',
                textAlign: 'left',
                marginBottom: '1.5rem',
                fontSize: '0.85rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Technology:</span>
                <span style={{ fontWeight: 600 }}>{submitSuccessModal?.technology}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Quantity:</span>
                <span style={{ fontWeight: 600 }}>{submitSuccessModal?.quantity} unit(s)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Estimated Turnaround:</span>
                <span style={{ fontWeight: 600 }}>{submitSuccessModal?.estimatedTurnaroundDays} Business Days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Estimated Total:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>${submitSuccessModal?.estimatedPrice?.toFixed(2)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => setSubmitSuccessModal(null)}
            >
              Done & Return to Homepage
            </Button>
          </div>
        </Modal>
      </div>
    </section>
  );
};
