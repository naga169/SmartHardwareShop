import Product from "./Product";
import { Product as ProductType } from '../types/types'

function ProductList(props: (any & any)) {

  const { searchKey, allProducts } = props;

  const productsList = (searchKeyword: string) => {
    return searchKeyword !== '' ?
      allProducts.filter((product: ProductType) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      ) : allProducts;
  }

  return (
    <div className="products-wrapper">
      <div>
        <div className="row row-cols-1 row-cols-md-4 g-5" style={{
          marginTop: '10px'
        }}>
          {allProducts &&
            productsList(searchKey).map((data: any) => (
              <Product key={data.id}
                data={data}></Product>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
