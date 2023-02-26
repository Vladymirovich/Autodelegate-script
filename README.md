# autodelegate script

## After you download the script, find it in root and rename for each project shold be separete script with project name (autodelegate_nibiru for example)

### Install screen
    apt-get install screen
    curl -s https://raw.githubusercontent.com/Vladymirovich/Autodelegate-script/main/prepare-nodejs.sh | bash
### Install NodeJs
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
### Install shelljs --cli
    npm install shelljs --cli
### Download script
    cd && wget -O autodelegate_name.js https://raw.githubusercontent.com/Vladymirovich/Autodelegate-script/main/autodelegate_name.js
### Edit the file
    nano ~/autodelegate_name.js

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
    
### Create screen session (in stead of name put the name of project)
    screen -S autodelegate_name
    
### Run the script (in stead of name put the name of project)
    node autodelegate_name.js
    
    # CTRL + A + D - close the session
    
### Return to the session (in stead of name put the name of project)
    screen -x autodelegate_name
