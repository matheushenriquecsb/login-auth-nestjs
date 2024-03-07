import { PartialType } from '@nestjs/mapped-types';
import { RegisterRequestDto } from 'src/auth/dto/register-request.dto';

export class UpdateRequestDto extends PartialType(RegisterRequestDto) {
  profilePicture: string;
}
