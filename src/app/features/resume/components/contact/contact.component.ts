import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Profile } from '@core/models/resume.model';
import { SocialIconComponent } from '@shared/components/social-icon/social-icon.component';

/** Pie de página con llamada de contacto y enlaces sociales. */
@Component({
	selector: 'app-contact',
	standalone: true,
	imports: [SocialIconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<footer id="contacto" class="scroll-mt-20 border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
			<div class="mx-auto max-w-4xl px-4 text-center sm:px-6">
				<h2 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">¿Trabajamos juntos?</h2>
				<p class="mx-auto mt-2 max-w-lg text-sm text-slate-600 dark:text-slate-300">Estoy abierto a nuevas oportunidades. No dudes en escribirme por cualquiera de estos medios.</p>
				<nav class="mt-6 flex flex-wrap items-center justify-center gap-3" aria-label="Contacto">
					@for (social of profile().socials; track social.url) {
						<a
							[href]="social.url"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:text-slate-200 dark:hover:text-blue-400"
						>
							<app-social-icon [icon]="social.icon" />
							{{ social.label }}
						</a>
					}
				</nav>
				<p class="mt-10 text-xs text-slate-400">© {{ year }} {{ profile().fullName }}. Hecho con Angular y Tailwind CSS.</p>
			</div>
		</footer>
	`
})
export class ContactComponent {
	readonly profile = input.required<Profile>();
	protected readonly year = new Date().getFullYear();
}
