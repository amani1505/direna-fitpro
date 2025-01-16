import { QueryParams } from '@model/QueryParams.interface';

export function updateRouteAndFetch(
  params: Partial<QueryParams>,
  route: any,
  router: any,
) {
  const queryParams = { ...params };

  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key as keyof QueryParams];
    if (value === '') {
      (queryParams[key as keyof QueryParams] as any) = null;
    }
  });

  router.navigate([], {
    relativeTo: route,
    queryParams: queryParams,
    queryParamsHandling: 'merge',
  });
}
