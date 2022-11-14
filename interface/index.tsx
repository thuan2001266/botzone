export interface Products {
    _id: string;
    name: string;
    price: number;
    color: Array<string>;
    img: string;
    option: Array<string>;
    discount: string;
    date: number;
    type: string;
    model: string;
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
