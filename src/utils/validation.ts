/**
 * Form validation utilities for Kape Digital
 * Provides client-side validation before submission
 */

/**
 * Form validation utilities for Kape Digital.
 * Shared between the browser and server.
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface ContactFormData {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  date?: string;
  time?: string;
  website?: string;
}

const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?\d[\d\s\-().]{6,}$/,
  url: /^https?:\/\/.+/, 
};

export function validateEmail(email: string): boolean {
  return patterns.email.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  return patterns.phone.test(phone.trim());
}

export function validateURL(url: string): boolean {
  return patterns.url.test(url.trim());
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name?.trim()) {
    errors.name = 'El nombre es requerido';
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!data.email?.trim()) {
    errors.email = 'El correo es requerido';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Ingresa un correo válido';
  }

  if (data.service && data.service.trim().length < 2) {
    errors.service = 'Seleccioná un servicio válido';
  }

  if (!data.message?.trim()) {
    errors.message = 'El mensaje es requerido';
  } else if (data.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }

  if ((data.date && !data.time) || (!data.date && data.time)) {
    errors.date = 'Fecha y hora deben completarse juntas';
    errors.time = 'Fecha y hora deben completarse juntas';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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

    if ((data.date && !data.time) || (!data.date && data.time)) {
      errors.date = 'Fecha y hora deben completarse juntas';
      errors.time = 'Fecha y hora deben completarse juntas';
    }
