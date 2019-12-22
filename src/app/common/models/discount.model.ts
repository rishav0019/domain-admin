export interface Discount {
  id?: number;
  propertyId?: number;
  name?: string;
  description?: string;
  value?: number;
  type?: number;
  validFrom?: Date;
  validUntil?: Date;
  timesValid?: number;

  creationDate?: Date;
  modificationDate?: Date;
}

export interface DiscountView extends Discount {
  property_name?: string;
}

