import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkillGroup } from '../../models/resume.model';
import { SectionComponent } from '../section/section.component';

/** Sección de habilidades agrupadas por categoría con barras de nivel. */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-section title="Habilidades" anchor="habilidades">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @for (group of groups(); track group.category) {
          <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 class="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {{ group.category }}
            </h3>
            <ul class="space-y-3">
              @for (skill of group.skills; track skill.name) {
                <li>
                  <div class="mb-1 flex items-center justify-between text-sm">
                    <span class="font-medium text-slate-700 dark:text-slate-200">{{ skill.name }}</span>
                    <span class="text-xs text-slate-400">{{ skill.level }}%</span>
                  </div>
                  <div
                    class="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
                    role="progressbar"
                    [attr.aria-valuenow]="skill.level"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    [attr.aria-label]="skill.name"
                  >
                    <div
                      class="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-700"
                      [style.width.%]="skill.level"
                    ></div>
                  </div>
                </li>
              }
            </ul>
          </div>
        }
      </div>
    </app-section>
  `,
})
export class SkillsComponent {
  readonly groups = input.required<readonly SkillGroup[]>();
}
