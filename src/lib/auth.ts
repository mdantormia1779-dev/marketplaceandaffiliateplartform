import { RoleType } from '../types';

export interface AuthUser {
  name: string;
  email: string;
  role: RoleType;
}

const KEY = 'nexora_auth_user';
export const AUTH_EVENT = 'nexora-auth-changed';

export function saveAuthUser(user: AuthUser) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as AuthUser) : null;
}

export function clearAuthUser() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

// supplierdashboard/affiliatedashboard/customerdashboard route gulo
// ekhono toiri hoyni — toiri hole ei function ta automatic thik jaygay pathabe
export function getDashboardPath(role: RoleType): string {
  if (role === 'supplier') return '/supplierdashboard';
  if (role === 'affiliate') return '/affiliatedashboard';
  return '/customerdashboard';
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('') || 'U';
}