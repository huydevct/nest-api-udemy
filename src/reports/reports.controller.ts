import { ReportDTO } from './dtos/report.dto';
import { User } from './../users/user.entity';
import { AuthGuard } from './../guards/auth.guard';
import { ReportsService } from './reports.service';
import { CreateReportDTO } from './dtos/create-report.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDTO)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }
}
