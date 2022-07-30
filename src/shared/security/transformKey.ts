export function transformKey(key: string | undefined): string{

    if(!key)
        throw new Error("No key");

    const newKey = Buffer.from(key, 'base64').toString('ascii')

    return newKey;
}