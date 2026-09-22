import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { PreferencesStorageService } from '@core/services/storage/preferences-storage.service';

type Theme = 'light' | 'dark';

/**
 * Gestiona el tema claro/oscuro.
 * Compone PreferencesStorageService para persistir la preferencia y sincroniza
 * la clase `dark` en el elemento raíz del documento mediante un effect.
 */
@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	private readonly document: Document = inject(DOCUMENT);
	private readonly storage: PreferencesStorageService = inject(PreferencesStorageService);
	private readonly theme: WritableSignal<Theme> = signal<Theme>(this.resolveInitialTheme());

	public readonly isDark: Signal<boolean> = computed(() => this.theme() === 'dark');

	constructor() {
		effect(() => {
			const current: Theme = this.theme();

			this.document.documentElement.classList.toggle('dark', current === 'dark');
			this.storage.theme = current;
		});
	}

	public toggle(): void {
		this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
	}

	private resolveInitialTheme(): Theme {
		const stored: Theme | null = this.storage.theme;

		if (stored) {
			return stored;
		}

		const prefersDark: boolean = this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

		return prefersDark ? 'dark' : 'light';
	}
}
