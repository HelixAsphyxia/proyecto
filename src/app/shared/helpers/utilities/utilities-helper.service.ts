import { Injectable } from '@angular/core';

/**
 * Servicio de utilidades transversales, análogo a UtilitiesHelperService del proyecto de referencia.
 * Agrupa comprobaciones y helpers reutilizables sin estado.
 */
@Injectable({
	providedIn: 'root'
})
export class UtilitiesHelperService {
	/** Indica si un valor tiene contenido útil (no vacío, no nulo, no objeto vacío). */
	public hasContent(value: unknown): boolean {
		if (value === null || value === undefined) {
			return false;
		}

		if (typeof value === 'string') {
			return value.trim().length > 0;
		}

		if (Array.isArray(value)) {
			return value.length > 0;
		}

		if (typeof value === 'object') {
			return Object.keys(value as object).length > 0;
		}

		return true;
	}

	/** Normaliza texto para comparaciones: minúsculas y sin acentos. */
	public normalize(text: string): string {
		return (text ?? '')
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');
	}

	/** Desplaza la vista suavemente hasta el elemento con el id indicado. */
	public scrollToSection(anchor: string): void {
		const element: HTMLElement | null = document.getElementById(anchor);

		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
}
