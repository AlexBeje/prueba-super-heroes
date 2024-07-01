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
  power: number;
  speed: number;
  combat?: number;
  durability?: number;
  intelligence?: number;
  strength?: number;
}

export interface Appearance {
  eyeColor?: string;
  gender?: string;
  hairColor?: string;
  height?: string[];
  weight?: string[];
  race?: string;
}

export interface Biography {
  aliases: string[];
  alignment: string;
  fullName?: string;
  alterEgos?: string;
  placeOfBirth?: string;
  firstAppearance?: string;
  publisher?: string;
}

export interface Work {
  base?: string;
  occupation?: string;
}

export interface Connections {
  groupAffiliation?: string;
  relatives?: string;
}

export interface Images {
  xs?: string;
  sm?: string;
  md?: string;
  lg: string;
}

export interface DialogData {
  hero: Hero;
} 