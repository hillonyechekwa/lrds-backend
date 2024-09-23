import { User } from "src/entities/user.entity"
import { Stylist } from "src/entities/stylist.entity"
import { Booking } from "src/entities/booking.entity"
import { Service } from "src/entities/service.entity"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import { Transaction } from "typeorm"



const config : PostgresConnectionOptions = {
    type: "postgres",
    database: "testDB",
    host: "localhost",
    port: 5432,
    username: "postgres", //?might be postgres
    password: "1234",
    entities: [User, Stylist, Booking, Service, Transaction],
    synchronize: true
}


export default config