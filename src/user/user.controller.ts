// user.controller.ts
import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Put,
  Body,
  Delete,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { User, UserProfile } from './user.model';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@Param('id') userId: string): Promise<User | null> {
    return this.userService.findById(userId);
  }

  @Post(':id/add-interests')
  @UseGuards(JwtAuthGuard)
  async addInterests(
    @Param('id') userId: string,
    @Body('interests') interests: string[],
  ): Promise<User | null> {
    return this.userService.addInterests(userId, interests);
  }

  @Delete(':id/delete-interests')
  @UseGuards(JwtAuthGuard)
  async deleteInterests(
    @Param('id') userId: string,
    @Body('interests') interests: string[],
  ): Promise<User | null> {
    return this.userService.deleteInterests(userId, interests);
  }

  @Put(':id/update-profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Param('id') userId: string,
    @Body() profileData: UserProfile,
  ): Promise<User | null> {
    return this.userService.updateProfile(userId, profileData);
  }
}
