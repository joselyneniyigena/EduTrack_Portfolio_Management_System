export interface SchoolProfile {
    id?: number;
    logo: string;
    phoneNbr: string;
    address: string;
    name: string;
    email: string;
    description: string;
    hashCode?: boolean;
    canEqual?: boolean;
    toString?: boolean;
}

export interface SchoolProfileBuilder {
    id: number;
    name: string;
    logo: string;
    phoneNbr: string;
    address: string;
    description: string;
    email: string;
}