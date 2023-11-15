import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

let server: Handler;
const nodeEnv = (process.env.NODE_ENV ?? 'production').trim();
const isHml = nodeEnv == 'development';

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  if (isHml) {
    app.setGlobalPrefix('animes/');

    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Anex - Animes')
      .setDescription(
        'Documentação dos serviços relacionados a API de Animes do Anime Experience',
      )
      .addServer(process.env.DOCS_HOST, 'DEV')
      .setVersion('1.0')
      .setBasePath('animes/')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
  } else {
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
  }
}

if (isHml) {
  bootstrap();
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
