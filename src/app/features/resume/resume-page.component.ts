import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Resume } from '@core/models/resume.model';
import { ResumeService } from '@core/services/resume/resume.service';
import { NavbarComponent } from '@features/resume/components/navbar/navbar.component';
import { HeroComponent } from '@features/resume/components/hero/hero.component';
import { ExperienceComponent } from '@features/resume/components/experience/experience.component';
import { EducationComponent } from '@features/resume/components/education/education.component';
import { SkillsComponent } from '@features/resume/components/skills/skills.component';
import { ProjectsComponent } from '@features/resume/components/projects/projects.component';
import { ContactComponent } from '@features/resume/components/contact/contact.component';
import { ThemeService } from '@core/services/theme.service';

/** Página principal de la feature CV: compone las secciones y conecta servicios. */
@Component({
	selector: 'app-resume-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NavbarComponent, HeroComponent, ExperienceComponent, EducationComponent, SkillsComponent, ProjectsComponent, ContactComponent],
	template: `
		<app-navbar [brand]="resume().profile.fullName" [isDark]="theme.isDark()" (toggleTheme)="theme.toggle()" />

		<main>
			<app-hero [profile]="resume().profile" />
			<app-experience [items]="resume().experience" />
			<app-education [items]="resume().education" />
			<app-skills [groups]="resume().skillGroups" />
			<app-projects />
		</main>

		<app-contact [profile]="resume().profile" />
	`
})
export class ResumePageComponent {
	private readonly resumeService: ResumeService = inject(ResumeService);
	protected readonly theme: ThemeService = inject(ThemeService);
	protected readonly resume: Signal<Resume> = this.resumeService.resume;
}
