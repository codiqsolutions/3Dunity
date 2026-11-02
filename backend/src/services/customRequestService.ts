import { CustomRequest, IUploadedFile } from '../models/CustomRequest';

export interface EstimateOptions {
  technology: string;
  material: string;
  infillPercentage: number;
  surfaceFinish: string;
  quantity: number;
}

export class CustomRequestService {
  /**
   * Calculate realistic 3D fabrication estimate based on engineering formulas
   */
  static calculateEstimate(options: EstimateOptions): {
    estimatedPrice: number;
    unitPrice: number;
    estimatedDays: number;
    breakdown: {
      materialCost: number;
      machineTimeCost: number;
      finishLaborCost: number;
      volumeDiscountPct: number;
    };
  } {
    const qty = Math.max(1, options.quantity || 1);

    // Base machine setup and runtime rates
    let baseSetup = 15;
    let materialMultiplier = 1.0;
    let days = 2;

    switch (options.technology) {
      case 'SLA Resin':
        baseSetup = 28;
        materialMultiplier = 1.45;
        days = 3;
        break;
      case 'SLS':
        baseSetup = 45;
        materialMultiplier = 1.85;
        days = 4;
        break;
      case 'Direct Metal (DMLS)':
        baseSetup = 120;
        materialMultiplier = 4.5;
        days = 7;
        break;
      default: // FDM
        baseSetup = 12;
        materialMultiplier = 1.0;
        days = 2;
        break;
    }

    // Material tier modifier
    const mat = (options.material || '').toLowerCase();
    if (mat.includes('carbon') || mat.includes('nylon')) materialMultiplier *= 1.35;
    else if (mat.includes('tough resin') || mat.includes('engineering')) materialMultiplier *= 1.4;
    else if (mat.includes('petg')) materialMultiplier *= 1.15;
    else if (mat.includes('metal')) materialMultiplier *= 2.5;

    // Infill modifier
    const infillFactor = 0.8 + ((options.infillPercentage || 20) / 100) * 0.7;

    // Finish cost
    let finishCostPerUnit = 0;
    switch (options.surfaceFinish) {
      case 'Sanded Smooth':
        finishCostPerUnit = 8;
        days += 1;
        break;
      case 'Vapor Smoothed':
        finishCostPerUnit = 14;
        days += 1;
        break;
      case 'Primer & Painted':
        finishCostPerUnit = 24;
        days += 2;
        break;
      case 'Electroplated':
        finishCostPerUnit = 38;
        days += 3;
        break;
      default:
        finishCostPerUnit = 0;
        break;
    }

    const singleMaterialCost = +(18 * materialMultiplier * infillFactor).toFixed(2);
    const singleMachineCost = +(baseSetup * 0.75).toFixed(2);

    // Quantity scale / discount
    let volumeDiscountPct = 0;
    if (qty >= 50) volumeDiscountPct = 25;
    else if (qty >= 20) volumeDiscountPct = 18;
    else if (qty >= 10) volumeDiscountPct = 12;
    else if (qty >= 5) volumeDiscountPct = 7;

    const rawUnitPrice = singleMaterialCost + singleMachineCost + finishCostPerUnit;
    const discountedUnitPrice = +(rawUnitPrice * (1 - volumeDiscountPct / 100)).toFixed(2);
    const totalPrice = +(discountedUnitPrice * qty).toFixed(2);

    return {
      estimatedPrice: totalPrice,
      unitPrice: discountedUnitPrice,
      estimatedDays: days,
      breakdown: {
        materialCost: singleMaterialCost,
        machineTimeCost: singleMachineCost,
        finishLaborCost: finishCostPerUnit,
        volumeDiscountPct,
      },
    };
  }

  static async createCustomRequest(
    data: Record<string, any>,
    files: IUploadedFile[] = []
  ) {
    const estimate = this.calculateEstimate({
      technology: data.technology || 'FDM',
      material: data.material || 'PLA Tough',
      infillPercentage: data.infillPercentage || 20,
      surfaceFinish: data.surfaceFinish || 'Raw / As-Printed',
      quantity: data.quantity || 1,
    });

    const request = new CustomRequest({
      ...data,
      uploadedFiles: files,
      estimatedPrice: estimate.estimatedPrice,
      estimatedTurnaroundDays: estimate.estimatedDays,
      status: 'pending_review',
    });

    return request.save();
  }

  static async getCustomRequestById(id: string) {
    return CustomRequest.findById(id).lean();
  }
}
