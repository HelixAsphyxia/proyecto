import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

interface NavItem {
  readonly label: string;
  readonly anchor: string;
}

/** Barra de navegación superior fija con anclas y botón de tema. */
@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/80">
      <div class="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" class="text-sm font-bold tracking-tight text-slate-900 dark:text-white">{{ brand() }}</a>
        <div class="flex items-center gap-1">
          <ul class="hidden items-center gap-1 sm:flex">
            @for (item of navItems; track item.anchor) {
              <li>
                <a
                  [href]="'#' + item.anchor"
                  class="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {{ item.label }}
                </a>
              </li>
            }
          </ul>
          <button
            type="button"
            (click)="toggleTheme.emit()"
            [attr.aria-label]="isDark() ? 'Activar modo claro' : 'Activar modo oscuro'"
            class="ml-1 flex h-9 w-9 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            @if (isDark()) {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            } @else {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              </svg>
            }
          </button>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  readonly brand = input.required<string>();
  readonly isDark = input.required<boolean>();
  readonly toggleTheme = output<void>();

  protected readonly navItems: readonly NavItem[] = [
    { label: 'Experiencia', anchor: 'experiencia' },
    { label: 'Educación', anchor: 'educacion' },
    { label: 'Habilidades', anchor: 'habilidades' },
    { label: 'Proyectos', anchor: 'proyectos' },
    { label: 'Contacto', anchor: 'contacto' },
  ];
}
