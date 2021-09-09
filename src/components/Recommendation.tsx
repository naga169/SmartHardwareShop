import { useEffect } from 'react';
import { Product as ProductType } from '../types/types'
import { useSelector, useDispatch } from "react-redux";
import apiService from '../services/apiService'
import { Carousel } from "react-bootstrap";
import '../css/Recommendation.css'

function Recommendation() {
  const dispatch = useDispatch();
  const recommendedProducts: ProductType[] = useSelector((state: any) => {
    return state.recommendedProductList;
  });
  const onProductClick = (data : ProductType ) => {
    dispatch({ type: 'SHOW_HIDE_MODAL', payload: true })
    dispatch({ type: 'SELECTED_PRODUCT', payload: data })
  }
  
  useEffect(() => {
    apiService.loadRecommendedProducts(dispatch);
  }, [dispatch])

  return (

    <div>
      <Carousel>
        {recommendedProducts.map(data => (
          <Carousel.Item key={data.id}>
            <img
              className="d-block w-100"
              src={data.defaultImage}
              style={{
                maxHeight: '50vh'
                }}
              onClick={() => onProductClick(data)} 
            />
            <Carousel.Caption>
              <h3>{data.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Recommendation;