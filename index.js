// Import the web3js library, set Infura as our provider
const {Web3} = require('web3');

const USDTContract = require('./usdtAbi.json');

const usdtTokenAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const toAddress = "0xa6D4462A24D0CAC66bf6cb679Efe3b90CF741f75";
// you must have a valid private key for this script to work, otherwise it will throw an error
const privateKey = "0x0000000000000000000000000000000000000000000000000000000000000000";

async function main() {
  // add the address from your locally running geth provider
  const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/{infura_api_key}'));

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    privateKey
  );
  web3.eth.accounts.wallet.add(signer);

  // Define the USDT ERC-20 token contract
  const contract = new web3.eth.Contract(USDTContract.abi, usdtTokenAddress);

  // mwei is equals to 1000000, since usdt works with 6 decimals, this is what you need
  // if you leave it as it is you are sending 100 USDT
  const amount = web3.utils.toHex(web3.utils.toWei("100", "mwei"));
  console.log(amount);

  contract.methods.transfer(toAddress, amount).send({
    from: signer.address,
    gas: 5000000
  }).then(console.log).catch(console.error);
}

main();