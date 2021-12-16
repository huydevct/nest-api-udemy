import { GetEstimateDTO } from './dtos/get-estimate.dto';
import { User } from './../users/user.entity';
import { CreateReportDTO } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  createEstimate(estimateDTO: GetEstimateDTO) {  // => { make, model }: GetEstimateDTO
    return this.reportRepo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: estimateDTO.make }) // => { make }
      .andWhere('model = :model', { model: estimateDTO.model }) // => { model }
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: estimateDTO.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: estimateDTO.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: estimateDTO.year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: estimateDTO.mileage })
      .limit(3)
      .getRawOne();
  }

  create(reportDTO: CreateReportDTO, user: User) {
    const report = this.reportRepo.create(reportDTO);
    report.user = user;

    return this.reportRepo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.reportRepo.findOne(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;
    return this.reportRepo.save(report);
  }
}
