const HISTORY_KEY = 'recent_searches';
const MAX_HISTORY = 6;

export const getSearchHistory = (): string[] => {
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? (JSON.parse(raw) as string[]) : [];
};

export const addSearchHistory = (query: string): string[] => {
  const trimmed = query.trim();
  if (!trimmed) return getSearchHistory();

  const existing = getSearchHistory().filter(
    (item) => item.toLowerCase() !== trimmed.toLowerCase(),
  );
  const updated = [trimmed, ...existing].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return updated;
};
