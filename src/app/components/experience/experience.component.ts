import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ExperienceItem } from '../../models/resume.model';
import { SectionComponent } from '../section/section.component';

/** Sección de experiencia laboral en formato línea de tiempo. */
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-section title="Experiencia" anchor="experiencia">
      <ol class="relative space-y-8 border-l border-slate-200 pl-6 dark:border-slate-700">
        @for (item of items(); track item.company + item.startDate) {
          <li class="relative">
            <span class="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 ring-4 ring-slate-50 dark:ring-slate-950"></span>
            <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ item.position }}</h3>
              <span class="text-sm font-medium text-slate-500 dark:text-slate-400">
                {{ item.startDate }} — {{ item.endDate }}
              </span>
            </div>
            <p class="text-sm font-medium text-blue-600 dark:text-blue-400">{{ item.company }}</p>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ item.description }}</p>
            @if (item.highlights.length) {
              <ul class="mt-3 space-y-1.5">
                @for (highlight of item.highlights; track highlight) {
                  <li class="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 h-4 w-4 shrink-0 text-blue-500" aria-hidden="true">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span>{{ highlight }}</span>
                  </li>
                }
              </ul>
            }
          </li>
        }
      </ol>
    </app-section>
  `,
})
export class ExperienceComponent {
  readonly items = input.required<readonly ExperienceItem[]>();
}
