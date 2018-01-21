/**
 * Created by Nikhil Peter on 04-11-2017.
 */

let slotRes = {
    button : "button.png",
    Symbol_0 : "Symbol_0.png",
    Symbol_1 : "Symbol_1.png",
    Symbol_2 : "Symbol_2.png",
    Symbol_3 : "Symbol_3.png",
    Symbol_4 : "Symbol_4.png",
    Symbol_5 : "Symbol_5.png"
};

let initResources = [];
for(let key in slotRes)
{
    initResources.push("res/fruitslot/" + slotRes[key]);
}


let noInternetRes = {
    Layout :  "NoInternetPopup_Layout.json"
};

for(let key in noInternetRes)
{
    initResources.push("res/popups/" + noInternetRes[key]);
}