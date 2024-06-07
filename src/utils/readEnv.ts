import 'dotenv/config'

export enum ENV {
    FEE,
    RELAYER_MNEMONIC,
    VERIFIER_CONTRACT_ADDRESS
}

export function getEnv(key: ENV): string {
    switch (key) {
        case ENV.VERIFIER_CONTRACT_ADDRESS:
            return process.env.VERIFIER_CONTRACT_ADDRESS as string;
        case ENV.RELAYER_MNEMONIC:
            return process.env.RELAYER_MNEMONIC as string;
        case ENV.FEE:
            return process.env.FEE as string;
        default:
            throw new Error(`No env key ${key}`);
    }
}
