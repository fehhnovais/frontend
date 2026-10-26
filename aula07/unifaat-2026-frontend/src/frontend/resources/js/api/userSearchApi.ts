import clientApi from "./_clientApi";
import type { PaginatedResponse, User, UserSearchFilters } from "../types/api";

/**
 * Busca usuários pela API de busca (Elasticsearch → ids → Postgres).
 * POST /users/search com { filters, page, limit }.
 * Resposta no formato paginado padrão: PaginatedResponse<User>.
 */
export async function userSearchApi(
  filters: UserSearchFilters,
  page: number,
  limit: number
): Promise<PaginatedResponse<User>> {
  const { data } = await clientApi.post<PaginatedResponse<User>>("/users/search", {
    filters,
    page,
    limit,
  });

  return data;
}
