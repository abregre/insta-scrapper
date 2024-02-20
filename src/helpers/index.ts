import crypto from 'crypto';

const SECRET = process.env.tokenSecret || 'topapakipaeistinpotamia';

export const generateRandomString = (): string => {
  return crypto.randomBytes(128).toString('base64');
};
export const authentication = (password: string, salt: string) => {
    return crypto.createHmac('sha256',[salt, password].join('/')).update(SECRET).digest('hex');
}