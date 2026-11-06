export interface CustomQuoteEstimate {
  estimatedPrice: number;
  unitPrice: number;
  estimatedDays: number;
  breakdown: {
    materialCost: number;
    machineTimeCost: number;
    finishLaborCost: number;
    volumeDiscountPct: number;
  };
}

export interface CustomRequestPayload {
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  projectTitle: string;
  projectDescription: string;
  technology: 'FDM' | 'SLA Resin' | 'SLS' | 'Direct Metal (DMLS)' | 'Consultant Recommendation';
  material: string;
  colorPreference: string;
  infillPercentage: number;
  surfaceFinish: 'Raw / As-Printed' | 'Sanded Smooth' | 'Vapor Smoothed' | 'Primer & Painted' | 'Electroplated';
  quantity: number;
  toleranceRequirement: string;
  notes?: string;
  files?: File[];
}

export interface CustomRequestResponse {
  _id: string;
  fullName: string;
  email: string;
  projectTitle: string;
  technology: string;
  material: string;
  quantity: number;
  estimatedPrice: number;
  estimatedTurnaroundDays: number;
  status: string;
  createdAt: string;
}

