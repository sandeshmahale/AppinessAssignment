# Welcome to Appiness Rest Api Document 👋

> App-description

## Requirement

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt-get install curl
      $ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
      $ sudo apt-get install -y nodejs

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v10.22.0

    $ npm --version
    6.14.6


### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
      $ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
      $ sudo apt-get update
      $ sudo apt-get install yarn -y

  If the installation was successful, you should be able to run the following command.

    $ yarn --version
    1.22.5

## Install

  To install all the dependencies in the project
    
    yarn install

## Usage

  To run the backend application

    yarn start

  ### OR

  To run the backend application

    pm2 start ecosystem.json ( Install pm2 to run this command )

## API Document

  https://documenter.getpostman.com/view/6038807/TVzPnzAX

## Author

👤 **Sandesh**
