export interface ITour {
  _id: string;
  name: string;
  summary: string;
  description: string;
  price: number;
  difficulty: string;
  duration: number;
  imageCover: string;
  images: string[];
  maxGroupSize: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  secretTour: boolean;
  startDates: Date[];
}
