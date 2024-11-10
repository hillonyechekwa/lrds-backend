import { Role } from "@prisma/client"

export type CurrentUser = {
    userId: number,
    role: Role
}