export interface Vaccine {
  id: number;
  name: string;
  description: string;
  no_of_doses: string;
  is_mandatory: boolean;
  image_link: string;
  userFiles: any;
}

export interface VaccineForm {
  id: number;
  name: string;
  description: any;
  no_of_doses: string;
  is_mandatory: boolean;
  userFiles: any;
}

export interface VaccinesResponse {
  vaccines: Vaccine[];
  message: string;
}

export interface VaccineResponse {
  vaccine: Vaccine;
  message: string;
  vaccine_id?: number;
}

export interface IVaccineState {
  vaccines: Vaccine[];
  vaccinesLoading: boolean;
  vaccinesError: string;

  vaccine: Vaccine | null | undefined;
  vaccineLoading: boolean;
  vaccineError: string;

  creating: boolean;
  createError: "";

  deleting: boolean;
  deleteError: "";

  editing: boolean;
  editError: "";
}

export interface IVaccineAction {
  createVaccine: (vaccine: Vaccine) => void;
  updateVaccine: (vaccine_id: number) => void;
  fetchVaccines: () => void;
  fetchVaccine: (vaccine_id: number) => void;
  deleteVaccine: (vaccine_id: number) => void;
}
