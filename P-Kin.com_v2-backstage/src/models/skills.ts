export interface Skill {
    language: string;
    level: number;
}

export interface SkillState {
    skills: Skill[];
    otherTechs: string[];
}
