/**
 * Form validation utilities for Kape Digital
 * Provides client-side validation before submission
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Regex patterns
const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[\d\s\-().]{7,}$/,
  url: /^https?:\/\/.+/,
};

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  return patterns.email.test(email.trim());
}

/**
 * Validate phone format (basic international format)
 */
export function validatePhone(phone: string): boolean {
  return patterns.phone.test(phone.trim());
}

/**
 * Validate URL format
 */
export function validateURL(url: string): boolean {
  return patterns.url.test(url.trim());
}

/**
 * Validate contact form submission
 */
export function validateContactForm(data: {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate name
  if (!data.name?.trim()) {
    errors.name = 'El nombre es requerido';
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  }

  // Validate email
  if (!data.email?.trim()) {
    errors.email = 'El correo es requerido';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Ingresa un correo válido';
  }

  // Validate subject
  if (!data.subject?.trim()) {
    errors.subject = 'El asunto es requerido';
  } else if (data.subject.trim().length < 3) {
    errors.subject = 'El asunto debe tener al menos 3 caracteres';
  }

  // Validate message
  if (!data.message?.trim()) {
    errors.message = 'El mensaje es requerido';
  } else if (data.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Debounce function for form validation
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
