import { loadFixture, } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
  
  describe("MyToken1155", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    const BTC = 0;
    const GOLD = 1;
    const SILVER = 2;
    const AMOUNT_INITIAL_SUPPLY_BTC = 1000000000000000000n;    
    const AMOUNT_INITIAL_SUPPLY_GOLD = 1000000000000000000000000000n;
    const AMOUNT_INITIAL_SUPPLY_SILVER = 1000n;
    async function deployOneYearLockFixture() {
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await hre.ethers.getSigners();
  
      const MyToken1155 = await hre.ethers.getContractFactory("MyToken1155");
      const contract = await MyToken1155.deploy();
  
      return { contract, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Should deploy with initial supply", async function () {
        const { contract, owner } = await loadFixture(deployOneYearLockFixture);
  
        expect(await contract.balanceOf(owner, BTC)).to.equal(AMOUNT_INITIAL_SUPPLY_BTC);
        expect(await contract.balanceOf(owner, GOLD)).to.equal(AMOUNT_INITIAL_SUPPLY_GOLD);
        expect(await contract.balanceOf(owner, SILVER)).to.equal(AMOUNT_INITIAL_SUPPLY_SILVER);
      });

      it("Should burn all initial supply", async function () {
        const { contract, owner } = await loadFixture(deployOneYearLockFixture);

        await contract.burn(owner, BTC, AMOUNT_INITIAL_SUPPLY_BTC);
        await contract.burn(owner, GOLD, AMOUNT_INITIAL_SUPPLY_GOLD);
        await contract.burn(owner, SILVER, AMOUNT_INITIAL_SUPPLY_SILVER);
  
        expect(await contract.balanceOf(owner, BTC)).to.equal(0n);
        expect(await contract.balanceOf(owner, GOLD)).to.equal(0n);
        expect(await contract.balanceOf(owner, SILVER)).to.equal(0n);
      });

      it("Should mint in batch", async function () {
        const { contract, owner } = await loadFixture(deployOneYearLockFixture);
        const tokensId = [BTC, GOLD, SILVER];
        const amountsToMint = [50n, 30n, 10n];
        await contract.mintBatch(owner, tokensId, amountsToMint, "0x");

        expect(await contract.balanceOf(owner, BTC)).to.equal(AMOUNT_INITIAL_SUPPLY_BTC + amountsToMint[0]);
        expect(await contract.balanceOf(owner, GOLD)).to.equal(AMOUNT_INITIAL_SUPPLY_GOLD + amountsToMint[1]);
        expect(await contract.balanceOf(owner, SILVER)).to.equal(AMOUNT_INITIAL_SUPPLY_SILVER + amountsToMint[2]);
      });

      it("Should burn in batch", async function () {
        const { contract, owner } = await loadFixture(deployOneYearLockFixture);
        const tokensId = [BTC, GOLD, SILVER];
        const amountsToBurn = [100n, 100n, 100n];

        await contract.burnBatch(owner, tokensId, amountsToBurn);

        expect(await contract.balanceOf(owner, BTC)).to.equal(AMOUNT_INITIAL_SUPPLY_BTC - amountsToBurn[0]);
        expect(await contract.balanceOf(owner, GOLD)).to.equal(AMOUNT_INITIAL_SUPPLY_GOLD - amountsToBurn[1]);
        expect(await contract.balanceOf(owner, SILVER)).to.equal(AMOUNT_INITIAL_SUPPLY_SILVER - amountsToBurn[2]);
      });
    });

  });
  