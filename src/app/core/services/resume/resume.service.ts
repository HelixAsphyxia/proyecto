import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { RESUME_DATA } from '@core/data/resume.data';
import { ProjectItem, Resume } from '@core/models/resume.model';
import { BaseDataService } from '@core/services/api/base-data.service';

/**
 * Servicio de dominio del currículum, análogo a un servicio de datos que
 * extiende BaseApiService en el proyecto de referencia.
 *
 * Expone el CV como Observable (capa de datos) y como signals derivados para
 * la vista, e implementa un filtro reactivo de proyectos para el buscador.
 */
@Injectable({
	providedIn: 'root'
})
export class ResumeService extends BaseDataService {
	private readonly searchTerm: WritableSignal<string> = signal<string>('');

	/** Fuente de datos como Observable, simulando una llamada al backend. */
	public readonly resume$: Observable<Resume> = this.read<Resume>(RESUME_DATA);

	/** CV expuesto como signal para consumo directo en las vistas. */
	public readonly resume: Signal<Resume> = toSignal(this.resume$, { initialValue: RESUME_DATA });

	/** Proyectos filtrados en vivo según el término de búsqueda. */
	public readonly filteredProjects: Signal<readonly ProjectItem[]> = computed(() => {
		const term: string = this.utilities.normalize(this.searchTerm());
		const projects: readonly ProjectItem[] = this.resume().projects;

		if (!this.utilities.hasContent(term)) {
			return projects;
		}

		return projects.filter((project) => this.matchesProject(project, term));
	});

	/** Término de búsqueda actual, para resaltar coincidencias en la vista. */
	public readonly currentTerm: Signal<string> = computed(() => this.searchTerm());

	public search(term: string): void {
		this.searchTerm.set(term ?? '');
	}

	private matchesProject(project: ProjectItem, normalizedTerm: string): boolean {
		const haystack: string = this.utilities.normalize([project.name, project.description, ...project.tags].join(' '));

		return haystack.includes(normalizedTerm);
	}
}
