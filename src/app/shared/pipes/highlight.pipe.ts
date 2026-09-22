import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Resalta las coincidencias de un término de búsqueda dentro de un texto,
 * envolviéndolas en <mark>. Escapa el HTML de entrada para evitar inyección
 * y devuelve contenido saneado mediante DomSanitizer.
 * Pipe puro y standalone, con inyección vía inject() al estilo del proyecto de referencia.
 */
@Pipe({
	name: 'highlight',
	standalone: true,
	pure: true
})
export class HighlightPipe implements PipeTransform {
	private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

	transform(value: string, term: string): SafeHtml {
		const safeText: string = this.escapeHtml(value ?? '');

		if (!term || !term.trim()) {
			return this.sanitizer.bypassSecurityTrustHtml(safeText);
		}

		const pattern: RegExp = new RegExp(`(${this.escapeRegExp(term.trim())})`, 'gi');
		const highlighted: string = safeText.replace(pattern, '<mark class="rounded bg-yellow-200 px-0.5 text-slate-900 dark:bg-yellow-500/40 dark:text-white">$1</mark>');

		return this.sanitizer.bypassSecurityTrustHtml(highlighted);
	}

	private escapeHtml(text: string): string {
		return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
	}

	private escapeRegExp(text: string): string {
		return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}
}
