import { Pipe, PipeTransform } from '@angular/core';

/**
 * Recorta un texto a una longitud máxima y le añade un sufijo.
 * Pipe puro y standalone, análogo al patrón de pipes utilitarios reutilizables.
 */
@Pipe({
	name: 'truncate',
	standalone: true,
	pure: true
})
export class TruncatePipe implements PipeTransform {
	transform(value: string, limit: number = 100, suffix: string = '…'): string {
		if (!value || value.length <= limit) {
			return value;
		}

		return value.substring(0, limit).trimEnd() + suffix;
	}
}
