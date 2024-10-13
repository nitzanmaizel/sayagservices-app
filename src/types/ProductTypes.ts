export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: File | null;
  __v: number;
}

export interface RIProductsType {
  products: IProduct[];
  limit: number;
  page: number;
  total: number;
}
