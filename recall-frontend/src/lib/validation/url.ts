// Accepts http(s) URLs with a domain, with or without a scheme.
const URL_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

export function isValidUrl(value: string): boolean {
  return URL_PATTERN.test(value.trim());
}

export function validateUrl(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return "URL is required.";
  }
  if (!isValidUrl(trimmed)) {
    return "Please enter a valid URL.";
  }
  return null;
}
