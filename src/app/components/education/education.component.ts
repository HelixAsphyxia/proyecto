import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EducationItem } from '../../models/resume.model';
import { SectionComponent } from '../section/section.component';

/** Sección de formación académica. */
@Component({
  selector: 'app-education',
  standalone: true,
  imports: [SectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-section title="Educación" anchor="educacion">
      <div class="grid gap-4 sm:grid-cols-2">
        @for (item of items(); track item.institution + item.startDate) {
          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div class="flex items-baseline justify-between gap-2">
              <h3 class="font-semibold text-slate-900 dark:text-white">{{ item.degree }}</h3>
              <span class="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
                {{ item.startDate }} — {{ item.endDate }}
              </span>
            </div>
            <p class="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">{{ item.institution }}</p>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ item.description }}</p>
          </article>
        }
      </div>
    </app-section>
  `,
})
export class EducationComponent {
  readonly items = input.required<readonly EducationItem[]>();
}
