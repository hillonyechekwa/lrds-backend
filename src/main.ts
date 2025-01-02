import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';


// import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  
  //swagger setup
  const config = new DocumentBuilder()
  .setTitle("lordes")
  .setDescription("Api for lordes backend")
  .setVersion("0.3")
    .addBearerAuth(
      {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "JWT",
      description: "Enter JWT token",
      in: "header"
  },
      "JWT-auth")
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  //global prisma exception filter


  await app.listen(8000, () => {
    console.log("lorde's api running on port 8000")
  });
}
bootstrap();

