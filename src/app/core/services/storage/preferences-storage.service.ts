import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

type ThemePreference = 'light' | 'dark';

const THEME_KEY = 'cv-theme';
const SEARCH_KEY = 'cv-last-search';

/**
 * Centraliza el acceso a la persistencia del navegador (localStorage),
 * análogo a StorageService del proyecto de referencia: expone getters/setters
 * tipados por preferencia y encapsula el manejo de errores de almacenamiento.
 */
@Injectable({
	providedIn: 'root'
})
export class PreferencesStorageService {
	private readonly document: Document = inject(DOCUMENT);

	public set theme(value: ThemePreference) {
		this.setItem(THEME_KEY, value);
	}

	public get theme(): ThemePreference | null {
		const stored: string | null = this.getItem(THEME_KEY);

		return stored === 'light' || stored === 'dark' ? stored : null;
	}

	public set lastSearch(value: string) {
		this.setItem(SEARCH_KEY, value);
	}

	public get lastSearch(): string {
		return this.getItem(SEARCH_KEY) ?? '';
	}

	public clear(): void {
		this.removeItem(THEME_KEY);
		this.removeItem(SEARCH_KEY);
	}

	private setItem(key: string, value: string): void {
		try {
			this.document.defaultView?.localStorage.setItem(key, value);
		} catch {
			/* Almacenamiento no disponible: se ignora de forma segura. */
		}
	}

	private getItem(key: string): string | null {
		try {
			return this.document.defaultView?.localStorage.getItem(key) ?? null;
		} catch {
			return null;
		}
	}

	private removeItem(key: string): void {
		try {
			this.document.defaultView?.localStorage.removeItem(key);
		} catch {
			/* Almacenamiento no disponible: se ignora de forma segura. */
		}
	}
}
