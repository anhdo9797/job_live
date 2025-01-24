export interface ResultResponse<T> {
  message?: string;
  currentPage?: number;
  totalPages?: number;
  total?: number;
  result: T;
}
