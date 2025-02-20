
export interface Address {
    id: string | number;
    country: string;
    street: string;
    city: string;
    zip: string;
}

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    imgUrl: string;
    addresses: Address[];
}
