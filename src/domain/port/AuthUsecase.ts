import { User } from "../model";

export class UserDTO {
    id: number;
    name: string | null;
    email: string;
    password: string;
    accessToken: string;
}

export interface AuthUsecase {
    login(email: string, password: string): Promise<User>;
}
