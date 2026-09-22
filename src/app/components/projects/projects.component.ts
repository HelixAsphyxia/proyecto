import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProjectItem } from '../../models/resume.model';
import { SectionComponent } from '../section/section.component';

/** Sección de proyectos destacados en formato de tarjetas. */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-section title="Proyectos" anchor="proyectos">
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        @for (project of items(); track project.name) {
          <article class="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <h3 class="font-semibold text-slate-900 dark:text-white">{{ project.name }}</h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {{ project.description }}
            </p>
            <div class="mt-4 flex flex-wrap gap-1.5">
              @for (tag of project.tags; track tag) {
                <span class="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {{ tag }}
                </span>
              }
            </div>
            @if (project.url) {
              <a
                [href]="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition group-hover:gap-2 hover:text-blue-800 dark:text-blue-400"
              >
                Ver proyecto
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            }
          </article>
        }
      </div>
    </app-section>
  `,
})
export class ProjectsComponent {
  readonly items = input.required<readonly ProjectItem[]>();
}
