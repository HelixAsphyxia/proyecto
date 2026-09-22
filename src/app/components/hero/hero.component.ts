import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Profile } from '../../models/resume.model';
import { SocialIconComponent } from '../social-icon/social-icon.component';

/** Cabecera principal del CV: avatar, nombre, rol, ubicación, resumen y enlaces. */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SocialIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-800 text-white">
      <div class="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]"></div>
      <div class="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-24">
        <img
          [src]="profile().avatarUrl"
          [alt]="'Foto de ' + profile().fullName"
          class="h-32 w-32 rounded-full border-4 border-white/80 object-cover shadow-xl sm:h-40 sm:w-40"
        />
        <div class="space-y-2">
          <h1 class="text-3xl font-extrabold tracking-tight sm:text-5xl">{{ profile().fullName }}</h1>
          <p class="text-lg font-medium text-blue-100 sm:text-xl">{{ profile().role }}</p>
          <p class="inline-flex items-center gap-1.5 text-sm text-blue-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {{ profile().location }}
          </p>
        </div>
        <p class="max-w-2xl text-balance text-sm leading-relaxed text-blue-50 sm:text-base">
          {{ profile().summary }}
        </p>
        <nav class="flex flex-wrap items-center justify-center gap-3" aria-label="Redes sociales">
          @for (social of profile().socials; track social.url) {
            <a
              [href]="social.url"
              target="_blank"
              rel="noopener noreferrer"
              [attr.aria-label]="social.label"
              [title]="social.label"
              class="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <app-social-icon [icon]="social.icon" />
            </a>
          }
        </nav>
      </div>
    </header>
  `,
})
export class HeroComponent {
  readonly profile = input.required<Profile>();
}
