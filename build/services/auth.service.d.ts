export = authService;
declare class authService {
    static register(data: any): Promise<any>;
    static login(data: any): Promise<{
        accessToken: any;
        id: number;
        name: string | null;
        email: string;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static all(): Promise<import(".prisma/client").User[]>;
}
