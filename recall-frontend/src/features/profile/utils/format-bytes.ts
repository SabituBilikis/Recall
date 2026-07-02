// Human-readable byte formatting for the Storage screen (e.g. "1.4 GB", "200 MB").
const GB = 1024 * 1024 * 1024;
const MB = 1024 * 1024;

export function formatBytes(bytes: number): string {
  if (bytes >= GB) {
    return `${trim(bytes / GB)} GB`;
  }
  return `${trim(bytes / MB)} MB`;
}

// Whole numbers stay clean; fractions keep one decimal (1.4, not 1.40).
function trim(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

export function storagePercent(usedBytes: number, totalBytes: number): number {
  if (totalBytes <= 0) {
    return 0;
  }
  return Math.round((usedBytes / totalBytes) * 100);
}
