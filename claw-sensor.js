var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var impact = new five.Sensor({
  pin: "A0",
  freq: 250,
  threshold: 5
});
  var i =0;

  var claw = five.Servo({
      id: 'grabber',
      range: [0, 180],
      pin: 7
    });

  impact.on("data", function() {
    if (this.value >= 600){
      console.log('booom, stop: ', claw.position);
      claw.stop();
    }
  });

  board.repl.inject({
    servo: claw
  });

  claw.to(90, 300);

});
