export interface Employee {
    id: string;
    name: string;
    nik: string; // NIK Karyawan (TMJ-123, etc)
    nikPersonal: string; // NIK Personal (KTP)
    position: string;
    status: string;
    joiningYear: string; // dd/mm/yyyy format
    dateOfBirth: string;
    placeOfBirth: string;
    religion: string;
    gender: string;
    department: string;
    address: string;
    phoneNumber: string;
    email: string;
    photoUrl?: string;

    // 🔥 NEW FIELDS
    bankName: string; // Nama Bank
    accountNumber: string; // Nomor Rekening
    npwp: string; // Nomor NPWP (required)
    maritalStatus: string; // Status Pernikahan (required)
}

export interface WorkBonus {
    eligible: boolean;
    bonusCount: number;
    yearsOfService: number;
    nextBonusDate?: string;
    nextBonusIn?: number;
    lastBonusDate?: string;
    upcomingBonusDates?: string[];
}
