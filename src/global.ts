import { NibiruTxClient, Testnet } from "@nibiruchain/nibijs";
import { importMnemonic } from "./utils/wallet";
import { ENV, getEnv } from "./utils/readEnv";

export const CHAIN = Testnet(1);

export async function getTxClient() {
    const relayer = await importMnemonic(getEnv(ENV.RELAYER_MNEMONIC));
    const [{address}] =  await relayer.getAccounts();
    return {
        client: await NibiruTxClient.connectWithSigner(CHAIN.endptTm, relayer),
        address
    };
}
