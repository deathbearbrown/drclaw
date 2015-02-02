module.exports = function(five) {
  return (function() {
    var step = 1023 / 3;

    var ranges = [
      // RELEASE
      [step, (step * 2) - 1],
      // DOWN
      [0, step - 1],
      // UP
      [step * 2, step * 3],
    ];

    function within(value, range) {
      return value >= range[0] && value <= range[1];
    }

    function Lever(pin) {
      five.Sensor.call(this, pin);

      var last = Object.assign({}, new Lever.Event(0x00));

      this.on("data", function() {
        var code = Lever.RELEASE;
        var now = Date.now();
        var pivot, event;

        if (within(this.value, ranges[Lever.DOWN])) {
          code = Lever.DOWN;
        }

        if (within(this.value, ranges[Lever.UP])) {
          code = Lever.UP;
        }

        if (code !== last.code) {
          event = "pivot";
        } else {
          if (code !== Lever.RELEASE && now >= last.timestamp + 100) {
            event = "hold";
          }
        }

        if (event) {
          pivot = new Lever.Event(code);
          this.emit(event, new Lever.Event(code));
        }

        Object.assign(last, pivot);
      });
    }

    Object.defineProperties(Lever, {
      RELEASE: {
        value: 0x00
      },
      DOWN: {
        value: 0x01
      },
      UP: {
        value: 0x02
      },
      NAMES: {
        value: ["idle", "down", "up"]
      }
    });

    Lever.prototype = Object.create(five.Sensor.prototype, {
      constructor: {
        value: Lever
      }
    });

    Lever.Event = function(code) {
      this.type = Lever.NAMES[code];
      this.timestamp = Date.now();
      this.code = code;
    };

    return Lever;
  }());
};
