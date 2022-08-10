export interface AboutResource {
  introduction: {
    en: string;
    kr: string;
  };
  skills: Record<string, number>;
  techCloud: string[];
}
