// auth.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy'; // Import the JwtStrategy
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Include JwtStrategy in the providers array
})
export class AuthModule {}
