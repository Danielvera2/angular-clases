import { Component, OnInit } from '@angular/core';
import { CreateProductDto, ProductModel, UpdateProductDto } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   products:ProductModel[] = [];

   selectedProduct: UpdateProductDto = {title:'', price:0, description:''};

  constructor(private productService:ProductService) {
   this.editProduct();
  }

  ngOnInit(): void {
    this.getProducts();
    // this.getProduct();
    // this.createProduct();
    // this.updateProduct();
    //this.deleteProduct();
  }

  getProducts(){
    const url = "https://api.escuelajs.co/api/v1/products";
    this.productService.getAll().subscribe(
      response =>{
        this.products = response;
        console.log(response);
      }
    )
  }
  getProduct(id: ProductModel['id'] ){
    const url = "https://api.escuelajs.co/api/v1/products/id";
    return this.productService.getOne(id).subscribe(
      response =>{
        console.log(response);
      }
    )
  }
  createProduct(product: CreateProductDto){
    const data: CreateProductDto = {
      title: "Pantalon",
      price: 289,
      description: "Pantalon",
      images: ['http://api.lorem.space/image/furniture?w=640&h=480&r=8718'],
      categoryId: 4,
    };
    
    this.productService.store(data).subscribe(response => {
      console.log(response);
      this.getProducts();
    });
    this.productService.store(product).subscribe(
      response =>{
        console.log(response);
      }
    )
  }
  updateProduct(id: ProductModel['id'], product:UpdateProductDto){
    const data = {
      title: 'Piano',
      price: 156,
      description: 'Instrumento musical'
    };
    this.productService.update(12, data).subscribe(response => {
      console.log(response);
      this.getProducts();
    });
    
    this.productService.update(id, product).subscribe(
      response =>{
        console.log(response);
      }
    )
  }
  editProduct(){
    this.selectedProduct = {title:'', price:0, description:''};
  }

  deleteProduct(id: ProductModel['id']){
    this.productService.destroy(id).subscribe(
      response =>{
        this.products = this.products.filter(product => product.id != id);
        console.log(response);
      }
    )
  }
}
