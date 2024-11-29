const express = require("express");
const { EmbedBuilder, WebhookClient } = require('discord.js');

require('dotenv').config({
    path: ".env"
})

const app = express();
const webhookClient = new WebhookClient({ id: process.env.ID, token: process.env.TOKEN });

function msToTime(milliseconds){
    //Get hours from milliseconds
    var hours = milliseconds / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


    return h + ':' + m + ':' + s;
}


app.use(express.static("www"))

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/echo", (req, res) => {
    res.render("echo");
});

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Running on port ${process.env.PORT}`);

    var time = new Date().toLocaleString("en-us", {timeZone: "America/Chicago"}).slice(12,20);

    const embed = new EmbedBuilder()
	.setTitle('Foreign Labs | Website')
	.setColor(0x03fc03)
    .setDescription(`Server Started on ${process.env.PORT}`)
    .setFooter({ text: `Reported at ${time}`});

    webhookClient.send({
        embeds: [embed]
    });
});

module.exports = app