// user.ts

export type User = {
    id: string;
    displayName: string;
    token: string;
    email: string;
    image?: string; 
}

export type LoginCreds = {
    email: string;
    password: string;
}

export type RegisterCreds = {
    email: string;
    password: string;
    displayName: string;
    role: UserRole; 
}

export enum UserRole {
    Buyer = 1,
    StoreOwner = 2
}

// Buyer Profile
export type BuyerProfile = {
    id: string;
    displayName: string;
    email: string;
    shippingAddress?: string;
    phoneNumber?: string;
}

// Store Owner Profile
export type StoreOwnerProfile = {
    id: string;
    displayName: string;
    email: string;
    businessName?: string;
    taxId?: string;
    storeId?: string;
    storeName?: string;
}