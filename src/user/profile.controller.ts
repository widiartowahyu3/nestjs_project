// profile.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { User, UserProfile } from './user.model';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getProfile(@Param('id') userId: string): Promise<User | null> {
    return this.userService.findById(userId);
  }

  @Post(':id/update')
  async updateProfile(
    @Param('id') userId: string,
    @Body() updateData: UserProfile,
    @Request() req: any,
  ): Promise<User | null> {
    const updatedUser = await this.userService.updateProfile(
      userId,
      updateData,
    );

    // Redirect the user to their updated profile page
    req.res.redirect(`/profile/${userId}`);

    return updatedUser;
  }

  @Post(':id/add-interests')
  async addInterests(
    @Param('id') userId: string,
    @Body('interests') interests: string[],
    @Request() req: any,
  ): Promise<User | null> {
    const updatedUser = await this.userService.addInterests(userId, interests);

    // Redirect the user to their updated profile page
    req.res.redirect(`/profile/${userId}`);

    return updatedUser;
  }
}
