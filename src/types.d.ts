export interface GameStage {
  title: string;
  icon: string;
  color: string;
  classes: PlayerClass[];
}

export interface PlayerClass {
  class: string;
  weapons: Weapon[];
  armor: Armor[];
  accessories: Accessory[];
  buffsPotionsAmmo: BuffsPotionsAmmo[];
}

export interface Weapon {
  name: string;
  icon: string;
  link: string;
  attributes?: string[];
}

export interface Armor {
  name: string;
  icon: string;
  link: string;
  attributes?: string[];
}

export interface Accessory {
  name: string;
  icon: string;
  link: string;
  attributes?: string[];
}

export interface BuffsPotionsAmmo {
  name: string;
  icon: string;
  link: string;
}
