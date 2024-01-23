import { Body, Controller, Get, Post } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category-dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findCategories();
  }
  @Post()
  async create(
    @Body()
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }
}
