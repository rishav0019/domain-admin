import { Category } from './category.model';

export interface Domain {
  id?: string;
  name?: string;
  extension?: string;
  keyWords?: string[];
  imageUrl?: string;
  price?: string;
  salePrice?: string;
  isSold?: boolean;
  category?: Category[];
  color?: string;
  font?: string;
  description?: string;
  creationDate?: Date;
  modificationDate?: Date;
}

export interface SearchWord {
  id?: string;
  term: string;
  creationDate?: Date;
}