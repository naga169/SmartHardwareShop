import { useEffect, useState } from "react";
import ProductList from './components/ProductList';
import PageNumbers from './components/PageNumbers';
import Recommendation from "./components/Recommendation";
import { getProducts, getProductsOnPage } from './services/api';
import Header from './components/Header';
import { Product as ProductType } from './types/types';
import ProductView from "./components/ProductView";
import { useDispatch, useSelector } from 'react-redux';
import apiService from './services/apiService'
import { Dispatch } from "redux"

function Home() {
    const dispatch : Dispatch<any> =  useDispatch();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [allProducts, setAllProducts] = useState<ProductType[]>([]);

    const cartProducts :ProductType[] = useSelector((state: any) => {
        return  state.cartProducts;
      });
  
    const [searchKey, setSearchKey] = useState('');
  
    const onPageNumberChange = (pageNumber: number) => {
        getProductsOnPage(pageNumber, 12).then((products) => {
            setProducts(products);
        });
    }

    useEffect(() => {
        apiService.loadProduct(dispatch);
    }, [dispatch])

    const onSearchChange = (value: string) => {
        setSearchKey(value);
    }

    useEffect(() => {
        getProducts().then((data) => {
            setAllProducts(data);
        })
        getProductsOnPage(0, 12).then((products) => {
            setProducts(products);
        });
    }, []);

    return (
        <div style={{ background: '#f5f5f5' }}>
            <Header onSearchChange={(value: string) => onSearchChange(value)} cartProducts={cartProducts.length}></Header>
            <div style={{
                width: '80%',
                margin: 'auto'
            }}>
                <Recommendation></Recommendation>
                <ProductList
                  searchKey={searchKey} allProducts={products}></ProductList>
                <PageNumbers 
                productsLength={allProducts.length}
                onPageNumberChange={(pageNumber: number) => onPageNumberChange(pageNumber)}></PageNumbers>
               <ProductView page="home"></ProductView>
            </div>
        </div>
    )
}

export default Home;