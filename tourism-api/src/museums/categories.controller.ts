import { Controller, Get } from '@nestjs/common';
import { Category } from './schemas/category.schema';
import { CategoryService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findCategories();
  }
}
