import { DirectSecp256k1HdWallet } from "@nibiruchain/nibijs";

export async function importMnemonic(mnemonic: string): Promise<DirectSecp256k1HdWallet> {
    return await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: "nibi"
    });
}

export async function getAddressFromWallet(wallet: DirectSecp256k1HdWallet): Promise<string> {
    let [{address}] = await wallet.getAccounts();
    return address;
}
