import { IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UserDto {
  @IsUUID()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class PurchaseOrder {
  @IsUUID()
  id: string;

  @Min(10)
  value: number;

  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}
