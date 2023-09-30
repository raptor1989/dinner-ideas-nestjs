import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './RecipeEntity';
import { RecipeService } from './RecipeService';
import { RecipeController } from './RecipeController';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe])],
    providers: [RecipeService],
    controllers: [RecipeController]
})
export class RecipeModule {}

