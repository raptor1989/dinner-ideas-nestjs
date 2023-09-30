import { Logger } from '@nestjs/common';
import { IsBoolean, IsInt, IsString, validateSync } from 'class-validator';

class Configuration {
    private readonly logger = new Logger(Configuration.name);

    @IsString()
    readonly DB_HOST = process.env.DB_HOST as string;

    @IsInt()
    readonly DB_PORT = Number(process.env.DB_PORT);

    @IsString()
    readonly DB_USERNAME = process.env.DB_USERNAME as string;

    @IsString()
    readonly DB_PASSWORD = process.env.DB_PASSWORD as string;

    @IsString()
    readonly DB_DATABASE = process.env.DB_DATABASE as string;

    @IsBoolean()
    readonly DB_SYNC = process.env.DB_SYNC === 'true';

    @IsInt()
    readonly PORT = Number(process.env.PORT);

    constructor() {
        const error = validateSync(this);
        if (!error.length) return;
        this.logger.error(`Config validation error: ${JSON.stringify(error)}`);
        process.exit(1);
    }
}

export const Config = new Configuration();
