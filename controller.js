var five = require("johnny-five");
var Lever = require("./lever")(five);
var board = new five.Board();

board.on("ready", function() {

  var pins = [1, 2, 3, 4, 5];
  var levers = pins.map(function(pin) {
    return new Lever(pin);
  });

  levers.forEach(function(lever) {
    ["hold", "pivot"].forEach(function(type) {
      lever.on(type, function(event) {
        console.log("%s Lever: %s", type.toUpperCase(), "A" + lever.pin, Lever.NAMES[event.code]);
      })
    });
  });
});
