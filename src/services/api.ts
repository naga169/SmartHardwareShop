import { Product } from '../types/types';
import config from '../config'

export function getProducts(): Promise<Product[]> {
    return fetch(`${config.baseUrl}products`)
            .then(res => res.json())
            .then(res => {
                    return res as Product[]
            })
}

export function getRecommendeds(): Promise<Product[]> {
        return fetch(`${config.baseUrl}recommendeds`)
                .then(res => res.json())
                .then(res => {
                        return res as Product[]
                })
    }

export function getProductsOnPage(pageNumber : number,limit : number ): Promise<Product[]>{
        return fetch(`${config.baseUrl}products?_page=${pageNumber}&_limit=${limit}`)
                .then(res => res.json())
                .then(res => {
                        return res as Product[]
                })
}
    
