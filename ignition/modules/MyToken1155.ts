import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MyToken1155Module = buildModule("MyToken1155Module", (m) => {

  const myToken1155 = m.contract("MyToken1155");

  return { myToken1155 };
});

export default MyToken1155Module;
