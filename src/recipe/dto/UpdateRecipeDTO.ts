import { IsAlphanumeric, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateRecipeDTO {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    name: string;

    @IsInt()
    easeOfPrep: number;

    @IsNotEmpty()
    @MinLength(1, {
        each: true
    })
    category: Array<number>;

    @IsNotEmpty()
    @MinLength(1, {
        each: true
    })
    ingredients: Array<number>;

    @IsInt()
    prepTime: number;

    @IsString()
    methodOfPreparing: string;
    withoutMeat: boolean;
}
