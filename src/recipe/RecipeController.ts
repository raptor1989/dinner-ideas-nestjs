import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RecipeService } from './RecipeService';
import { CreateRecipeDTO } from './dto/CreateRecipeDTO';
import { UpdateRecipeDTO } from './dto/UpdateRecipeDTO';
import { Recipe } from './RecipeEntity';
import RecipeSearchFilter from './bindingModels/RecipeSearchFilter';

@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    @Post()
    async create(@Body() createRecipeDTO: CreateRecipeDTO): Promise<Recipe> {
        return await this.recipeService.create(createRecipeDTO);
    }

    @Get()
    async findByFilters(@Query() query: RecipeSearchFilter): Promise<Recipe[]> {
        return await this.recipeService.findByFilters(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Recipe> {
        return await this.recipeService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateRecipeDTO: UpdateRecipeDTO): Promise<Recipe> {
        return await this.recipeService.update(id, updateRecipeDTO);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return await this.recipeService.remove(id);
    }
}

