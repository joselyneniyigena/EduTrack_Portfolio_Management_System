export interface Trainer {
    id?: number;
    firstName: string;
    address: string;
    phoneNbr: string;
    lastName: string;
    trainerId: string;
    email: string;
    dob: Date;
    maritalStatus: string;
    gender: string;
    canEqual?: boolean;
    hashCode?: boolean;
    toString?: boolean;
}

export interface TrainerBuilder {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNbr: string;
    address: string;
    gender: string;
    dob: Date;
    maritalStatus: string;
    trainerId: string;
}