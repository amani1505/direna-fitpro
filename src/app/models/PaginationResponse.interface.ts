export interface PaginationResponse<T> {
  data: T[];
  limit: number;
  current_page: number;
  total_pages: number;
  total_items: number;
}
