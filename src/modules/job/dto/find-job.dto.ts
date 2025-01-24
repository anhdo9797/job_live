import { ApiProperty } from '@nestjs/swagger';

export class FindJobDto {
  @ApiProperty({ type: String })
  search?: string;

  @ApiProperty({ type: Date })
  from?: Date;

  @ApiProperty({ type: Date })
  end?: Date;

  @ApiProperty({ type: Number, default: 1 })
  page?: number;

  @ApiProperty({ type: Number })
  pageSize?: number;
}
