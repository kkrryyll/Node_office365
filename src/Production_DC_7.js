"use strict";

const https = require("https");

const getName = "Semi-Annual Enterprise Channel                      ";
const getBranch = "Production::DC" + "      ";
const getFFN = "7ffbc6bf-bc32-4f92-8982-f9dd17fd3114";

const getLastUpdated = "--------------";
const getBuild = "----------------";

function print(getName, getBranch, getBuild, getLastUpdated, getFFN) {
    console.log(getName + "|" + getBranch + "|" + getBuild + "|" + getLastUpdated + "|" + getFFN + "|");
}

https.get("https://mrodevicemgr.officeapps.live.com/mrodevicemgrsvc/api/v2/C2RReleaseData?audienceFFN=" + getFFN + "&osver=Client|6.1", (getResponse) => {
    getResponse.on("data", (getData) => {
        if (getResponse.statusCode === 200) {
            const getParsedData = JSON.parse(getData);

            const getYear = getParsedData.TimestampUtc.substring(6, 10);
            const getMonth = getParsedData.TimestampUtc.substring(0, 2);
            const getDay = getParsedData.TimestampUtc.substring(3, 5);
            const getHour = getParsedData.TimestampUtc.substring(11, 13);
            const getMinute = getParsedData.TimestampUtc.substring(14, 16);

            const getDate = getDay + "." + getMonth + "." + getYear;
            const getTime = getHour + ":" + getMinute;

            const getLastUpdated = getDate + " " + getTime;

            const getBuild = getParsedData.AvailableBuild;

            print(getName, getBranch, getBuild, getLastUpdated, getFFN);
        } else {
            print(getName, getBranch, getBuild, getLastUpdated, getFFN);
        }
    });
}).on("error", (getError) => {
    print(getName, getBranch, getBuild, getLastUpdated, getFFN);
});
