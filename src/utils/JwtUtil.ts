import jwt from "jsonwebtoken";
import { env } from "../env";
// const timeout = process.env.ACCESS_TOKEN_TIMEOUT

export class JwtUtil {
    public static signAccessToken(payload: object): Promise<string> {
        const accessTokenSecret = JwtUtil.getTokenSecret();

        if (!accessTokenSecret) {
            throw new Error();
        }

        return new Promise((resolve, reject) => {
            jwt.sign(
                { payload },
                accessTokenSecret,
                {},
                (err, token: string | undefined) => {
                    if (err) {
                        reject(new Error());
                    }
                    token ? resolve(token) : reject(new Error());
                }
            );
        });
    }

    public static verifyAccessToken(token: string): Promise<any> {
        const accessTokenSecret = JwtUtil.getTokenSecret();

        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecret, {}, (err, payload: any) => {
                if (err) {
                    return reject(err);
                }
                resolve(payload);
            });
        });
    }

    private static getTokenSecret(): string {
        const accessTokenSecret = String(env.security.secret);

        if (!accessTokenSecret) {
            throw new Error();
        }
        return accessTokenSecret;
    }
}
