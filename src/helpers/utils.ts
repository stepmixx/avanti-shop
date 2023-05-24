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

export const removeEdgesAndNodesWithPagination = (array: any) => {
  const data = array.edges.map((edge: any) => edge.node);
  const pageInfo = array.pageInfo;
  const cursor = array.edges[array.edges.length - 1].cursor;

  return { data, pageInfo, cursor };
};
