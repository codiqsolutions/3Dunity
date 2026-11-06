import { Service } from '../models/Service';

export class ServiceService {
  public static async getAllServices() {
    return Service.find({ isActive: true }).sort({ order: 1 }).lean();
  }

  public static async getServiceBySlug(slug: string) {
    return Service.findOne({ slug, isActive: true }).lean();
  }
}
