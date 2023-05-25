function Products({ searchParams }: { searchParams: { q: string } }) {
  console.log(searchParams.q);
  return <div>Products</div>;
}

export default Products;
