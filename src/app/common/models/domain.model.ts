import { Category } from './category.model';

export interface Domain {
  id?: string;
  name?: string;
  keyWords?: string[];
  imageUrl?: string;
  price?: string;
  salePrice?: string;
  category?: Category[];
  description?: string;
  creationDate?: Date;
  modificationDate?: Date;
}
