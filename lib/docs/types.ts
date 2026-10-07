export type ChangelogEntry = {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  note: string;
};

export type DocPageMeta = {
  /** Same as the file name and the URL slug. Used by the registry and `@docs-sync` markers. */
  id: string;
  title: string;
  summary: string;
  /** Any order: consumers sort by date. A new entry is what triggers the email. */
  changelog: ChangelogEntry[];
};
