import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from 'src/shared/shared.module';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    SharedModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuard,
  {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    }
  ],
})
export class AuthModule {}
