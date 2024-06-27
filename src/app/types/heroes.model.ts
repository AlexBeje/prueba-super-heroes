export interface Hero {
  biography: Biography;
  id: number;
  images: Images;
  name: string;
  powerstats: Powerstats;
  appearance?: Appearance;
  connections?: Connections;
  slug?: string;
  work?: Work;
}

export interface Powerstats {
  intelligence?: number;
  strength?: number;
  speed: number;
  durability?: number;
  power: number;
  combat?: number;
}

export interface Appearance {
  gender: string;
  race?: string;
  height: string[];
  weight: string[];
  eyeColor: string;
  hairColor: string;
}

export interface Biography {
  fullName?: string;
  alterEgos?: string;
  aliases: string[];
  placeOfBirth?: string;
  firstAppearance?: string;
  publisher?: string;
  alignment: string;
}

export interface Work {
  occupation: string;
  base: string;
}

export interface Connections {
  groupAffiliation: string;
  relatives: string;
}

export interface Images {
  xs?: string;
  sm?: string;
  md?: string;
  lg: string;
}

export interface MyHero {
  id: number;
  name: string;
  imageUrl: string;
  power: string;
  speed: string;
  alias: string | null;
  firstAppearance: string | null;
}

export interface DialogData {
  hero: Hero;
} 