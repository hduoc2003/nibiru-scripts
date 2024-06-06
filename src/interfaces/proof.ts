import { u256 } from "./alias";

export interface Groth16Proof {
    p_a: [u256, u256],
    p_b: [[u256, u256], [u256, u256]],
    p_c: [u256, u256]
}

export interface AccountCreationProof {
    relayer_hash: u256,
    email_addr_pointer: u256,
    account_key_commit: u256,
    wallet_salt: u256,
    psi_point: [u256, u256],
    proof: Groth16Proof
}
