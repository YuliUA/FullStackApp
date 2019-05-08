Simple Store App - application that allows you to manage your purchases, add products to the list (their price, currency and date of purchase), also you can delete purchase by date and make report of purchases for current year in UAH.(using [fixer.io API](https://fixer.io/))

## Using:
 * Node.JS/Express;
 * React;

## How to install and run App

### git clone
</br>
1. Make sure you installed Node.JS and NPM (I'm using v10.15.3 Node and v6.4.1 NPM).<br/>
2.To clone this App from my repository, you need to execute this command in GitBash:<br/>
  `git clone https://github.com/YuliUA/Intelliarts.git` <br/>
3.Inside root folder run npm i && npm run client-install - these commands will install all dependencies for server and client parts;

### create your API KEY for Fixer.io
You need to logIn on [fixer.io](https://fixer.io/) to have your own access_key.<br/>
Than in a root folder create new file called `.env` and put in:<br/>
 `FIXER_KEY='your own access_key'`;<br/>
 For example: <br>
 `FIXER_KEY=6510a24035a03dfffee80555556089b0`

### npm start
1. You can run `npm run server` to run server part. I'm using nodemon for development;
2. You can run `npm run dev` to run server and client parts of the project;

### contact with me
If you have any questions you always can contact with me by shyx85@gmail.com