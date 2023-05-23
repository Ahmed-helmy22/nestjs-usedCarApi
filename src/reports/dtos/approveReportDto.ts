import { IsBoolean } from "class-validator"

export class ApproveRoprtDto { 
@IsBoolean()
approved : boolean
}