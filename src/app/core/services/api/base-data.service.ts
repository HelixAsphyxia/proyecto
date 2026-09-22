import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UtilitiesHelperService } from '@shared/helpers/utilities/utilities-helper.service';

/**
 * Clase base abstracta para servicios de datos, análoga a BaseApiService del
 * proyecto de referencia: centraliza dependencias comunes (helpers) como
 * `protected` y ofrece un método simulado de acceso a datos.
 *
 * En un proyecto con backend, aquí se inyectaría el cliente HTTP y la URL base.
 * Al ser un CV estático, la lectura se simula con un Observable diferido.
 */
export abstract class BaseDataService {
	protected readonly utilities: UtilitiesHelperService = inject(UtilitiesHelperService);

	/** Simula una lectura asíncrona de datos con una latencia configurable. */
	protected read<T>(source: T, latencyMs: number = 0): Observable<T> {
		return of(source).pipe(delay(latencyMs));
	}
}
