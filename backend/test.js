"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var backend_1 = require("./backend");
//var check = login("anushamish", "password");
//console.log(check);
var check2 = (0, backend_1.addChallenge)("Drink Water", 2, "Drinking water is good for you");
console.log(check2);
