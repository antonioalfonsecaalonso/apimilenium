/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { obtenerError } from '../errors/errors';
import { PaginationDto } from '../comon/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductsService {

 
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto) {
    
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
      
    } catch (error) {
      return obtenerError('ProductService', error, '');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offSet = 0} = paginationDto;
    return this.productRepository.find({
      take: limit,
      skip: offSet
    });
  }

  async findOne(term: string) {

    let product: Product;

    // if( (isUUID(term))){
    //   product = await this.productRepository.findOneBy({ id: term });
    //   if(!product){
    //     return obtenerError('ProductService', null,'notFound');
    //   }
    // }else{

    //   const queryBuilder = this.productRepository.createQueryBuilder();

    //   product = await queryBuilder
    //   .where(
    //     'LOWER(title) =:title or slug =:slug', {
    //     title: term.toLowerCase(),
    //     slug: term})
    //   .getOne();

    //   if(!product){
    //     return obtenerError('ProductService', null,'notFound');
    //   }
    // }
    // return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    
    // const product = await this.productRepository.preload({
    //   id: id,
    //   ...updateProductDto
    // });

    // if(!product){
    //   return obtenerError('ProductService', null,'notFound');
    // }else {

    //   try {
    //     return this.productRepository.save(product);
    //   } catch (error) {
    //     return obtenerError('ProductService', error, '');
    //   }

    // } 

  }

  async remove(id: string) {
    
   // const producto =  await this.productRepository.findOneBy({ id });
    // if(producto){

    //   try{
    //    return await this.productRepository.remove(producto);
    //   }catch(ex){
    //     return obtenerError('ProductService', null,'delete');
    //   }
      
    // }else{
    //     return obtenerError('ProductService', null,'notFound');
    // }
  }

}
