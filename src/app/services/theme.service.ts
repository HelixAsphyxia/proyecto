import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'cv-theme';

/**
 * Gestiona el tema claro/oscuro.
 * Persiste la preferencia en localStorage y sincroniza la clase `dark`
 * en el elemento raíz del documento mediante un effect.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly theme = signal<Theme>(this.resolveInitialTheme());

  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => {
      const root = this.document.documentElement;
      const dark = this.theme() === 'dark';
      root.classList.toggle('dark', dark);
      this.safeSetStorage(this.theme());
    });
  }

  toggle(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  private resolveInitialTheme(): Theme {
    const stored = this.safeGetStorage();
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    const prefersDark = this.document.defaultView?.matchMedia?.(
      '(prefers-color-scheme: dark)',
    ).matches;
    return prefersDark ? 'dark' : 'light';
  }

  private safeGetStorage(): string | null {
    try {
      return this.document.defaultView?.localStorage.getItem(STORAGE_KEY) ?? null;
    } catch {
      return null;
    }
  }

  private safeSetStorage(value: Theme): void {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* Almacenamiento no disponible: se ignora de forma segura. */
    }
  }
}
