import { connectDB } from '../config/db';
import { Product } from '../models/Product';
import { ProductReview } from '../models/ProductReview';

export const enrichedProductData: Record<string, any> = {
  'geometric-deer-sculpture': {
    productId: '3DM001',
    dimensions: '16 × 9 × 24 cm',
    weight: '220 g',
    surfaceFinish: 'Matte Faceted',
    waterproof: false,
    printingTechnology: 'FDM Precision Extrusion',
    productionTime: '2–3 Business Days',
    shippingCharges: 0,
    videos: ['https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'],
    model3DUrl: '/assets/models/sample_deer.glb',
    images: [
      '/assets/product_deer.jpg',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    ],
    sizeOptions: [
      { name: 'Small', dimensions: '12 × 7 × 18 cm', priceModifier: -300 },
      { name: 'Medium (Standard)', dimensions: '16 × 9 × 24 cm', priceModifier: 0 },
      { name: 'Large', dimensions: '22 × 12 × 32 cm', priceModifier: 500 },
    ],
    technicalSpecifications: {
      layerHeight: '0.12mm Ultra Fine',
      infillPercentage: '20% Gyroid',
      durability: 'High Rigidity Interior',
      recommendedUsage: 'Indoor Decor, Shelving & Executive Desks',
      manufacturingTime: '8h 15m',
    },
    customizationOptions: {
      allowCustomText: true,
      maxTextLength: 35,
      allowFileUpload: true,
      allowCustomDimensions: true,
      materialOptions: [
        { material: 'PLA (Matte Pure)', priceModifier: 0, description: 'Eco-friendly, crisp faceted polygon edges' },
        { material: 'PETG Pro', priceModifier: 150, description: 'Temperature resistant, higher impact resilience' },
        { material: 'ABS Tough', priceModifier: 200, description: 'Rigid engineering grade with sandable finish' },
        { material: 'SLA Resin 8K', priceModifier: 400, description: 'Ultra-smooth surface without visible layer lines' },
      ],
      colorOptions: [
        { name: 'Ceramic White', hex: '#F8FAFC', priceModifier: 0 },
        { name: 'Matte Charcoal', hex: '#1E293B', priceModifier: 0 },
        { name: 'Azure Blue', hex: '#087FC3', priceModifier: 50 },
        { name: 'Vibrant Orange', hex: '#F59A16', priceModifier: 50 },
      ],
    },
  },
  'miniature-house-model': {
    productId: '3DM002',
    dimensions: '19 × 14 × 11 cm',
    weight: '410 g',
    surfaceFinish: 'Textured Architectural Matte',
    waterproof: false,
    printingTechnology: 'Multi-Material Extrusion + Resin Glazing',
    productionTime: '3–4 Business Days',
    shippingCharges: 0,
    videos: ['https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'],
    model3DUrl: '/assets/models/sample_house.glb',
    images: [
      '/assets/product_house.jpg',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    ],
    sizeOptions: [
      { name: 'Scale 1:150', dimensions: '14 × 10 × 8 cm', priceModifier: -350 },
      { name: 'Scale 1:100 (Standard)', dimensions: '19 × 14 × 11 cm', priceModifier: 0 },
      { name: 'Scale 1:75', dimensions: '25 × 18 × 15 cm', priceModifier: 650 },
    ],
    technicalSpecifications: {
      layerHeight: '0.08mm High Resolution',
      infillPercentage: '25% Structural Infill',
      durability: 'Rigid Architectural Display Model',
      recommendedUsage: 'Real-Estate Presentations, Client Pitches, Desk Display',
      manufacturingTime: '14h 40m',
    },
    customizationOptions: {
      allowCustomText: true,
      maxTextLength: 45,
      allowFileUpload: true,
      allowCustomDimensions: true,
      materialOptions: [
        { material: 'Architectural PLA + Resin', priceModifier: 0, description: 'Crisp white walls with clear glazing' },
        { material: 'Stone Texture Composite', priceModifier: 250, description: 'Realistic granite/concrete finish' },
        { material: 'Full SLA Resin', priceModifier: 500, description: 'Micro-precision detailing with internal channel hollows' },
      ],
      colorOptions: [
        { name: 'Pure White & Oak', hex: '#FFFFFF', priceModifier: 0 },
        { name: 'Nordic Concrete', hex: '#94A3B8', priceModifier: 0 },
        { name: 'Modern Charcoal & Wood', hex: '#334155', priceModifier: 75 },
      ],
    },
  },
  'astronaut-figurine': {
    productId: '3DM003',
    dimensions: '7.5 × 7 × 14.5 cm',
    weight: '160 g',
    surfaceFinish: 'Smooth SLA 8K Photopolymer',
    waterproof: true,
    printingTechnology: 'SLA Resin Photopolymer',
    productionTime: '2 Business Days',
    shippingCharges: 0,
    videos: ['https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'],
    images: [
      '/assets/product_astronaut.jpg',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    ],
    sizeOptions: [
      { name: 'Desk Miniature (10cm)', dimensions: '5.5 × 5 × 10 cm', priceModifier: -200 },
      { name: 'Collector Standard (14.5cm)', dimensions: '7.5 × 7 × 14.5 cm', priceModifier: 0 },
      { name: 'Statue Scale (20cm)', dimensions: '10 × 9 × 20 cm', priceModifier: 400 },
    ],
    technicalSpecifications: {
      layerHeight: '35 Micron 8K',
      infillPercentage: '100% Solid Resin',
      durability: 'Museum Grade High-Density',
      recommendedUsage: 'Collector Shelf, Workspace Decor, Sci-Fi Gift',
      manufacturingTime: '6h 50m',
    },
    customizationOptions: {
      allowCustomText: true,
      maxTextLength: 20,
      allowFileUpload: false,
      allowCustomDimensions: false,
      materialOptions: [
        { material: 'SLA Tough Resin', priceModifier: 0, description: 'Smooth tactile photopolymer resin' },
        { material: 'Silk Metallic Resin', priceModifier: 150, description: 'Lustrous pearlescent surface' },
      ],
      colorOptions: [
        { name: 'Astronaut White', hex: '#F8FAFC', priceModifier: 0 },
        { name: 'Lunar Grey', hex: '#64748B', priceModifier: 0 },
        { name: 'Cosmic Gold Visor', hex: '#F59A16', priceModifier: 50 },
      ],
    },
  },
  'mechanical-gear-functional': {
    productId: '3DM004',
    dimensions: '11.5 × 8.5 × 4.5 cm',
    weight: '180 g',
    surfaceFinish: 'Smooth Functional Low-Friction',
    waterproof: true,
    printingTechnology: 'FDM Engineering Grade',
    productionTime: '1–2 Business Days',
    shippingCharges: 0,
    images: [
      '/assets/product_gear.jpg',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80',
    ],
    sizeOptions: [
      { name: 'Compact (Module 1.0)', dimensions: '8.5 × 6 × 3.5 cm', priceModifier: -100 },
      { name: 'Standard (Module 1.5)', dimensions: '11.5 × 8.5 × 4.5 cm', priceModifier: 0 },
      { name: 'Heavy Duty (Module 2.0)', dimensions: '15 × 11 × 6 cm', priceModifier: 250 },
    ],
    technicalSpecifications: {
      layerHeight: '0.12mm Tough Layer',
      infillPercentage: '45% Gyroid Structural',
      durability: 'Extreme Tensile & Impact Resistance',
      recommendedUsage: 'Robotics, Engineering Demonstrators, Mechanical Linkages',
      manufacturingTime: '5h 10m',
    },
    customizationOptions: {
      allowCustomText: true,
      maxTextLength: 20,
      allowFileUpload: true,
      allowCustomDimensions: true,
      materialOptions: [
        { material: 'PETG Pro Impact', priceModifier: 0, description: 'Chemical resistant, flexible toughness' },
        { material: 'PA-CF Carbon Fiber Nylon', priceModifier: 300, description: 'Extreme stiffness, heat deflection up to 150°C' },
      ],
      colorOptions: [
        { name: 'Electric Cyan Blue', hex: '#087FC3', priceModifier: 0 },
        { name: 'Industrial Gray', hex: '#64748B', priceModifier: 0 },
        { name: 'Safety Orange', hex: '#F59A16', priceModifier: 30 },
      ],
    },
  },
  'spiral-design-vase': {
    productId: '3DM005',
    dimensions: '12 × 12 × 21 cm',
    weight: '145 g',
    surfaceFinish: 'High Gloss Continuous Spiral',
    waterproof: true,
    printingTechnology: 'Continuous Spiral FDM Extrusion',
    productionTime: '1–2 Business Days',
    shippingCharges: 0,
    images: [
      '/assets/product_vase.jpg',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
    ],
    sizeOptions: [
      { name: 'Small (16cm)', dimensions: '9 × 9 × 16 cm', priceModifier: -150 },
      { name: 'Medium (21cm Standard)', dimensions: '12 × 12 × 21 cm', priceModifier: 0 },
      { name: 'Tall (28cm)', dimensions: '15 × 15 × 28 cm', priceModifier: 300 },
    ],
    technicalSpecifications: {
      layerHeight: '0.20mm Spiral Vase Mode',
      infillPercentage: '100% Solid Perimeter',
      durability: 'Watertight Lightweight Decorative Structure',
      recommendedUsage: 'Fresh Flowers, Dried Bouquets, Centerpiece Decor',
      manufacturingTime: '4h 45m',
    },
    customizationOptions: {
      allowCustomText: false,
      maxTextLength: 0,
      allowFileUpload: false,
      allowCustomDimensions: true,
      materialOptions: [
        { material: 'Glossy Tough PLA', priceModifier: 0, description: 'Vibrant color saturation and light sheen' },
        { material: 'Translucent Amber PETG', priceModifier: 120, description: 'Refractive translucent optical light play' },
      ],
      colorOptions: [
        { name: 'Sunburst Amber Orange', hex: '#F59A16', priceModifier: 0 },
        { name: 'Ocean Blue', hex: '#087FC3', priceModifier: 0 },
        { name: 'Glacier Emerald', hex: '#55B832', priceModifier: 0 },
      ],
    },
  },
  'lattice-table-lamp': {
    productId: '3DM006',
    dimensions: '14 × 14 × 26 cm',
    weight: '320 g',
    surfaceFinish: 'Matte Voronoi Lattice',
    waterproof: false,
    printingTechnology: 'FDM Architectural Fine',
    productionTime: '2–3 Business Days',
    shippingCharges: 0,
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80',
    ],
    sizeOptions: [
      { name: 'Standard (26cm)', dimensions: '14 × 14 × 26 cm', priceModifier: 0 },
      { name: 'Large Statement (34cm)', dimensions: '18 × 18 × 34 cm', priceModifier: 600 },
    ],
    technicalSpecifications: {
      layerHeight: '0.16mm Fine',
      infillPercentage: '30% Gyroid',
      durability: 'Heat-Dissipating Structural Shade',
      recommendedUsage: 'Ambient Bedside Lamp, Study Desk, Lounge Corner',
      manufacturingTime: '12h 30m',
    },
    customizationOptions: {
      allowCustomText: true,
      maxTextLength: 30,
      allowFileUpload: false,
      allowCustomDimensions: true,
      materialOptions: [
        { material: 'Matte Diffusion PLA', priceModifier: 0, description: 'Warm optical diffusion' },
        { material: 'Natural Wood Composite PLA', priceModifier: 300, description: 'Contains 30% recycled wood fibers with natural aroma' },
      ],
      colorOptions: [
        { name: 'Warm Cream White', hex: '#FAF9F6', priceModifier: 0 },
        { name: 'Matte Charcoal', hex: '#1E293B', priceModifier: 0 },
      ],
    },
  },
  'castle-model': {
    productId: '3DM007',
    dimensions: '20 × 18 × 22 cm',
    weight: '460 g',
    surfaceFinish: 'Stone Textured Matte',
    waterproof: false,
    printingTechnology: 'Multi-Material Extrusion',
    productionTime: '3–4 Business Days',
    shippingCharges: 0,
    images: [
      '/assets/gallery_castle.jpg',
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    ],
    sizeOptions: [
      { name: 'Medium (22cm)', dimensions: '20 × 18 × 22 cm', priceModifier: 0 },
      { name: 'Grand Diorama (30cm)', dimensions: '28 × 24 × 30 cm', priceModifier: 700 },
    ],
    technicalSpecifications: {
      layerHeight: '0.12mm Precision',
      infillPercentage: '20% Structural',
      durability: 'Tabletop Structural Maquette',
      recommendedUsage: 'Tabletop RPG, Diorama Base, Collector Display',
      manufacturingTime: '16h 15m',
    },
    customizationOptions: {
      allowCustomText: true,
      maxTextLength: 30,
      allowFileUpload: true,
      allowCustomDimensions: false,
      materialOptions: [
        { material: 'Tough PLA', priceModifier: 0, description: 'High mechanical integrity' },
        { material: 'Stone Composite PLA', priceModifier: 200, description: 'Authentic quarry stone texture' },
      ],
      colorOptions: [
        { name: 'Cobblestone Gray', hex: '#94A3B8', priceModifier: 0 },
        { name: 'Pure White', hex: '#FFFFFF', priceModifier: 0 },
      ],
    },
  },
  'classic-bust-sculpture': {
    productId: '3DM008',
    dimensions: '11 × 9.5 × 18 cm',
    weight: '280 g',
    surfaceFinish: 'SLA Polished Marble Finish',
    waterproof: true,
    printingTechnology: 'SLA Photopolymer Resin',
    productionTime: '2 Business Days',
    shippingCharges: 0,
    images: [
      '/assets/gallery_bust.jpg',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    ],
    sizeOptions: [
      { name: 'Desk Size (18cm)', dimensions: '11 × 9.5 × 18 cm', priceModifier: 0 },
      { name: 'Gallery Size (24cm)', dimensions: '15 × 13 × 24 cm', priceModifier: 450 },
    ],
    technicalSpecifications: {
      layerHeight: '0.05mm Micro Pitch',
      infillPercentage: '100% Solid Resin',
      durability: 'Museum Grade Solid Resin',
      recommendedUsage: 'Art Bookshelf, Interior Styling, Architectural Decor',
      manufacturingTime: '9h 40m',
    },
    customizationOptions: {
      allowCustomText: true,
      maxTextLength: 25,
      allowFileUpload: false,
      allowCustomDimensions: false,
      materialOptions: [
        { material: 'Sculpting White Resin', priceModifier: 0, description: 'Silk matte marble appearance' },
        { material: 'Tough Gray Resin', priceModifier: 150, description: 'Classical bronze/graphite patina' },
      ],
      colorOptions: [
        { name: 'Marble White', hex: '#F8FAFC', priceModifier: 0 },
        { name: 'Classical Gray', hex: '#64748B', priceModifier: 0 },
      ],
    },
  },
  'custom-name-keychain': {
    productId: '3DM009',
    dimensions: '8 × 2.5 × 0.8 cm',
    weight: '25 g',
    surfaceFinish: 'Smooth Dual-Extrusion',
    waterproof: true,
    printingTechnology: 'Dual Extrusion FDM',
    productionTime: '1 Business Day',
    shippingCharges: 0,
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ],
    sizeOptions: [
      { name: 'Compact (6cm)', dimensions: '6 × 2.2 × 0.8 cm', priceModifier: -50 },
      { name: 'Standard (8cm)', dimensions: '8 × 2.5 × 0.8 cm', priceModifier: 0 },
      { name: 'Large Tag (10cm)', dimensions: '10 × 3 × 0.8 cm', priceModifier: 50 },
    ],
    technicalSpecifications: {
      layerHeight: '0.12mm Fine',
      infillPercentage: '100% Solid Infill',
      durability: 'Scratch & Pocket Abrasion Proof',
      recommendedUsage: 'Car Keys, Backpack Zipper Tag, Personal Keepsake',
      manufacturingTime: '1h 15m',
    },
    customizationOptions: {
      allowCustomText: true,
      maxTextLength: 18,
      allowFileUpload: false,
      allowCustomDimensions: false,
      materialOptions: [
        { material: 'Tough PLA', priceModifier: 0, description: 'Durable daily carry polymer' },
        { material: 'PETG Extreme', priceModifier: 50, description: 'Weather and heat resistant in direct car sun' },
      ],
      colorOptions: [
        { name: 'Electric Cyan & White', hex: '#087FC3', priceModifier: 0 },
        { name: 'Safety Orange & Black', hex: '#F59A16', priceModifier: 0 },
      ],
    },
  },
  'controller-stand': {
    productId: '3DM010',
    dimensions: '11 × 9 × 16 cm',
    weight: '210 g',
    surfaceFinish: 'Matte Industrial Texture',
    waterproof: true,
    printingTechnology: 'Impact FDM Extrusion',
    productionTime: '1–2 Business Days',
    shippingCharges: 0,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=80',
    ],
    sizeOptions: [
      { name: 'Single Controller Cradle', dimensions: '11 × 9 × 16 cm', priceModifier: 0 },
      { name: 'Dual Controller + Headset Dock', dimensions: '14 × 12 × 24 cm', priceModifier: 350 },
    ],
    technicalSpecifications: {
      layerHeight: '0.16mm Layer',
      infillPercentage: '35% Hexagonal Structural',
      durability: 'Weighted Anti-Tip Base with High Impact Strength',
      recommendedUsage: 'PS5, Xbox Series X, Nintendo Switch Pro Gaming Desks',
      manufacturingTime: '7h 20m',
    },
    customizationOptions: {
      allowCustomText: true,
      maxTextLength: 25,
      allowFileUpload: true,
      allowCustomDimensions: false,
      materialOptions: [
        { material: 'ABS High Impact', priceModifier: 0, description: 'Durable impact-resistant gaming hardware' },
        { material: 'PETG Pro', priceModifier: 100, description: 'UV and scratch resistant finish' },
      ],
      colorOptions: [
        { name: 'Matte Obsidian Black', hex: '#1E293B', priceModifier: 0 },
        { name: 'Ceramic White', hex: '#F8FAFC', priceModifier: 0 },
        { name: 'Azure Blue', hex: '#087FC3', priceModifier: 40 },
      ],
    },
  },
  'desk-organizer': {
    productId: '3DM011',
    dimensions: '15 × 13 × 8.5 cm',
    weight: '175 g',
    surfaceFinish: 'Matte Hexagonal Grid',
    waterproof: true,
    printingTechnology: 'Clean FDM Extrusion',
    productionTime: '1–2 Business Days',
    shippingCharges: 0,
    images: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    ],
    sizeOptions: [
      { name: '3-Module Compact', dimensions: '11 × 10 × 8.5 cm', priceModifier: -150 },
      { name: '5-Module Standard', dimensions: '15 × 13 × 8.5 cm', priceModifier: 0 },
      { name: '7-Module Executive', dimensions: '21 × 16 × 8.5 cm', priceModifier: 250 },
    ],
    technicalSpecifications: {
      layerHeight: '0.20mm Clean',
      infillPercentage: '25% Gyroid',
      durability: 'Modular Interlocking Rigid Frame',
      recommendedUsage: 'Pens, Apple Pencil, SD Cards, Cables, Smartphone Stand',
      manufacturingTime: '6h 10m',
    },
    customizationOptions: {
      allowCustomText: true,
      maxTextLength: 30,
      allowFileUpload: false,
      allowCustomDimensions: true,
      materialOptions: [
        { material: 'PETG Pro', priceModifier: 0, description: 'Rigid durable workstation polymer' },
        { material: 'Matte Tough PLA', priceModifier: 50, description: 'Velvety matte clean texture' },
      ],
      colorOptions: [
        { name: 'Industrial Slate', hex: '#475569', priceModifier: 0 },
        { name: 'Arctic White', hex: '#FFFFFF', priceModifier: 0 },
        { name: 'Emerald Sparkle', hex: '#55B832', priceModifier: 40 },
      ],
    },
  },
  'car-model': {
    productId: '3DM012',
    dimensions: '19.5 × 8.5 × 5.5 cm',
    weight: '340 g',
    surfaceFinish: 'High Gloss ABS Polished',
    waterproof: true,
    printingTechnology: 'High Precision FDM',
    productionTime: '2–3 Business Days',
    shippingCharges: 0,
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    ],
    sizeOptions: [
      { name: 'Scale 1:32', dimensions: '14 × 6.5 × 4.2 cm', priceModifier: -300 },
      { name: 'Scale 1:24 (Standard)', dimensions: '19.5 × 8.5 × 5.5 cm', priceModifier: 0 },
      { name: 'Scale 1:18 Collector', dimensions: '26 × 11.5 × 7.5 cm', priceModifier: 550 },
    ],
    technicalSpecifications: {
      layerHeight: '0.10mm High Precision',
      infillPercentage: '30% Tri-Hex',
      durability: 'High-Speed Aerodynamic Chassis Model',
      recommendedUsage: 'Automotive Collector, Office Maquette, Gift',
      manufacturingTime: '13h 45m',
    },
    customizationOptions: {
      allowCustomText: true,
      maxTextLength: 25,
      allowFileUpload: true,
      allowCustomDimensions: true,
      materialOptions: [
        { material: 'ABS High Gloss', priceModifier: 0, description: 'Automotive grade impact resistant polymer' },
        { material: 'PETG Pro', priceModifier: 100, description: 'Durable finish with clean surface detail' },
      ],
      colorOptions: [
        { name: 'Racing Blue', hex: '#087FC3', priceModifier: 0 },
        { name: 'Vibrant Orange', hex: '#F59A16', priceModifier: 50 },
        { name: 'Gloss White', hex: '#FFFFFF', priceModifier: 0 },
      ],
    },
  },
};

