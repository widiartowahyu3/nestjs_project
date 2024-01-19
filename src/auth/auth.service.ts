// auth.service.ts
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import * as bcrypt from 'bcrypt';
import { Socket } from 'socket.io';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
    socket?: Socket,
  ): Promise<void> {
    const { username, email, password, confirmPassword } = authCredentialsDto;

    // Validate if passwords match
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Check if the username or email is already taken
    const usernameExists = await this.userService.findByUsername(username);
    const emailExists = await this.userService.findByEmail(email);

    if (usernameExists) {
      throw new BadRequestException('Username is already taken');
    }

    if (emailExists) {
      throw new BadRequestException('Email is already registered');
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // If a socket is provided, emit a registration success event
    if (socket) {
      socket.emit('registrationSuccess', {
        message: 'Registration successful',
      });
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    // Find the user by username
    const user = await this.userService.findByUsername(username);

    // Check if the user exists
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate and return an access token upon successful authentication
    const payload = { sub: user._id, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
