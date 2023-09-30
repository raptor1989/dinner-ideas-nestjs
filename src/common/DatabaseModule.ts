import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from 'src/Config';
import { Recipe } from 'src/recipe/RecipeEntity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: Config.DB_HOST,
            port: Config.DB_PORT,
            username: Config.DB_USERNAME,
            password: Config.DB_PASSWORD,
            database: Config.DB_DATABASE,
            entities: [Recipe],
            synchronize: Config.DB_SYNC,
            logging: true
        })
    ],
    controllers: [],
    providers: []
})
export class DatabaseModule {}
