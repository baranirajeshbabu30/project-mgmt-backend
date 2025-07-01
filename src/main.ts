import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/strategies/jwt-auth.guard';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const reflector = app.get(Reflector);

  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors({ origin: '*' }); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
