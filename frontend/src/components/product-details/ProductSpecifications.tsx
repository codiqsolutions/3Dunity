import React from 'react';
import { Product } from '../../types/product';
import { Check, X, ShieldCheck } from 'lucide-react';

export interface ProductSpecificationsProps {
  product: Product;
}

export const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ product }) => {
  const specs = [
    { label: 'Product ID / SKU', value: product.productId },
    { label: 'Category', value: product.categoryName },
    { label: 'Primary Printing Material', value: product.material },
    {
      label: 'Printing Technology',
      value: product.printingTechnology || product.specs?.technology,
    },
    {
      label: 'Available Color Palette',
      value: product.specs?.colors?.map((c) => c.name).join(', '),
    },
    { label: 'Standard Dimensions', value: product.dimensions },
    { label: 'Part Weight', value: product.weight },
    {
      label: 'Layer Resolution / Height',
      value: product.technicalSpecifications?.layerHeight || product.specs?.layerResolution,
    },
    {
      label: 'Internal Infill Structure',
      value: product.technicalSpecifications?.infillPercentage || product.specs?.infill,
    },
    { label: 'Surface Finish', value: product.surfaceFinish },
    {
      label: 'Waterproof / Watertight',
      value: product.waterproof !== undefined ? (product.waterproof ? 'Yes (Watertight)' : 'No (Interior Use Only)') : undefined,
    },
    {
      label: 'Structural Durability',
      value: product.technicalSpecifications?.durability,
    },
    {
      label: 'Recommended Application',
      value: product.technicalSpecifications?.recommendedUsage,
    },
    {
      label: 'Customization Support',
      value: product.customizationAvailable ? 'Supported (Size, Material, Engraving)' : 'Standard Only',
    },
    {
      label: 'Manufacturing & QC Time',
      value: product.technicalSpecifications?.manufacturingTime || product.productionTime || product.specs?.printTime,
    },
  ];

  // Hide missing or empty fields as requested in requirements
  const filteredSpecs = specs.filter(
    (item) => item.value !== undefined && item.value !== null && String(item.value).trim() !== ''
  );

  return (
    <div className="product-specifications-container">
      <div className="specifications-header-row">
        <h3 className="specs-section-title">Verified Technical Specifications</h3>
        <span className="specs-badge">
          <ShieldCheck size={14} />
          <span>Quality Checked</span>
        </span>
      </div>

      <div className="specifications-table-wrap">
        <table className="specifications-table" aria-label="Technical Specifications">
          <tbody>
            {filteredSpecs.map((spec, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
                <th scope="row" className="spec-label-cell">
                  {spec.label}
                </th>
                <td className="spec-value-cell">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

