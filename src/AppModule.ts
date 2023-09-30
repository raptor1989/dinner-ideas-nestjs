import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/DatabaseModule';
import { RecipeModule } from './recipe/RecipeModule';

@Module({
    imports: [ConfigModule.forRoot(), DatabaseModule, RecipeModule],
    controllers: [],
    providers: []
})
export class AppModule {}
