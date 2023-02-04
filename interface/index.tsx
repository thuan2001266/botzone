export interface Products {
  id: string;
  name: string;
  price: Array<string>;
  color: Array<string>;
  img: Array<string>;
  optionToBuy: Array<string>;
  discount: string;
  date: number;
  type: string;
  model: string;
}

export interface FetchData {
  code: number;
  message: string;
  data: any;
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

export interface toCart {
  id: string;
  spec: number;
  color: number;
  quant: number;
}

export interface changeQuanCart {
  object: toCart;
  action: string;
}

export interface user {
  id: number;
  name: string;
  email: string;
  password: string;
  enable: boolean;
  roles: Array<role>;
}

export interface role {
  id: number;
  name: string;
}

export interface receipt {
  id: number;
  user: user;
  addresses: toCart[];
  method: string;
}

export interface imageCarousel {
  src: string;
  height: number;
  width: number;
  blurDataURL: string;
}

export interface contextType {
  params: typeString;
}

export interface typeString {
  type: string;
}
