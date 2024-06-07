import { getTxClient } from "src/global";
import { AccountCreationProof } from "src/interfaces/proof";
import { ENV, getEnv } from "src/utils/readEnv";


export async function verifyCreateAccount(proof: AccountCreationProof): Promise<string> {
    const {
        client,
        address
    } = await getTxClient();
    const contract = getEnv(ENV.VERIFIER_CONTRACT_ADDRESS);

    try {
        console.log(JSON.stringify({
            account_creation: proof
        }))
        let tx = await client.wasmClient.execute(address, contract, {
            account_creation: proof
        }, Number.parseInt(getEnv(ENV.FEE)))
        return tx.transactionHash;
    } catch (error) {
        throw error;
    }
}
