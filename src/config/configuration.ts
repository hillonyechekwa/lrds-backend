import { ConfigModuleOptions } from "@nestjs/config";

const configuration: ConfigModuleOptions = {
    isGlobal: true,
    expandVariables: true,
    envFilePath: [".env.development.local", ".env.development.production"],
    load: [() => ({
        database: {
            url: process.env.DATABASE_URL
            // url: process.env.POSTGRES_PRISMA_URL
        }
    })]
}


export default configuration