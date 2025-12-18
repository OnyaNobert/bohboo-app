// src/solana.js
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram
} from "@solana/web3.js";

// Connect to Solana testnet
export const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

// Example: get wallet balance
export async function getWalletBalance(publicKeyString) {
  try {
    const pubkey = new PublicKey(publicKeyString);
    const balance = await connection.getBalance(pubkey);
    return balance / 1e9; // lamports → SOL
  } catch (err) {
    console.error("Error getting balance:", err);
    return 0;
  }
}

// Example: send a transaction (you'll need signing with wallet adapter)
export async function sendTestTransaction(wallet, recipient, lamports) {
  if (!wallet.publicKey) throw new Error("Wallet not connected");

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey(recipient),
      lamports,
    })
  );

  return await wallet.sendTransaction(transaction, connection);
}
