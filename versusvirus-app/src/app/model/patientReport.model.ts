import { Exposition } from './exposition.model';
import { Grunderkrankung } from './grunderkrankung.model';
import { Labor } from './labor.model';
import { Manifestation } from './manifestation.model';
import { Patient } from './patient.model';
import { Verlauf } from './verlauf.model';

export class PatientReport {
    public patient: Patient;
    public manifestation: Manifestation;
    public grunderkrankung: Grunderkrankung;
    public verlauf: Verlauf;
    public exposition: Exposition;
    public labor: Labor;
    public bemerkungen: string;
    public _id: string;

    constructor() {
      this.patient = new Patient();
      this.manifestation = new Manifestation();
      this.grunderkrankung = new Grunderkrankung();
      this.verlauf = new Verlauf();
      this.exposition = new Exposition();
      this.labor = new Labor();
      this.bemerkungen = '';
      this._id = '';
    }
}
