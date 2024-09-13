import { User } from "src/entities/user.entity"
import { Stylist } from "src/entities/stylist.entity"
import { Booking } from "src/entities/booking.entity"
import { Service } from "src/entities/service.entity"
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions"


const config : SqliteConnectionOptions = {
    type: "sqlite",
    database: "src/db/test.sqlite",
    entities: [User, Stylist, Booking, Service],
    synchronize: true
}


export default config