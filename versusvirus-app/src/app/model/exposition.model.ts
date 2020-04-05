import { ExpositionWie } from './expositionWie.model';

export class Exposition {
    public ch: boolean = false;
    public ausland: string = '';
    public ort: string = '';
    public unbekannt: boolean = false;
    public expositionDatum: Date;
    public wie: ExpositionWie;
    public reisetaetigkeit: boolean = false;
    public medizinPflegePersonal: boolean = false;

    constructor() {
      this.wie = new ExpositionWie();
    }
}
