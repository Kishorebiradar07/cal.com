/**
 * Validate a single email address
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Parse comma-separated emails and return validated emails
 */
export const parseCommaSeparatedEmails = (input: string): string[] => {
  return input
    .split(",")
    .map((email) => email.trim())
    .filter((email) => email.length > 0 && validateEmail(email));
};

/**
 * Check if email already exists in list
 */
export const isDuplicateEmail = (
  email: string,
  existingEmails: string[],
  existingUserEmails: string[] = []
): boolean => {
  const normalizedEmail = email.toLowerCase();
  return (
    existingEmails.some((e) => e.toLowerCase() === normalizedEmail) ||
    existingUserEmails.some((e) => e.toLowerCase() === normalizedEmail)
  );
};

/**
 * Get formatted label for email option
 */
export const getEmailLabel = (email: string): string => {
  return `${email} (invite)`;
};
