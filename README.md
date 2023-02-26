# autodelegate script

### Install screen
    apt-get install screen
    curl -s https://raw.githubusercontent.com/Vladymirovich/Autodelegate-script/main/prepare-nodejs.sh | bash
### Install NodeJs
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
### Install shelljs --cli
    npm install shelljs --cli
### Download script
    cd && wget -O autodelegate_nibiru.js https://raw.githubusercontent.com/Vladymirovich/Autodelegate-script/main/autodelegate_<name of project>.js
### Edit the file
    nano ~/autodelegate_<name of project>.js

### Set the variables
    // Enter your password
    const PASSWORD = 'wallet_password'

    // Enter your valoper address
    const VALOPER = '.........'

    // Enter your wallet address
    const DELEGATOR = 'wallet_address'

    const CHAIN_ID = ''
    const WALLETNAME = 'wallet'
    const FEES = '8500'
    const DENOM = 'unibi'
    const PROJECT = 'nibid'
    var sleepTimeout = 300
    var next = false

    // Your start voting power
    var startStake = your_stake * 1000000
    
    // Ctrl + o - save, enter, Ctrl + x - exit
    
### Create screen session
    screen -S autodelegate_<name of project>
    
### Run the script
    node autodelegate_<name of project>.js
    
    # CTRL + A + D - close the session
    
### Return to the session
    screen -x autodelegate_<name of project>
