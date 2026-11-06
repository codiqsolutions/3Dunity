import React, { useState, useRef } from 'react';
import { UploadCloud, FileCheck, X, AlertCircle, Loader2 } from 'lucide-react';
import { productApi } from '../../api/productApi';

export interface UploadedFileItem {
  url: string;
  filename: string;
  originalName: string;
  size: number;
}

export interface DesignUploadProps {
  uploadedFiles: UploadedFileItem[];
  onFilesChange: (files: UploadedFileItem[]) => void;
}

const ALLOWED_EXTENSIONS = ['.stl', '.obj', '.3mf', '.step', '.png', '.jpg', '.jpeg', '.webp', '.pdf'];
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

export const DesignUpload: React.FC<DesignUploadProps> = ({
  uploadedFiles,
  onFilesChange,
}) => {
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;

    setErrorMessage(null);
    const validFiles: File[] = [];

    for (let i = 0; i < selected.length; i++) {
      const file = selected[i];
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();

      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        setErrorMessage(`Invalid file format "${file.name}". Supported: .stl, .obj, .3mf, .png, .jpg, .pdf`);
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage(`File "${file.name}" exceeds the 50MB limit.`);
        return;
      }

      validFiles.push(file);
    }

    try {
      setUploading(true);
      const res = await productApi.uploadFiles(validFiles);

      if (res.data && Array.isArray(res.data)) {
        const newUploaded: UploadedFileItem[] = res.data.map((item) => ({
          url: item.url,
          filename: item.filename,
          originalName: item.originalName,
          size: item.size,
        }));

        onFilesChange([...uploadedFiles, ...newUploaded]);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    onFilesChange(uploadedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="custom-option-group design-upload-group">
      <div className="option-group-label-row">
        <label className="option-group-label">
          <UploadCloud size={15} className="text-primary-blue" />
          <span>Upload Reference Sketch or 3D File:</span>
          <span className="upload-optional-pill">Optional (.STL, .OBJ, .3MF, .PDF, .PNG)</span>
        </label>
      </div>

      {/* Upload Dropzone */}
      <div
        className={`upload-dropzone-box ${uploading ? 'is-uploading' : ''}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".stl,.obj,.3mf,.step,.png,.jpg,.jpeg,.webp,.pdf"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {uploading ? (
          <div className="upload-state-loading">
            <Loader2 size={24} className="spin-animate text-primary-blue" />
            <span>Uploading & validating 3D geometries...</span>
          </div>
        ) : (
          <div className="upload-state-idle">
            <UploadCloud size={28} className="upload-cloud-icon" />
            <p className="upload-prompt-text">
              <strong>Click to upload</strong> or drag & drop reference sketches or 3D files
            </p>
            <span className="upload-sub-text">Max 50MB per file • STL, OBJ, 3MF, STEP, PNG, JPG, PDF</span>
          </div>
        )}
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="upload-error-alert">
          <AlertCircle size={14} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Uploaded Files Pills */}
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files-list">
          {uploadedFiles.map((file, idx) => (
            <div key={idx} className="uploaded-file-chip">
              <FileCheck size={14} className="file-check-icon" />
              <span className="file-chip-name" title={file.originalName}>
                {file.originalName} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
              <button
                type="button"
                onClick={() => handleRemoveFile(idx)}
                className="file-chip-remove"
                title="Remove file"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

