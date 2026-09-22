import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RESUME_DATA } from './data/resume.data';
import { ThemeService } from './services/theme.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';

/** Componente raíz: compone las secciones del CV y conecta el tema. */
@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    HeroComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  template: `
    <app-navbar
      [brand]="resume.profile.fullName"
      [isDark]="theme.isDark()"
      (toggleTheme)="theme.toggle()"
    />

    <main>
      <app-hero [profile]="resume.profile" />
      <app-experience [items]="resume.experience" />
      <app-education [items]="resume.education" />
      <app-skills [groups]="resume.skillGroups" />
      <app-projects [items]="resume.projects" />
    </main>

    <app-contact [profile]="resume.profile" />
  `,
})
export class AppComponent {
  protected readonly resume = RESUME_DATA;
  protected readonly theme = inject(ThemeService);
}
