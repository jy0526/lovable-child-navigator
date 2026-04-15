const STORAGE_KEY = "ddok_child_birthday";

export function getStoredBirthday(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

export function storeBirthday(dateStr: string) {
  localStorage.setItem(STORAGE_KEY, dateStr);
}

export function clearBirthday() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getChildMonths(): number | null {
  const bday = getStoredBirthday();
  if (!bday) return null;
  const months = Math.floor((Date.now() - new Date(bday).getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  if (months < 0 || months > 84) return null;
  return months;
}
