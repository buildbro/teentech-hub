export type _productsType_ = {
    id?: string,
    name: string,
    price: number,
    units: number,
    description: string,
    images: string[],
    // images: string[],
    count?: number,
    createdAt: string,
    updatedAt: string
}

export type _customersType_ = {
    // id: string,
    name: string,
    email: string,
    phoneNumber: string,
    address: string,
    region: string,
    country: string
}

export type _ordersType_ = {
    id?: string,
    products: _productsType_[],
    customer: _customersType_,
    createdAt: string
}

export type _contactForm_ = {
    name: string,
    email: string,
    phoneNumber: string,
    subject: string,
    message: string
}

export enum conditionType {
    '!=' = "!=",
    '<' = "<",
    '<=' = "<=",
    '==' = "==",
    '>' = ">",
    '>=' = ">=",
    'array-contains' = "array-contains",
    'array-contains-any' = "array-contains-any",
    'in' = "in",
    'not-in' = "not-in",
};

export interface whereCondition {
    property: string, 
    condition: "!=" | "<" | "<=" | "==" | ">" | ">=" | "array-contains" | "array-contains-any" | "in" | "not-in",
    value: string | number | boolean
};
  
export interface user {
    id: string,
    name: string,
    phoneNumber: string,
    email: string,
    // keyCredentials?: string,
    // role: "super_admin" | "admin",
    status: boolean,
    deletedAccount: boolean,

    lastInteraction?: number
    updatedAt: number,
    createdAt: number,
};