export const sampleReviews: Array<{
  productSlug: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}> = [
  {
    productSlug: 'geometric-deer-sculpture',
    userName: 'Aman Verma',
    rating: 5,
    title: 'Flawless geometric lines and zero seam marks!',
    comment: 'The facets catch the morning sunlight beautifully. The matte ceramic white finish is velvety smooth and looks like a ₹5,000 designer piece. Packaged securely with bubble wrap and arrived in 3 days.',
    verifiedPurchase: true,
    createdAt: '2026-10-14T10:30:00Z',
  },
  {
    productSlug: 'geometric-deer-sculpture',
    userName: 'Neha Sharma',
    rating: 5,
    title: 'Exceeded my expectations',
    comment: 'Customized it with an engraved nameplate on the base for my husband’s anniversary gift. The 3D print quality is top notch. Pan India delivery was prompt.',
    verifiedPurchase: true,
    createdAt: '2026-10-20T14:15:00Z',
  },
  {
    productSlug: 'geometric-deer-sculpture',
    userName: 'Rahul Saxena',
    rating: 4,
    title: 'Solid build quality',
    comment: 'Ordered in Matte Charcoal. Very lightweight yet rigid structure. Gyroid infill gives it great structural strength.',
    verifiedPurchase: true,
    createdAt: '2026-10-28T09:40:00Z',
  },
  {
    productSlug: 'miniature-house-model',
    userName: 'Priya Shah',
    rating: 5,
    title: 'Incredible scale fidelity for client pitch',
    comment: 'Used this 1:100 scale maquette for an architectural presentation with real-estate investors. The removable floorplates and crisp window resin detailing blew the clients away.',
    verifiedPurchase: true,
    createdAt: '2026-10-18T16:20:00Z',
  },
  {
    productSlug: 'miniature-house-model',
    userName: 'Vikramaditya Roy',
    rating: 5,
    title: 'Superb precision printing',
    comment: 'Clean staircases, roof overhangs, and sharp edges. 3Dunity team was very helpful confirming the CAD dimensions before print started.',
    verifiedPurchase: true,
    createdAt: '2026-10-24T11:05:00Z',
  },
  {
    productSlug: 'astronaut-figurine',
    userName: 'Dr. Arjun Mehta',
    rating: 5,
    title: 'Resin surface feels like liquid glass',
    comment: 'At 35 microns, you cannot see a single layer line with the naked eye. The gold visor contrast against the astronaut white suit is majestic.',
    verifiedPurchase: true,
    createdAt: '2026-10-15T08:50:00Z',
  },
  {
    productSlug: 'astronaut-figurine',
    userName: 'Karan Mehra',
    rating: 4,
    title: 'Great desktop companion',
    comment: 'Sits right under my gaming monitor. Solid resin weight gives it a premium feel without wobbling.',
    verifiedPurchase: true,
    createdAt: '2026-10-29T13:40:00Z',
  },
  {
    productSlug: 'mechanical-gear-functional',
    userName: 'Hitesh Patel',
    rating: 5,
    title: 'Handles high torque with zero slippage',
    comment: 'Printed in PETG Pro. The herringbone tooth geometry meshes smoothly without axial backlash. Exact tolerances out of the box.',
    verifiedPurchase: true,
    createdAt: '2026-10-12T17:30:00Z',
  },
  {
    productSlug: 'spiral-design-vase',
    userName: 'Ananya Deshmukh',
    rating: 5,
    title: '100% watertight as promised!',
    comment: 'Filled it with water and fresh lilies right away. Not a single droplet leaked. The sunburst amber color glows wonderfully near the window.',
    verifiedPurchase: true,
    createdAt: '2026-10-19T12:00:00Z',
  },
  {
    productSlug: 'custom-name-keychain',
    userName: 'Sameer Joshi',
    rating: 5,
    title: 'Clean dual extrusion lettering',
    comment: 'Got 5 customized keychains with team names for my startup crew. Crisp edges and vibrant cyan blue.',
    verifiedPurchase: true,
    createdAt: '2026-10-26T15:10:00Z',
  },
];

