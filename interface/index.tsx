export interface Products {
    id: string;
    name: string;
    price: Array<string>;
    color: Array<string>;
    img: Array<string>;
    option: Array<string>;
    discount: string;
    date: number;
    type: string;
    model: string;
}

export interface ProductAndQuantity {
    product: Products;
    quantity: number;
}

export interface ProductItem {
    product: Products;
}

export interface Data {
    message: string;
    success: boolean;
}

export interface info {
    type: string;
    data: Array<Products>;
}
