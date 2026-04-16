const CHECKLIST_KEY = "ddok_checklist";

export type ChecklistStatus = "미체크" | "구매완료" | "보류" | "생략";

export interface ChecklistItem {
  productId: string;
  status: ChecklistStatus;
  updatedAt: string;
}

export function getChecklist(): ChecklistItem[] {
  try {
    return JSON.parse(localStorage.getItem(CHECKLIST_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveChecklist(list: ChecklistItem[]) {
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("checklist-updated"));
}

export function getChecklistStatus(productId: string): ChecklistStatus {
  const item = getChecklist().find(c => c.productId === productId);
  return item?.status || "미체크";
}

export function setChecklistStatus(productId: string, status: ChecklistStatus) {
  const list = getChecklist();
  const existing = list.find(c => c.productId === productId);
  if (existing) {
    existing.status = status;
    existing.updatedAt = new Date().toISOString();
  } else {
    list.push({ productId, status, updatedAt: new Date().toISOString() });
  }
  saveChecklist(list);
}

export function getChecklistStats(productIds: string[]) {
  const list = getChecklist();
  const total = productIds.length;
  let done = 0, pending = 0, hold = 0, skip = 0;
  for (const id of productIds) {
    const item = list.find(c => c.productId === id);
    const s = item?.status || "미체크";
    if (s === "구매완료") done++;
    else if (s === "보류") hold++;
    else if (s === "생략") skip++;
    else pending++;
  }
  return { total, done, pending, hold, skip, completionRate: total > 0 ? Math.round((done / total) * 100) : 0 };
}

export function initChecklistForProducts(productIds: string[]) {
  const list = getChecklist();
  const existingIds = new Set(list.map(c => c.productId));
  let changed = false;
  for (const id of productIds) {
    if (!existingIds.has(id)) {
      list.push({ productId: id, status: "미체크", updatedAt: new Date().toISOString() });
      changed = true;
    }
  }
  if (changed) saveChecklist(list);
}
