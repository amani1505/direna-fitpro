import { ActivatedRoute, Router } from '@angular/router';
import { QueryParams } from '@model/QueryParams.interface';

export function updateRouteAndFetch(
  params: Partial<QueryParams>,
  route: ActivatedRoute,
  router: Router,
) {
  // Send empty strings as null so they are removed from the URL.
  const queryParams: Record<string, unknown> = { ...params };
  for (const [key, value] of Object.entries(queryParams)) {
    if (value === '') queryParams[key] = null;
  }

  router.navigate([], {
    relativeTo: route,
    queryParams: queryParams,
    queryParamsHandling: 'merge',
  });
}