export async function enrichProductsAndSeedReviews() {
  await connectDB();
  console.log('🔄 Enriching 12 products with full specification & customization metadata...');

  for (const [slug, extra] of Object.entries(enrichedProductData)) {
    const updated = await Product.findOneAndUpdate(
      { slug },
      { $set: extra },
      { new: true }
    );
    if (updated) {
      console.log(`✅ Enriched ${updated.name} (ID: ${extra.productId})`);
    }
  }

  console.log('🔄 Seeding product reviews...');
  for (const rev of sampleReviews) {
    const prod = await Product.findOne({ slug: rev.productSlug });
    if (prod) {
      await ProductReview.findOneAndUpdate(
        { productSlug: rev.productSlug, userName: rev.userName },
        {
          ...rev,
          productId: prod._id,
        },
        { upsert: true, new: true }
      );
    }
  }

  // Update review counts & ratings on products
  const products = await Product.find();
  for (const p of products) {
    const reviews = await ProductReview.find({ productSlug: p.slug });
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await Product.findByIdAndUpdate(p._id, {
        rating: Number(avg.toFixed(1)),
        reviewCount: reviews.length,
      });
    }
  }

  console.log('🎉 Product enrichment & review seeding completed successfully!');
}

if (require.main === module) {
  enrichProductsAndSeedReviews().then(() => process.exit(0));
}

