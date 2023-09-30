import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './AppModule';
import { HttpExceptionFilter } from './common/HttpExceptionFilter';
import { Config } from 'src/Config';

const setupSwagger = (app: INestApplication) => {
    const documentBuilder = new DocumentBuilder()
        .setTitle('DinnerIdeas API')
        .setDescription('DinnerIdeas API nest.js')
        .setVersion('1.0')
        .addBasicAuth()
        .build();
    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: { defaultModelsExpandDepth: -1 }
    });
};

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(helmet());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    setupSwagger(app);
    await app.listen(Config.PORT);
}

bootstrap();
