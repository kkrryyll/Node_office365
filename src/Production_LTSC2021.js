"use strict";

const https = require("https");

const getBranch = "Production::LTSC2021" + "";
const getFFN = "5030841d-c919-4594-8d2d-84ae4f96e58e";

const getLastUpdated = "--------------";
const getBuild = "----------------";

function print(getBranch, getBuild, getLastUpdated, getFFN) {
    console.log(getBranch + "  " + getBuild + "  " + getLastUpdated + "  " + getFFN);
}

https.get("https://mrodevicemgr.officeapps.live.com/mrodevicemgrsvc/api/v2/C2RReleaseData?audienceFFN=" + getFFN, (getResponse) => {
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

            print(getBranch, getBuild, getLastUpdated, getFFN);
        } else {
            print(getBranch, getBuild, getLastUpdated, getFFN);
        }
    });
}).on("error", (getError) => {
    print(getBranch, getBuild, getLastUpdated, getFFN);
});
