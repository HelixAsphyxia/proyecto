/**
 * Modelo de datos del currículum.
 * Todas las secciones del CV se tipan aquí para mantener los datos
 * desacoplados de la vista y facilitar su reutilización.
 */

export interface SocialLink {
	readonly label: string;
	readonly url: string;
	/** Nombre del icono (usado por el componente para renderizar el SVG). */
	readonly icon: 'github' | 'linkedin' | 'email' | 'website' | 'phone';
}

export interface Profile {
	readonly fullName: string;
	readonly role: string;
	readonly location: string;
	readonly summary: string;
	readonly avatarUrl: string;
	readonly socials: readonly SocialLink[];
}

export interface ExperienceItem {
	readonly company: string;
	readonly position: string;
	readonly startDate: string;
	readonly endDate: string;
	readonly description: string;
	readonly highlights: readonly string[];
}

export interface EducationItem {
	readonly institution: string;
	readonly degree: string;
	readonly startDate: string;
	readonly endDate: string;
	readonly description: string;
}

export interface SkillGroup {
	readonly category: string;
	readonly skills: readonly Skill[];
}

export interface Skill {
	readonly name: string;
	/** Nivel de dominio de 0 a 100. */
	readonly level: number;
}

export interface ProjectItem {
	readonly name: string;
	readonly description: string;
	readonly tags: readonly string[];
	readonly url?: string;
}

export interface Resume {
	readonly profile: Profile;
	readonly experience: readonly ExperienceItem[];
	readonly education: readonly EducationItem[];
	readonly skillGroups: readonly SkillGroup[];
	readonly projects: readonly ProjectItem[];
}
