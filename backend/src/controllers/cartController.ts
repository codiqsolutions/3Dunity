import { Request, Response } from 'express';
import { Product } from '../models/Product';

export interface CartSessionItem {
  id: string; // Composite key
  productId: string;
  quantity: number;
  selectedMaterial?: string;
  selectedColor?: string;
  selectedSize?: string;
  customDimensions?: {
    length?: number;
    width?: number;
    height?: number;
    unit?: string;
  };
  customText?: string;
  uploadedFiles?: string[];
  unitPrice: number;
  totalPrice: number;
  product?: any;
}

const guestCarts = new Map<string, CartSessionItem[]>();

export const getCartItems = async (req: Request, res: Response) => {
  try {
    const sessionId = (req.headers['x-session-id'] as string) || 'guest-session';
    const items = guestCarts.get(sessionId) || [];

    // Populate products
    const populated = await Promise.all(
      items.map(async (item) => {
        const prod = await Product.findById(item.productId).lean();
        return {
          ...item,
          product: prod,
        };
      })
    );

    return res.json({
      success: true,
      count: populated.length,
      data: populated,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve cart items',
      error: error.message,
    });
  }
};

export const addCartItem = async (req: Request, res: Response) => {
  try {
    const {
      productId,
      quantity = 1,
      selectedMaterial,
      selectedColor,
      selectedSize,
      customDimensions,
      customText,
      uploadedFiles,
    } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID or slug is required',
      });
    }

    const isId = /^[0-9a-fA-F]{24}$/.test(productId);
    const product = await Product.findOne(
      isId ? { $or: [{ _id: productId }, { slug: productId }] } : { slug: productId }
    ).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Server-side price recalculation: never trust client price
    let calculatedUnitPrice = product.price;

    // 1. Size Modifier
    if (selectedSize && product.sizeOptions && Array.isArray(product.sizeOptions)) {
      const sizeOpt = product.sizeOptions.find(
        (s) => s.name.toLowerCase() === selectedSize.toLowerCase()
      );
      if (sizeOpt) {
        calculatedUnitPrice += sizeOpt.priceModifier;
      }
    }

    // 2. Material Modifier
    if (
      selectedMaterial &&
      product.customizationOptions?.materialOptions &&
      Array.isArray(product.customizationOptions.materialOptions)
    ) {
      const matOpt = product.customizationOptions.materialOptions.find((m) =>
        m.material.toLowerCase().includes(selectedMaterial.toLowerCase())
      );
      if (matOpt) {
        calculatedUnitPrice += matOpt.priceModifier;
      }
    }

    // 3. Color Modifier
    if (
      selectedColor &&
      product.customizationOptions?.colorOptions &&
      Array.isArray(product.customizationOptions.colorOptions)
    ) {
      const colOpt = product.customizationOptions.colorOptions.find(
        (c) => c.name.toLowerCase() === selectedColor.toLowerCase()
      );
      if (colOpt && colOpt.priceModifier) {
        calculatedUnitPrice += colOpt.priceModifier;
      }
    }

    // 4. Custom text engraving fee if requested
    if (customText && customText.trim().length > 0) {
      calculatedUnitPrice += 50; // Nominal customization fee for custom text
    }

    // Ensure unit price cannot fall below 0
    calculatedUnitPrice = Math.max(1, calculatedUnitPrice);

    const safeQty = Math.max(1, Math.min(100, Number(quantity) || 1));
    const sessionId = (req.headers['x-session-id'] as string) || 'guest-session';
    const items = guestCarts.get(sessionId) || [];

    const compositeId = `${product._id}-${selectedSize || 'std'}-${selectedMaterial || 'std'}-${selectedColor || 'std'}-${customText || 'none'}`;

    const existingIndex = items.findIndex((i) => i.id === compositeId);
    if (existingIndex > -1) {
      items[existingIndex].quantity += safeQty;
      items[existingIndex].totalPrice = items[existingIndex].quantity * items[existingIndex].unitPrice;
    } else {
      items.push({
        id: compositeId,
        productId: String(product._id),
        quantity: safeQty,
        selectedMaterial: selectedMaterial || product.material || 'PLA',
        selectedColor: selectedColor || (product.specs?.colors?.[0]?.name) || 'White',
        selectedSize: selectedSize || (product.sizeOptions?.[0]?.name) || 'Standard',
        customDimensions: customDimensions || undefined,
        customText: customText ? customText.trim() : undefined,
        uploadedFiles: Array.isArray(uploadedFiles) ? uploadedFiles : undefined,
        unitPrice: calculatedUnitPrice,
        totalPrice: calculatedUnitPrice * safeQty,
        product,
      });
    }

    guestCarts.set(sessionId, items);

    return res.status(200).json({
      success: true,
      message: `Added ${product.name} to cart at ₹${calculatedUnitPrice.toLocaleString('en-IN')}`,
      data: items,
      unitPrice: calculatedUnitPrice,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message,
    });
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const sessionId = (req.headers['x-session-id'] as string) || 'guest-session';
    let items = guestCarts.get(sessionId) || [];

    items = items.filter((i) => i.id !== productId && i.productId !== productId);
    guestCarts.set(sessionId, items);

    return res.json({
      success: true,
      message: 'Item removed from cart',
      data: items,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: error.message,
    });
  }
};
