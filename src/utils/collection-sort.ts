/**
 * Collection sorting utilities for consistent ordering across pages.
 * Provides reusable comparators for content collection items.
 */

interface WithOrder {
  data: {order?: number};
}

interface WithYear {
  data: {year: number};
}

interface WithDate {
  data: {publishDate: Date};
}

interface WithGrantOrFilingDate {
  data: {grantDate?: Date; filingDate: Date};
}

/**
 * Sort by order field (ascending). Items without order go last.
 * @example sortedItems = items.sort(byOrder);
 */
export function byOrder<T extends WithOrder>(a: T, b: T): number {
  return (a.data.order ?? 999) - (b.data.order ?? 999);
}

/**
 * Sort by year field (descending - newest first).
 * @example sortedItems = items.sort(byYearDesc);
 */
export function byYearDesc<T extends WithYear>(a: T, b: T): number {
  return b.data.year - a.data.year;
}

/**
 * Sort by publishDate (descending - newest first).
 * @example sortedItems = items.sort(byPublishDateDesc);
 */
export function byPublishDateDesc<T extends WithDate>(a: T, b: T): number {
  return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}

/**
 * Sort by grant date or filing date (descending - newest first).
 * Uses grantDate if present, otherwise filingDate.
 * @example sortedPatents = patents.sort(byPatentDateDesc);
 */
export function byPatentDateDesc<T extends WithGrantOrFilingDate>(
  a: T,
  b: T,
): number {
  const dateA = a.data.grantDate || a.data.filingDate;
  const dateB = b.data.grantDate || b.data.filingDate;
  return dateB.getTime() - dateA.getTime();
}

/**
 * Sort by order if both have it, otherwise by year (descending).
 * @example sortedPubs = publications.sort(byOrderOrYearDesc);
 */
export function byOrderOrYearDesc<T extends WithOrder & WithYear>(
  a: T,
  b: T,
): number {
  if (a.data.order !== undefined && b.data.order !== undefined) {
    return a.data.order - b.data.order;
  }
  return b.data.year - a.data.year;
}
