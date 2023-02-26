const shell = require("shelljs");

// Enter your password
const PASSWORD = '........'

// Enter your valoper address
const VALOPER = '.........'

// Enter your wallet address
const DELEGATOR = '.........'

const CHAIN_ID = '.........'
const WALLETNAME = 'wallet'
const FEES = '.........'
const DENOM = 'ario'
const PROJECT = '.........'
var sleepTimeout = 60
var next = false

// Your start voting power
var startStake = your current stake * 1000000

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function getBalance() {
    const cmdGetBalance = `${PROJECT} q bank balances ${DELEGATOR} -o json | jq -r '.balances | .[].amount'`
    const result = shell.exec(cmdGetBalance, {shell: '/bin/bash', silent: true});
    const data = result.stdout + result.stderr;
    return data.split('\n')[0];
}

function getTimeout(rewards, sleepTimeout) {
    const reward_per_sec = rewards / sleepTimeout;
    const procent = reward_per_sec / startStake;
    const time = Math.sqrt((+FEES * 2) / (reward_per_sec * procent));
    console.log('time', sleepTimeout, 'rewards', rewards);
    console.log('reward_per_sec:', reward_per_sec);
    console.log('procent:', procent);
    console.log('startStake', startStake);
    //console.log(+FEES * 2);
    return time;
    
}

(async function() {
    while (true) {
        const startBalance = Number.parseInt(getBalance()) - +FEES * 1000;
        const cmdGetReward = `echo -e "${PASSWORD}\\ny\\n" | ${PROJECT} tx distribution withdraw-rewards ${VALOPER} --chain-id ${CHAIN_ID} --from ${WALLETNAME} --commission --fees ${FEES}${DENOM} --gas=300000 -y`
        console.log('Reward');
        console.log(cmdGetReward);
        
        const reward = shell.exec(cmdGetReward, {shell: '/bin/bash', silent: true});
        console.log(reward.stdout + reward.stderr);
        console.log('Balance', getBalance());

        /*await sleep(1000 * 6);
        const cmdGetAllReward = `echo -e "${PASSWORD}\\n${PASSWORD}\\n" | ${PROJECT} tx distribution withdraw-all-rewards --from ${DELEGATOR} --chain-id ${CHAIN_ID} --fees 12500${DENOM} --gas=500000 -y`;
        console.log('All reward');
        console.log(cmdGetAllReward);
        const allReward = shell.exec(cmdGetAllReward, {shell: '/bin/bash', silent: true});
        console.log(allReward.stdout + allReward.stderr);
        console.log('Balance', getBalance());*/
        
        await sleep(1000 * 10);
        const balance = Number.parseInt(getBalance()) - +FEES * 1000;
        const cmdStakeAll = `echo -e "${PASSWORD}\\n${PASSWORD}\\n" | ${PROJECT} tx staking delegate ${VALOPER} ${balance}${DENOM} --from ${DELEGATOR} --chain-id ${CHAIN_ID} --fees ${FEES}${DENOM} --gas=300000 -y`;
        console.log('Stake all');
        const stakeAll = shell.exec(cmdStakeAll, {shell: '/bin/bash', silent: true});
        console.log(stakeAll.stdout + stakeAll.stderr);
        
        if (next) {
          const rewards = balance - startBalance + +FEES * 2;
          sleepTimeout = getTimeout(rewards, sleepTimeout);
          startStake = startStake + rewards - +FEES * 2;
        }
        
        console.log('sleepTimeout', sleepTimeout)
        await sleep(1000 * sleepTimeout);
        next = true

        if (+sleepTimeout < 10) {
          sleepTimeout = 60
        }

    }
})();
