'use strict';
const choreDefinitions = require('./chores.json')
const config = require('./config.json')

const MANDATORY_CHORE_PROPERTIES = ['period', 'offset', 'doer']; // 'name' is implicit
const LOCALE = "en-us"

function validateChores (chores) {
    for (var i = 0; i <= chores.length - 1; i++) {
        var chore = chores[i];
        if (chore.name == null) throw "Chore is missing a name"
        for (var prop of MANDATORY_CHORE_PROPERTIES) {
            if (chore[prop] == undefined) throw "Chore \"" + chore.name + "\" is missing: " + prop
        }
    }
}

Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

function printCalendar (calendar, choreDay) {
    var startingDate = new Date();
    startingDate.setMonth(0, 1);
    for (var weekday = 0; weekday <= 7; weekday ++) {
        if (startingDate.toLocaleString(LOCALE, { weekday: "long" }) == choreDay) {
            break;
        } else if (weekday == 7) {
            throw "Error: configured chore day \"" + choreDay + "\" is invalid in locale " + LOCALE
        } else {
            startingDate = startingDate.addDays(1);
        }
    }
    for (var week = 0; week <= calendar.length - 1; week++) {
        console.log(startingDate.toDateString() + " (week " + (week + 1) + "):")
        for (var person in calendar[week]) {
            console.log("    " + person + ": " + calendar[week][person])
        }
        startingDate = startingDate.addDays(7);
    }
}

function generateWeeklyCalendar (chores) {
    var calendar = [];

    for (var week = 0; week < 52; week++) {
        var thisWeek = {};
        for (var i = 0; i <= chores.length - 1; i++) {
            var c = chores[i];
            if (week % (c.period + c.offset) == 0) {
                thisWeek[c.doer] = (thisWeek[c.doer] ? thisWeek[c.doer] + "; " : "") + c.name
            }
        }
        calendar[week] = thisWeek;
    }

    return calendar;
}

validateChores(choreDefinitions);
printCalendar(generateWeeklyCalendar(choreDefinitions), config.choreDay);
