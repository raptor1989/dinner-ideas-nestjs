import { IsAlphanumeric, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecipeDTO {
    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    name: string;

    @IsInt()
    easeOfPrep: number;

    @IsNumber({}, { each: true })
    category: Array<number>;

    @IsNumber({}, { each: true })
    ingredients: Array<number>;

    @IsInt()
    prepTime: number;

    @IsString()
    methodOfPreparing: string;
    withoutMeat: boolean;
}
