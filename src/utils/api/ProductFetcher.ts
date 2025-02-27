import { Product } from "../interfaces/Product";

const API_URL = "http://localhost:8082/api/products";


const fetchProducts = {
    getProducts: () => {
        return fetch(API_URL)
                .then(response => {
                if (!response) {
                    throw new Error("Failed to fetch products");
                }
                return response.json();
            }).then((json) => json as Product[])
            
    }
}

export default fetchProducts;