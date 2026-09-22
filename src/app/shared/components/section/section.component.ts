import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Contenedor reutilizable de sección con título y ancla de navegación.
 * El contenido se proyecta mediante <ng-content>.
 */
@Component({
	selector: 'app-section',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<section [id]="anchor()" class="scroll-mt-20 py-12 sm:py-16">
			<div class="mx-auto max-w-4xl px-4 sm:px-6">
				<div class="mb-8 flex items-center gap-3">
					<h2 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
						{{ title() }}
					</h2>
					<span class="h-px flex-1 bg-gradient-to-r from-blue-500/60 to-transparent"></span>
				</div>
				<ng-content />
			</div>
		</section>
	`
})
export class SectionComponent {
	readonly title = input.required<string>();
	readonly anchor = input.required<string>();
}
