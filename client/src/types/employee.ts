export interface Employee {
    id: string;
    name: string;
    nik: string; // NIK Karyawan (TMJ-123, etc)
    nikPersonal: string; // NIK Personal (KTP) - NEW
    position: string;
    status: string;
    joiningYear: string; // Changed from number to string (dd/mm/yyyy format)
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
    nextBonusDate?: string; // Changed to exact date
    nextBonusIn?: number; // Days until next bonus
    lastBonusDate?: string;
    upcomingBonusDates?: string[]; // Array of future bonus dates
}
