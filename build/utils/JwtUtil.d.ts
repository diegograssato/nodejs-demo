export declare class JwtUtil {
    static signAccessToken(payload: object): Promise<string>;
    static verifyAccessToken(token: string): Promise<any>;
    private static getTokenSecret;
}
