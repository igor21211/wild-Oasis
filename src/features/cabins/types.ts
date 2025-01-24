export interface CabinType {
  id: number;
  createdAt: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
}

export type CabinProps = Omit<CabinType, 'id' | 'createdAt'>;

export interface ImageInterface {
  lastModified: number;
  lastModifiedDate: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
