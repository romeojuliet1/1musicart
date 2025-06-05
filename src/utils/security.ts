
// Security utilities for input validation and sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Rate limiting for form submissions
const rateLimitMap = new Map<string, number>();

export const isRateLimited = (key: string, limitPerMinute: number = 5): boolean => {
  const now = Date.now();
  const windowStart = now - 60000; // 1 minute window
  
  const attempts = rateLimitMap.get(key) || 0;
  
  if (attempts >= limitPerMinute) {
    return true;
  }
  
  rateLimitMap.set(key, attempts + 1);
  
  // Clean up old entries
  setTimeout(() => {
    rateLimitMap.delete(key);
  }, 60000);
  
  return false;
};
