export const walletToText = (wallet) => {
  return wallet
    ? `Encrypted Private key: ${wallet.privateKey}\nPublic Key: ${wallet.publicKey}\nAddress: ${wallet.address}`
    : ''
}
