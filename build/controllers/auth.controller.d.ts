export = authController;
declare class authController {
    static register: (req: any, res: any, next: any) => Promise<void>;
    static login: (req: any, res: any, next: any) => Promise<void>;
    static all: (req: any, res: any, next: any) => Promise<void>;
}
