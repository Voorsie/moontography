import BigNumber from "bignumber.js";
import DexUtils from "../../factories/DexUtils";
import Web3Modal from "../../factories/web3/Web3Modal";
import ERC20 from "../../factories/web3/ERC20";
import MTGY from "../../factories/web3/MTGY";
import MTGYTrustedTimestamping from "../../factories/web3/MTGYTrustedTimestamping";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  async init({ commit, dispatch, getters, state }, reset = false) {
    try {
      commit("SET_GLOBAL_ERROR", null);
      dispatch("getMtgyPriceUsd");
      if (state.web3 && state.web3.isConnected && !reset) return;
      if (state.activeNetwork === "xlm") return;

      const { web3 } = await Web3Modal.connect();
      commit("SET_WEB3_INSTANCE", web3);

      const isConnected = true;
      commit("SET_WEB3_IS_CONNECTED", isConnected);
      if (!isConnected) {
        return commit(
          "SET_GLOBAL_ERROR",
          new Error(`User not connected. Please connect to your wallet.`)
        );
      }

      const resetConnection = async () => {
        dispatch("disconnect");
        await dispatch("init", true);
      };
      Web3Modal.bindProviderEvents({
        accountsChanged: resetConnection,
        chainChanged: resetConnection,
        disconnect: () => dispatch("disconnect"),
      });

      commit("SET_WEB3_CHAIN_ID", await web3.eth.getChainId());
      if (!getters.activeNetwork) {
        throw new Error(
          `The selected network is not supported. Please connect to a supported network, ${state.eth.networks
            .map((n) => n.name)
            .join(", ")}`
        );
      }

      const [accountAddy] = await web3.eth.getAccounts();
      commit("SET_WEB3_USER_ADDRESS", accountAddy);

      await dispatch("getHashes");
    } catch (err) {
      toast.error(err.message || err);
      commit("SET_GLOBAL_ERROR", err);
    } finally {
      commit("SET_INIT_LOADING", false);
    }
  },

  disconnect({ commit }) {
    commit("SET_WEB3_INSTANCE", null);
    commit("SET_WEB3_IS_CONNECTED", false);
    commit("SET_WEB3_CHAIN_ID", null);
    commit("SET_WEB3_USER_ADDRESS", "");
    commit("SET_TRUSTED_TIMESTAMPING_HASHES", []);
  },

  // async ethCheckApprovalStatusForTokenContract({ getters, state, commit }) {
  //   const userAddy = state.web3.address;
  //   if (!userAddy) {
  //     commit("SET_WEB3_IS_CONNECTED", false);
  //     return;
  //   }

  //   const web3 = state.web3.instance;
  //   const mtgyAddress = getters.activeNetwork.contracts.mtgy;
  //   const trustedTimestampingAddress =
  //     getters.activeNetwork.contracts.trustedTimestamping;
  //   const contract = MTGY(web3, mtgyAddress);
  //   const ttCont = MTGYTrustedTimestamping(web3, trustedTimestampingAddress);
  //   const [timestampAllowance, currentCost] = await Promise.all([
  //     contract.methods.allowance(userAddy, trustedTimestampingAddress).call(),
  //     ttCont.methods.cost().call(),
  //   ]);
  //   const isApprovedAlready = new BigNumber(timestampAllowance).gte(
  //     currentCost
  //   );
  //   commit("SET_WEB3_IS_APPROVED", isApprovedAlready);
  // },

  // async ethApproveTokenContract(
  //   { getters, state, commit },
  //   { address, amount }
  // ) {
  //   try {
  //     const web3 = state.web3.instance;
  //     const userAddy = state.web3.address;
  //     const mtgyAddress = getters.activeNetwork.contracts.mtgy;
  //     // const trustedTimestampingAddress =
  //     //   getters.activeNetwork.contracts.trustedTimestamping;
  //     const mtgyCont = MTGY(web3, mtgyAddress);
  //     await mtgyCont.methods.approve(address, amount).send({ from: userAddy });
  //     commit("SET_WEB3_IS_APPROVED", true);
  //   } catch (err) {
  //     toast.error(err.message || err);
  //     commit("SET_WEB3_IS_APPROVED", false);
  //     commit("SET_GLOBAL_ERROR", err);
  //   }
  // },

  async sendTrustedTimestampTxn(
    { getters, state },
    { hash, fileName, fileSize }
  ) {
    const userAddy = state.web3.address;
    const mtgyAddy = getters.activeNetwork.contracts.mtgy;
    const trustedTimestampingAddress =
      getters.activeNetwork.contracts.trustedTimestamping;
    const { web3 } = await Web3Modal.connect();
    const mtgyCont = MTGY(web3, mtgyAddy);
    const ttCont = MTGYTrustedTimestamping(web3, trustedTimestampingAddress);

    // make sure the current user has allowed the appropriate amount of MTGY to
    // spend on the timestamping service
    const [currentApprovalAmount, currentTtCost] = await Promise.all([
      mtgyCont.methods.allowance(userAddy, trustedTimestampingAddress).call(),
      ttCont.methods.cost().call(),
    ]);
    if (new BigNumber(currentApprovalAmount).lt(currentTtCost)) {
      await mtgyCont.methods
        .approve(trustedTimestampingAddress, currentTtCost)
        .send({ from: userAddy });
    }

    // Store the hash if we haven't bombed out yet
    await ttCont.methods
      .storeHash(hash, fileName, fileSize)
      .send({ from: userAddy });
  },

  async getHashes({ commit, state, getters }) {
    const web3 = state.web3.instance;
    const userAddy = state.web3.address;
    const trustedTimestampingAddress =
      getters.activeNetwork.contracts.trustedTimestamping;
    const ttCont = MTGYTrustedTimestamping(web3, trustedTimestampingAddress);
    const hashes = await ttCont.methods.getHashesFromAddress(userAddy).call();
    commit("SET_TRUSTED_TIMESTAMPING_HASHES", hashes);
  },

  async getMtgyPriceUsd({ commit }) {
    const price = await DexUtils.getTokenPrice(
      "0x025c9f1146d4d94F8F369B9d98104300A3c8ca23"
    );
    commit("SET_MTGY_PRICE_USD", price);
  },

  async setUserInfoForToken({ commit, state }, tokenAddy) {
    const userAddy = state.web3.address;
    const contract = ERC20(state.web3.instance, tokenAddy);
    const [name, symbol, decimals, userBalance] = await Promise.all([
      contract.methods.name().call(),
      contract.methods.symbol().call(),
      contract.methods.decimals().call(),
      contract.methods.balanceOf(userAddy).call(),
    ]);

    commit("SET_SELECTED_ADDRESS_INFO", {
      name,
      symbol,
      decimals,
      userBalance: new BigNumber(userBalance)
        .div(new BigNumber(10).pow(decimals))
        .toString(),
    });
  },
};
