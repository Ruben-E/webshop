export interface Paged<T> {
  content: T[];
  page: number;
  size: number;
  totalResults: number;
}
