export interface IPump {
  id: string;
  name: string;
  maxpressure: number;
  liquidtemperature: number;
  weight: number;
  price: number;
  motorid: string;
  framematerialid: string;
  wheelmaterialid: string;
  description: string;
}

export interface IPumpFullData extends IPump {
  imagename: string;
  image: string;
}
export interface IPumpWithDetails extends IPump{
  motor?: IMotor;
  wheelmaterial?: IMaterial;
  framematerial?: IMaterial;
  file?: File;
}

export interface IMotor {
  name: string;
  power: number;
  current: number;
  nominalspeed: number;
  price: number;
  description: string | null;
  pumps: IPump[];
  id: string;
}

export interface IMaterial {
  name: string;
  description: string | null;
  pumpframematerials: IPump[];
  pumpwheelmaterials: IPump[];
  id: string;
}
