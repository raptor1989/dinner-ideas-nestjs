import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './RecipeEntity';
import { CreateRecipeDTO } from './dto/CreateRecipeDTO';
import { UpdateRecipeDTO } from './dto/UpdateRecipeDTO';
import RecipeSearchFilter from './bindingModels/RecipeSearchFilter';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private recipeRepository: Repository<Recipe>
    ) {}

    async create(createRecipeDTO: CreateRecipeDTO): Promise<Recipe> {
        const recipe = new Recipe();
        recipe.name = createRecipeDTO.name;
        recipe.easeOfPrep = createRecipeDTO.easeOfPrep;
        recipe.category = createRecipeDTO.category;
        recipe.ingredients = createRecipeDTO.ingredients;
        recipe.prepTime = createRecipeDTO.prepTime;
        recipe.methodOfPreparing = createRecipeDTO.methodOfPreparing;
        recipe.withoutMeat = createRecipeDTO.withoutMeat;

        return await this.recipeRepository.save(recipe);
    }

    async findByFilters(filters: RecipeSearchFilter): Promise<Recipe[]> {
        let query = this.recipeRepository.createQueryBuilder('recipe');
        if (filters.name) {
            query = query.where('recipe.name ILIKE :name', { name: `%${filters.name}%` });
        }
        if (filters.category) {
            query = query.andWhere('recipe.category @> :category', { category: filters.category });
        }
        if (filters.withoutMeat) {
            query = query.andWhere('recipe.withoutMeat = :withoutMeat', { withoutMeat: filters.withoutMeat });
        }
        if (filters.ingredients) {
            query = query.andWhere('recipe.ingredients @> :ingredients', { ingredients: filters.ingredients });
        }

        if (filters.limit) {
            query = query.limit(filters.limit);
        }
        return await query.getMany();
    }

    async findOne(id: number): Promise<Recipe> {
        return await this.recipeRepository.findOne({ where: { id } });
    }

    async update(id: number, updateRecipeDTO: UpdateRecipeDTO): Promise<Recipe> {
        const recipe = new Recipe();
        recipe.id = id;
        recipe.name = updateRecipeDTO.name;
        recipe.easeOfPrep = updateRecipeDTO.easeOfPrep;
        recipe.category = updateRecipeDTO.category;
        recipe.ingredients = updateRecipeDTO.ingredients;
        recipe.prepTime = updateRecipeDTO.prepTime;
        recipe.methodOfPreparing = updateRecipeDTO.methodOfPreparing;
        recipe.withoutMeat = updateRecipeDTO.withoutMeat;

        await this.recipeRepository.update(id, recipe);
        return await this.recipeRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.recipeRepository.delete(id);
    }
}

