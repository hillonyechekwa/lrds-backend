import { Injectable } from "@nestjs/common";

@Injectable()
export class DevConfigService{
    DBHOST = 'dpg-crvs9oq3esus7396dlv0-a'
    getDBHOST() {
        return this.DBHOST
    }
}