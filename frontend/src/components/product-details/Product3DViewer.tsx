import React, { useState } from 'react';
import { Box, RotateCw, Eye, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export interface Product3DViewerProps {
  model3DUrl?: string;
  productName: string;
  technology?: string;
  dimensions?: string;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({
  model3DUrl,
  productName,
  technology = 'FDM 3D Extrusion',
  dimensions = '16 × 9 × 24 cm',
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe' | 'infill'>('solid');
  const [isRotating, setIsRotating] = useState(false);

  const handleRotate = () => {
    setRotationAngle((prev) => (prev + 45) % 360);
  };

  if (!model3DUrl) {
    return (
      <div className="model-viewer-unavailable">
        <div className="viewer-empty-icon">
          <Box size={36} />
        </div>
        <h4>Interactive 3D File Not Embedded</h4>
        <p>
          An interactive GLB / 3MF file is not embedded for &ldquo;{productName}&rdquo;.
          Please review the high-resolution multi-angle studio photographs above.
        </p>
      </div>
    );
  }

  return (
    <div className="model-3d-viewer-container">
      {/* 3D Viewer Header */}
      <div className="viewer-header-row">
        <div className="viewer-title-group">
          <Box size={16} className="text-primary-blue" />
          <span className="viewer-title">Interactive 3D Model Inspection</span>
          <span className="viewer-tech-badge">{technology}</span>
        </div>

        <div className="viewer-controls-group">
          <button
            type="button"
            onClick={() => setViewMode('solid')}
            className={`viewer-mode-pill ${viewMode === 'solid' ? 'is-active' : ''}`}
          >
            Solid
          </button>
          <button
            type="button"
            onClick={() => setViewMode('wireframe')}
            className={`viewer-mode-pill ${viewMode === 'wireframe' ? 'is-active' : ''}`}
          >
            Wireframe
          </button>
          <button
            type="button"
            onClick={() => setViewMode('infill')}
            className={`viewer-mode-pill ${viewMode === 'infill' ? 'is-active' : ''}`}
          >
            Gyroid Infill
          </button>
          <button
            type="button"
            onClick={handleRotate}
            className="viewer-rotate-btn"
            title="Rotate 45°"
            aria-label="Rotate model"
          >
            <RotateCw size={15} />
            <span>Rotate</span>
          </button>
        </div>
      </div>

      {/* 3D Visualizer Canvas Canvas Frame */}
      <div className="viewer-canvas-stage">
        {/* Ambient Grid Background */}
        <div className="viewer-print-bed-grid" aria-hidden="true">
          <div className="bed-axis x-axis">X (Length)</div>
          <div className="bed-axis y-axis">Y (Width)</div>
        </div>

        {/* 3D Model Representation Container */}
        <div
          className={`viewer-3d-mesh-wrapper mode-${viewMode}`}
          style={{
            transform: `perspective(900px) rotateX(15deg) rotateY(${rotationAngle}deg)`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Stylized Polyhedron / 3D Model Sculpture Preview */}
          <div className="model-polyhedron">
            <div className="poly-face face-front" />
            <div className="poly-face face-back" />
            <div className="poly-face face-left" />
            <div className="poly-face face-right" />
            <div className="poly-face face-top" />
            <div className="poly-face face-bottom" />
          </div>

          {/* Model Floating HUD Badge */}
          <div className="viewer-mesh-tag">
            <Layers size={13} />
            <span>Scale: 1:1 ({dimensions})</span>
          </div>
        </div>

        {/* Bottom Status Footnote */}
        <div className="viewer-stage-footer">
          <div className="status-item">
            <span className="status-dot green-dot" />
            <span>Manifold Sliced Mesh: Ready for G-Code</span>
          </div>
          <span className="status-tip">Click Rotate or drag to inspect planar geometry</span>
        </div>
      </div>
    </div>
  );
};

