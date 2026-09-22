import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ProjectItem } from '@core/models/resume.model';
import { ResumeService } from '@core/services/resume/resume.service';
import { SectionComponent } from '@shared/components/section/section.component';
import { HighlightPipe } from '@shared/pipes/highlight.pipe';
import { TruncatePipe } from '@shared/pipes/truncate.pipe';

/**
 * Sección de proyectos con buscador reactivo.
 * Consume ResumeService (signals derivados) y resalta coincidencias con HighlightPipe.
 */
@Component({
	selector: 'app-projects',
	standalone: true,
	imports: [SectionComponent, HighlightPipe, TruncatePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<app-section title="Proyectos" anchor="proyectos">
			<div class="mb-6">
				<label class="relative block">
					<span class="sr-only">Buscar proyectos</span>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true">
						<circle cx="11" cy="11" r="7" />
						<path d="m21 21-4.3-4.3" />
					</svg>
					<input
						type="search"
						[value]="term()"
						(input)="onSearch($event)"
						placeholder="Buscar por nombre, descripción o tecnología…"
						class="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
					/>
				</label>
			</div>

			@if (projects().length) {
				<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					@for (project of projects(); track project.name) {
						<article class="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
							<h3 class="font-semibold text-slate-900 dark:text-white" [innerHTML]="project.name | highlight: term()"></h3>
							<p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300" [innerHTML]="project.description | truncate: 120 | highlight: term()"></p>
							<div class="mt-4 flex flex-wrap gap-1.5">
								@for (tag of project.tags; track tag) {
									<span class="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300" [innerHTML]="tag | highlight: term()"></span>
								}
							</div>
							@if (project.url) {
								<a [href]="project.url" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition group-hover:gap-2 hover:text-blue-800 dark:text-blue-400">
									Ver proyecto
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4" aria-hidden="true">
										<path d="M5 12h14M13 6l6 6-6 6" />
									</svg>
								</a>
							}
						</article>
					}
				</div>
			} @else {
				<p class="rounded-lg border border-dashed border-slate-300 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">No se encontraron proyectos para «{{ term() }}».</p>
			}
		</app-section>
	`
})
export class ProjectsComponent {
	private readonly resumeService: ResumeService = inject(ResumeService);

	protected readonly projects: Signal<readonly ProjectItem[]> = this.resumeService.filteredProjects;
	protected readonly term: Signal<string> = this.resumeService.currentTerm;

	protected onSearch(event: Event): void {
		const value: string = (event.target as HTMLInputElement).value;

		this.resumeService.search(value);
	}
}
