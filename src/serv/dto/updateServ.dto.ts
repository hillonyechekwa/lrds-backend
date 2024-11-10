import { PartialType } from "@nestjs/swagger";
import { ServDto } from "./serv.dto";

export class UpdateServDto extends PartialType(ServDto){}