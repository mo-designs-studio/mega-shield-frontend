import { AxiosResponse } from 'axios';
import { ReactNode } from 'react';

export type Response = {
    response: AxiosResponse;
    error?: { code: string; message: string };
};

export type User = {
    name: string;
    id: string;
    role: string;
};

export type LoginInfo = {
    email: string;
    password: string;
};

export interface RegisterInfo extends LoginInfo {
    name: string;
}

export type DashboardLinkProps = {
    to: string;
    children: ReactNode;
    activeKey: string;
};

export interface ProductProps {
    name: string;
    price: string;
    image: string;
    description: string;
    id?: string;
}

export interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    photo: string;
    category: string;
    colors: string[];
    featured: boolean;
    freeShiping: boolean;
    inventory: number;
    averageRating: number;
    numOfReviews: number;
    user: {
        _id: string;
        name: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}

export type CloudinaryImage = {
    image: string;
    size: string;
};

export type MainServiceProps = {
    name: string;
    description: string;
};
export interface NewMainService extends MainServiceProps {
    image: File;
    isAdditional?: boolean;
}
export interface UpdatedMainService extends MainServiceProps {
    id: string;
    image?: File;
    isAdditional?: boolean;
}

export type MainService = {
    _id: string;
    name: string;
    description: string;
    photo: string;
    __v: number;
    isAdditional: boolean;
};

export type Service = {
    belongsTo: string;
    description: string;
    name: string;
    photo: string;
    __v: number;
    _id: string;
};

export type BookingProps = {
    customerFname: string;
    customerLname: string;
    customerPhone: string;
    service: string[];
    city: string;
    date: string;
    status?: string;
    carSize: string;
};

export interface Booking extends BookingProps {
    _id: string;
    __v: number;
}

export type SubServiceProps = {
    name: string;
    description: string;
    belongsTo: string;
};
export interface NewSubService extends SubServiceProps {
    image: File;
}
export interface UpdatedSubService extends SubServiceProps {
    id: string;
    image?: File;
}

export type PackageProps = {
    name: string;
    belongTo: string;
    description: string[];
    smallPrice: number;
    bigPrice: number;
    mediumPrice: number;
};

export interface Package extends PackageProps {
    _id: string;
    __v: number;
}

export enum CarSizes {
    small = 'صغير',
    medium = 'وسط',
    large = 'كبير',
}

export type ServicesPackages = {
    _id: string;
    name: string;
    photo: string;
    packages: Package[]
};
