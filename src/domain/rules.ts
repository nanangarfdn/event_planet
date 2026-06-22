// Business rules from requirement.md, as pure functions (the testable spec).
import type {Role} from './types';

export const FREE_CREDITS = 1000; // granted on first join
export const EVENT_COST = 10; // credits per event creation
export const NORMAL_MAX_PAX = 49; // normal users: 49 and below
export const DOC_THRESHOLD = 50; // >50 pax needs extra documentation

/** Max pax a role may create. Verified (business) users are uncapped. */
export function maxPaxForRole(role: Role): number {
  return role === 'verified' || role === 'admin' ? Infinity : NORMAL_MAX_PAX;
}

/** Can the user pay the event-creation fee? */
export function canAffordEvent(credits: number): boolean {
  return credits >= EVENT_COST;
}

/** Events larger than the threshold must upload supporting documents. */
export function needsDocs(pax: number): boolean {
  return pax > DOC_THRESHOLD;
}

/** Is this role allowed to create an event for the given pax count? */
export function canCreateForPax(role: Role, pax: number): boolean {
  return pax > 0 && pax <= maxPaxForRole(role);
}
