
export type Language = 'en' | 'ar';

export interface TranslationSet {
  nav: {
    courses: string;
    workshops: string;
    gallery: string;
    about: string;
    join: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    explore: string;
    showcase: string;
  };
  stats: {
    activeStudents: string;
    studios: string;
    mentors: string;
    success: string;
  };
  courses: {
    title: string;
    subtitle: string;
    viewAll: string;
    modules: string;
    course1: string;
    desc1: string;
    price1: string;
    course2: string;
    desc2: string;
    price2: string;
    course3: string;
    desc3: string;
    price3: string;
  };
  workshops: {
    title: string;
    subtitle: string;
    register: string;
    maquette: string;
    maquetteDesc: string;
    ai: string;
    aiDesc: string;
    revit: string;
    revitDesc: string;
    d5: string;
    d5Desc: string;
    photoshop: string;
    photoshopDesc: string;
    davinci: string;
    davinciDesc: string;
  };
  about: {
    missionBadge: string;
    title: string;
    bio: string;
    location: string;
    founderName: string;
  };
  cta: {
    telegram: string;
    title: string;
    description: string;
    placeholder: string;
    subscribe: string;
  };
  footer: {
    desc: string;
    foundation: string;
    resources: string;
    contact: string;
    rights: string;
    privacy: string;
    terms: string;
  };
}
