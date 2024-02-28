const H_IN_MS = 3600 * 1000;

export function toHourFormat(time: number | null) {
  return time != null
    ? new Date(time * H_IN_MS).toISOString().substring(11, 16)
    : '';
}
