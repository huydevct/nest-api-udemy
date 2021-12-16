import { User } from './../users/user.entity';
import { CreateReportDTO } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  create(reportDTO: CreateReportDTO, user: User) {
    const report = this.reportRepo.create(reportDTO);
    report.user = user;
    
    return this.reportRepo.save(report);
  }
}
