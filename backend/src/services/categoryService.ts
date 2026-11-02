import { Category } from '../models/Category';
import { Product } from '../models/Product';

export class CategoryService {
  static async getAllCategories() {
    const categories = await Category.find().sort({ order: 1, name: 1 }).lean();
    
    // Dynamically calculate product counts
    const withCounts = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({ category: cat.slug });
        return {
          ...cat,
          itemCount: count > 0 ? count : (cat.itemCount || 0),
        };
      })
    );

    return withCounts;
  }

  static async getCategoryBySlug(slug: string) {
    return Category.findOne({ slug }).lean();
  }

  static async createCategory(data: Record<string, any>) {
    const category = new Category(data);
    return category.save();
  }
}
