import { Injectable, NotFoundException } from '@nestjs/common';
import { Reports } from './reports.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportsDto } from './dtos/createReport.dto';
import { User } from 'src/users/user.entity';
import { ApproveRoprtDto } from './dtos/approveReportDto';
import { GetEstimateDto } from './dtos/getEstimate.dto';


@Injectable()
export class ReportsService {
constructor(@InjectRepository(Reports) private ReportsRepo: Repository<Reports>){}
addReport(report : CreateReportsDto , user : User){
    const reportCreated =  this.ReportsRepo.create(report);
    // typeorm will extract the id of the user and assign it to the userId field in the database
    //the line below come from @oneTomany in user intity and reports entity
    reportCreated.user = user;
    return this.ReportsRepo.save(reportCreated)
}

async approve(id : number , Body : ApproveRoprtDto){
const report = await this.ReportsRepo.findOneBy({id});
if(!report) throw new NotFoundException('report not found')
report.approved = Body.approved;
return this.ReportsRepo.save(report);
}
createEstimate(query : GetEstimateDto){

        return this.ReportsRepo.createQueryBuilder()
        .select('AVG(price)' , 'price')
        .where('make = :make' , {make : query.make})
        .andWhere('model = :model' , {model : query.model})
        .andWhere('lat - :lat BETWEEN -5 AND 5 ' , {lat: query.lat})
        .andWhere('lng - :lng BETWEEN -5 AND 5 ' , {lng: query.lng})
        .andWhere('year - :year BETWEEN -3 AND 3 ' , {year: query.year})
        .orderBy('kilometer - :kilometer  ' , 'DESC')
        .setParameters({ kilometer: query.kilometer})
        .limit(3)
        .getRawMany()
}
}

