"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
console.log("NEST TYPE:", typeof process.env.DATABASE_URL);
console.log("NEST VALUE:", process.env.DATABASE_URL);
async function bootstrap() {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Instant Wellness Kit API')
        .setDescription('The Instant Wellness Kit API description')
        .setVersion('1.0')
        .addTag('roles')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(4200);
}
bootstrap();
//# sourceMappingURL=main.js.map