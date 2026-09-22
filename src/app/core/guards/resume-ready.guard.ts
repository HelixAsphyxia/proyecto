import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ResumeService } from '@core/services/resume/resume.service';
import { UtilitiesHelperService } from '@shared/helpers/utilities/utilities-helper.service';

/**
 * Guard de ruta (CanActivateFn) análogo a hasPermissionGuard del proyecto de referencia:
 * usa inject() para resolver dependencias y decide el acceso según una condición de datos.
 * Aquí valida que el CV tenga contenido antes de permitir la navegación a la feature.
 */
export const resumeReadyGuard: CanActivateFn = (): Observable<boolean> => {
	const resumeService: ResumeService = inject(ResumeService);
	const utilities: UtilitiesHelperService = inject(UtilitiesHelperService);

	return resumeService.resume$.pipe(map((resume) => utilities.hasContent(resume?.profile?.fullName)));
};
