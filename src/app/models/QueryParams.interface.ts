export interface QueryParams {
  page?: number | 1;
  limit?: number | 1;
  sortBy?: string | null;
  sortOrder?: 'ASC' | 'DESC';
  search?: string | null;
  filterBy?: string | null;
  withPagination?: boolean | false;
  relations?: string[] | null;
}
