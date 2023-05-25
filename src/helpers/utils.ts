import { ReadonlyURLSearchParams } from "next/navigation";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const removeEdgesAndNodes = (array: any) => {
  return array.edges.map((edge: any) => edge?.node);
};

export const removeNodesForPagination = (array: any) => {
  const edges = array.edges.map((edge: any) => edge.node);
  const pageInfo = array.pageInfo;

  return { edges, pageInfo };
};
export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
