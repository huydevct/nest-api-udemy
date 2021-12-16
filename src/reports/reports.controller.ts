import { GetEstimateDTO } from './dtos/get-estimate.dto';
import { AdminGuard } from './../guards/admin.guard';
import { ApproveReportDTO } from './dtos/approve-report.dto';
import { ReportDTO } from './dtos/report.dto';
import { User } from './../users/user.entity';
import { AuthGuard } from './../guards/auth.guard';
import { ReportsService } from './reports.service';
import { CreateReportDTO } from './dtos/create-report.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDTO){
    return this.reportService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDTO)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDTO) {
    return this.reportService.changeApproval(id, body.approved);
  }

}
