/**
 * Pure business logic and utilities for Fitness Point gym application.
 * Decoupled from React DOM for fast, deterministic unit testing.
 */

export interface LeadValidationInput {
  name: string;
  phone: string;
  email?: string;
}

export interface LeadValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Strips formatting and prepares international phone format for tel: link.
 * Fitness Point official number: 93008 49000 -> tel:+919300849000
 */
export function formatPhoneForTel(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return 'tel:+919300849000';
  if (digits.length === 10) {
    return `tel:+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return `tel:+${digits}`;
  }
  return `tel:+${digits}`;
}

/**
 * Returns formatted display string for phone number (e.g. +91 93008 49000).
 */
export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    const local = digits.slice(2);
    return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
  }
  return phone;
}

/**
 * Generates an official WhatsApp click-to-chat URL with pre-filled message.
 */
export function generateWhatsAppLink(rawPhone: string, message: string): string {
  const digits = rawPhone.replace(/\D/g, '');
  const internationalNumber = digits.length === 10 ? `91${digits}` : digits;
  const encodedMsg = encodeURIComponent(message.trim());
  return `https://wa.me/${internationalNumber}?text=${encodedMsg}`;
}

/**
 * Validates lead enquiry and trial session forms.
 */
export function validateLeadForm(input: LeadValidationInput): LeadValidationResult {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }

  const phoneDigits = input.phone ? input.phone.replace(/\D/g, '') : '';
  // Indian phone numbers are 10 digits (or 12 digits with 91 prefix)
  const isValidPhone = phoneDigits.length === 10 || (phoneDigits.length === 12 && phoneDigits.startsWith('91'));
  if (!isValidPhone) {
    errors.phone = 'Please enter a valid 10-digit mobile number.';
  }

  if (input.email && input.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates savings compared to monthly recurring rate.
 */
export function calculateSavings(
  monthlyPrice: number,
  billingCycle: 'monthly' | 'quarterly' | 'annual',
  actualPrice: number
): { percentSaved: number; amountSaved: number } {
  if (billingCycle === 'monthly') {
    return { percentSaved: 0, amountSaved: 0 };
  }

  const months = billingCycle === 'quarterly' ? 3 : 12;
  const standardCost = monthlyPrice * months;
  const diff = standardCost - actualPrice;

  if (diff <= 0) {
    return { percentSaved: 0, amountSaved: 0 };
  }

  const percent = Math.round((diff / standardCost) * 100);
  return { percentSaved: percent, amountSaved: diff };
}

/**
 * Filters gallery items by category with 'all' fallback.
 */
export function filterGalleryItems<T extends { category: string }>(
  items: T[],
  selectedCategory: string
): T[] {
  if (!selectedCategory || selectedCategory === 'all') {
    return items;
  }
  return items.filter((item) => item.category === selectedCategory);
}
