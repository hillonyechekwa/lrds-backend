import { ApiProperty } from "@nestjs/swagger";

interface User {
    userId: number
    username: string
    role: string
}

interface backendTokens {
    accessToken: string
    refreshToken: string
}


export class AuthEntity{
    @ApiProperty()
    user: User

    @ApiProperty()
    backendTokens: backendTokens
}