import { DataSourceOptions, DataSource } from "typeorm";


export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    database: "pegasus_1hk8",
    host: "dpg-crvs9oq3esus7396dlv0-a.oregon-postgres.render.com",
    port: 5432,
    username: "lrds", //?might be postgres
    password: "EdVYcvKphyRMm3y0qhrssOktnEWWg0yI",
    entities: ["dist/src/entities/*.js"],
    synchronize: true,
    migrations: ["dist/db/migrations/*.js"],
    ssl: {
        rejectUnauthorized: false
    }
}


// postgresql://lrds:EdVYcvKphyRMm3y0qhrssOktnEWWg0yI@dpg-crvs9oq3esus7396dlv0-a.oregon-postgres.render.com/pegasus_1hk8

const dataSource = new DataSource(dataSourceOptions)
export default dataSource