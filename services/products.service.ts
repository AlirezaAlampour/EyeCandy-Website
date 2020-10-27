import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({ providedIn: 'root'})
export class Product {
    ID: number;
    Name: string;
    Price: number;
    currentInventory: number;
    urlString: string;
}

const products: Product[] = [{
    ID: 1,
    Name: 'Pizza',
    Price: 15,
    currentInventory: 3,
    urlString: 'pepperonipizza',
}, {
    ID: 2,
    Name: 'Burger',
    Price: 8,
    currentInventory: 5,
    urlString: 'model',
}, {
    ID: 3,
    Name: 'Sandwich',
    Price: 9,
    currentInventory: 10,
    urlString : 'pepperonipizza',
}, {
    ID: 4,
    Name: 'Soup',
    Price: 6,
    currentInventory: 2,
    urlString : 'pepperonipizza',
}, {
    ID: 5,
    Name: 'Taco',
    Price: 4,
    currentInventory: 20,
    urlString: 'pepperonipizza',
}];



export class Service {
    getProducts(): Product[] {
        return products;
    }
    addProduct() {

    }
    // removeProduct(): Product[]{
    // }
}
