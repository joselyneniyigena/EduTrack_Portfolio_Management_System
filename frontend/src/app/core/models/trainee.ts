export interface Trainee {
    id?: number;
    firstName: string;
    lastName: string;
    address: string;
    phoneNbr: string;
    traineeId: string;
    email: string;
    dob: Date;
    maritalStatus: string;
    gender: string;
    canEqual?: boolean;
    hashCode?: boolean;
    toString?: boolean;
}

export interface TraineeBuilder {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNbr: string;
    address: string;
    gender: string;
    dob: Date;
    maritalStatus: string;
    traineeId: string;
}