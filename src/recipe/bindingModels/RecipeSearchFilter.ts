import { Type, Transform } from 'class-transformer';
import { IsOptional, IsArray, IsString, IsBoolean, IsInt } from 'class-validator';

export default class RecipeSearchFilter {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    @Type(() => String)
    @Transform(({ value }) => value.split(',').map((v) => parseInt(v)))
    category?: number[];

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    withoutMeat?: boolean;

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    @Type(() => String)
    @Transform(({ value }) => value.split(',').map((v) => parseInt(v)))
    ingredients?: number[];

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    limit?: number;
}
