import { User } from "../model/User";

export class UserDTO {
    id: number;
    name: string | null;
    email: string;
    password: string;
    accessToken: string;
}

export interface UserUsecase {
    register(data: UserDTO): Promise<User>;
    all(): Promise<User[]>;
}
