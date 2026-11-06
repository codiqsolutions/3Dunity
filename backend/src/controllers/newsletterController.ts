import { Request, Response } from 'express';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';

export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.',
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email format.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if already subscribed
    const existing = await NewsletterSubscriber.findOne({ email: normalizedEmail });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
      }
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to 3Dunity updates!',
      });
    }

    // Create new subscriber
    await NewsletterSubscriber.create({
      email: normalizedEmail,
      source: req.body.source || 'homepage_footer',
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to 3Dunity updates and offers!',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Unable to process subscription at this time.',
      error: error.message,
    });
  }
};

