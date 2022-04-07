export interface ITour {
  id: string;
  name: string;
  slug: string;
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
