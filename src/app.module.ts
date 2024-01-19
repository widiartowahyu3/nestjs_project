// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserController } from './user/user.controller';
import { ProfileController } from './user/profile.controller';
import { AuthController } from './auth/auth.controller'; // Include AuthController

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://mongo/nest-chat-project', {
      // Add @ts-ignore to suppress the TypeScript warning
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController, UserController, ProfileController], // Include AuthController in the controllers array
  providers: [JwtAuthGuard, JwtStrategy],
})
export class AppModule {}
