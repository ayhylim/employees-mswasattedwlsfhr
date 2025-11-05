export interface Employee {
  id: string;
  name: string;
  nik: string;
  position: string;
  status: string;
  joiningYear: number;
  dateOfBirth: string;
  placeOfBirth: string;
  religion: string;
  gender: string;
  department: string;
  address: string;
  phoneNumber: string;
  email: string;
  photoUrl?: string;
}

export interface WorkBonus {
  eligible: boolean;
  bonusCount: number;
  yearsOfService: number;
  nextBonusIn?: number;
}
