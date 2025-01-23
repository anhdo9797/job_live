export interface ResultResponse<T> {
  message?: string;
  currentPage?: number;
  totalPages?: number;
  totalEmployees?: number;
  result: T;
}
