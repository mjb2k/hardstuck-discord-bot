const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const {Builder, By} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const safari = require('selenium-webdriver/safari');

// to run this troll code we must first calculate the days it has been since
// March 17th, 2019, this can be done by comparing todays date and then
// determing the number of days since March 17th, 2019.
// in addition we need to check if he is plat by looking at OP.GG, refreshing
// his page and then looking at his rank. 

//console side confirmation it's running.
client.on('ready',() => {
	console.log('Hardstuck is running...'); });

let still_plat = true;

async function update() {
let driver = new Builder().forBrowser('safari').build();
//navigates to the website.                                                                                                                                                                              
await driver.get("https://na.op.gg/summoner/userName=egorthepickle");
    //updates the page and determines if he's still Plat.
    console.log('Someone ran the bot');
    //here i need to press the update button and read the results                                                                                                                                    
    try {
	let u_button = 
	driver.findElement(By.id("SummonerRefreshButton"));
	await u_button.click();
    }
    catch (NoSuchElementError){
	console.log('element not found');
    }
    //assuming success on updating the rank, I now read what his rank is.
    let tier = "";
    try {
        tier = await driver.findElement(By.className("TierRank")).getText();
    }
    catch (NoSuchElementError) {
	console.log('tier was not found');
    }
    if (tier.search("Platinum") == -1)
	still_plat = false;

    console.log(tier);
    //closes the webpage after method is complete.
    await driver.quit();
}





//function that runs the command when still? is sent by the user. 
client.on('message', msg => {
        if (msg.content === 'still plat?') {

	    update();
// to run this troll code we must first calculate the days it has been since
// March 17th, 2019, this can be done by comparing todays date and then 
// determing the number of days since March 17th, 2019. 
let days = 0;
today = new Date();
let dd = today.getDate(); //ex: January 22nd, 2021
let mm = today.getMonth()+1;
let yyyy = today.getFullYear();
let i = 0;
//rough way of determing days since, but works for me...
for (i = 0; i < 10000; i++) {
    if (dd != 17 || mm != 3 || yyyy != 2019) {
	++days;
	--dd;
	if (dd == 0) {
	    --mm;
	    //leap year special case
	    if (mm == 2 && (yyyy%4 == 0))
		dd = 29;
	    else if (mm == 2)
		dd = 28;
	    else if (mm == 4 || mm == 6 || mm == 9 || mm == 11)
		dd = 30;
	    else if (mm == 1|| mm == 3|| mm == 5|| mm == 7|| mm == 8|| mm ==10)
		dd = 31;
	    else if (mm == 0) {
		dd = 31;
		mm = 12;
		--yyyy;
	    }
	}
    }
    else
	i = 10001;
}
// after this, our days should be 677 for our example.
	  
//now we run our asyinc function to test if his ranked changed or not


  if (still_plat == false)
		msg.reply('No! Egor is no longer plat!!! Congrats!');
	    else if (days%365 == 0)
		msg.reply('Happy hardstuck plat birthday Egor!');
	    else
	    msg.reply('Yes, Egor is still plat, now '
		      + days + ' days & counting');
	} });
client.login(auth.token);