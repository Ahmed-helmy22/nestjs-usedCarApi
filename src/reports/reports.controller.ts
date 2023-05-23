import { Controller, Post , Body, UseGuards, Patch , Param , Get , Query} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportsDto } from './dtos/createReport.dto';
import { AuthGaurd } from 'src/Gaurds/auth.gaurds';
import { currentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/user.entity';
import { Serializer } from 'src/interceptors/serialize.interceptor';
import { reportDto } from './dtos/report.dto';
import { ApproveRoprtDto } from './dtos/approveReportDto';
import { ReportAfterAprrove } from './dtos/reportafterApproveDto';
import { AdminGaurd } from 'src/Gaurds/admin.gaurd';
import { GetEstimateDto } from './dtos/getEstimate.dto';

@Controller('reports')
export class ReportsController {
constructor(private ReportsService : ReportsService){}
@UseGuards(AuthGaurd)
@Post()
@Serializer(reportDto)
addReport(@Body() Body:CreateReportsDto  , @currentUser() user : User){
    return this.ReportsService.addReport(Body , user)
}
@Patch('/:id')
@Serializer(ReportAfterAprrove)
@UseGuards(AdminGaurd)
approveReport(@Param('id') id : string ,@Body() Body : ApproveRoprtDto ){    
return this.ReportsService.approve(parseInt(id) , Body)
}

@Get()
getEstimate(@Query() query: GetEstimateDto){
    return this.ReportsService.createEstimate(query);
}
}

