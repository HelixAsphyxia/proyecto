import { Routes } from '@angular/router';
import { resumeReadyGuard } from '@core/guards/resume-ready.guard';

/**
 * Rutas raíz de la aplicación.
 * La feature del CV se carga de forma diferida (lazy loading) mediante loadComponent
 * y se protege con un guard CanActivate, al estilo de las features enrutables del proyecto de referencia.
 */
export const routes: Routes = [
	{
		path: '',
		canActivate: [resumeReadyGuard],
		loadComponent: () => import('@features/resume/resume-page.component').then((m) => m.ResumePageComponent)
	},
	{
		path: '**',
		redirectTo: ''
	}
];
