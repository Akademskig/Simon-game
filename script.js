$("document").ready(function() {
  var y = 1;
  var numArr = [];
  var inputval = [];
  var z = 0;
  //set sounds
  var sound1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
  var sound2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
  var sound3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
  var sound4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
  var soundError = new Audio("http://soundbible.com/grab.php?id=1327&type=wav");
  var soundError2 = new Audio("http://soundbible.com/grab.php?id=172&type=wav");
  var soundSuccess = new Audio("http://soundbible.com/grab.php?id=1003&type=wav");
  // obj variables for strict and on/off
  var strict = {
    strictVal: "off"
  };

  var turnOnOff = {
    turnonoffVal: "off",
    startVal: "off"
  };
  // functions
  function genNumArr() {
    numArr.push(Math.floor((Math.random() * 4) + 1));
    console.log("Array of nums: " + numArr);
    return numArr;
  }

  function light(numArr, i) {
    switch (numArr[i]) {
      case (1):
        $(".blue").addClass("bluelight");
        sound1.play();
        window.setTimeout(function() {
          $(".blue").removeClass("bluelight");
        }, 700);
        break;
      case (2):
        $(".red").addClass("lighton");
        sound2.play();
        window.setTimeout(function() {
          $(".red").removeClass("lighton");
        }, 700);
        break;
      case (3):
        $(".yellow").addClass("yellowlight");
        sound3.play();
        window.setTimeout(function() {
          $(".yellow").removeClass("yellowlight");
        }, 700);
        break;
      case (4):
        $(".green").addClass("greenlight");
        sound4.play();
        window.setTimeout(function() {
          $(".green").removeClass("greenlight");
        }, 700);
        break;
    }
    i = i + 1;
    if (i < numArr.length) {
      window.setTimeout(function() {
        light(numArr, i);
      }, 1000)
    } else {
      return 0;
    }
  }

  function check(inputval, arr) {
    var x = 0;
    for (var j = 0; j < inputval.length; j++) {

      if (arr[j] == inputval[j]) {

        x += 1;
      }
    }
    if (x != inputval.length) {
      if (strict.strictVal == "on") {
        soundError.play();
        numArr = [];
        $(".display").html("Noob!");
        window.setTimeout(function() {
          $(".display").html("00");
        }, 2000)
        window.setTimeout(function() {
          $(".display").html("00");
          genNumArr();
          mainFunc(numArr);
        }, 3000)

      } else if (strict.strictVal == "off") {
        soundError2.play();
        $(".display").html("Go again!");

        window.setTimeout(function() {
          mainFunc(numArr);
        }, 1300)
        window.setTimeout(function() {
          $(".display").html(arr.length - 1);
        }, 800)
      }
    }

    if (x == arr.length && arr.length < 20) {
      $(".display").html(arr.length);

      numArr = genNumArr();
      window.setTimeout(function() {
        mainFunc(numArr);
      }, 1300)
    } 
    else if (arr.length == 20 && x == arr.length) {
      soundSuccess.play();
      turnOnOff.startVal = "off";
      $(".display").html("20!");
      window.setTimeout(function() {
        $(".display").html("Good job!");
      }, 1000)
      window.setTimeout(function() {
        $(".display").html("00");
        return 0;
      }, 3000)
    } else {
      return 0;
    }
  }

  function mainFunc(numArr) {
    inputval = [];
    light(numArr, 0);
  }
  //button functions
  $(".off").on("click", function() {
    turnOnOff.turnonoffVal = "off";
    turnOnOff.startVal = "off";
    $(".lightOnOff").removeClass("lighton");
    $(".display").html("--");
    $(".display").removeClass("displayon");
    $(".off").removeClass("radiobtn").addClass("stron");
    $(".on").removeClass("stron").addClass("radiobtn");
    $(".lightstrict").removeClass("lighton");
  });

  $(".on").on("click", function() {
    turnOnOff.turnonoffVal = "on";
    $(".lightOnOff").addClass("lighton");
    $(".display").html("00");
    $(".display").addClass("displayon");
    $(".on").removeClass("radiobtn").addClass("stron");
    $(".off").removeClass("stron").addClass("radiobtn");
  })

  $(".strict").on("click", function() {
    if (strict.strictVal == "off") {
      $(".lightstrict").addClass("lighton");
      return strict.strictVal = "on";
      console.log(strict.strictVal);
    }
    if (strict.strictVal == "on") {
      $(".lightstrict").removeClass("lighton");
      return strict.strictVal = "off";
    }
  })

  $(".start").on("click", function() {
    if (turnOnOff.turnonoffVal == "on") {
      $(".display").html("00");
      turnOnOff.startVal = "on";
      numArr = [];
      numArr = genNumArr();
      inputval = [];
      mainFunc(numArr);
    }
  })

  $(".blue").on("mousedown", function() {
    if (turnOnOff.turnonoffVal == "on") {
      $(".blue").addClass("bluelight");
      inputval.push(1);
      sound1.play();
    }
  })
  $(".blue").on("mouseup", function() {
    $(".blue").removeClass("bluelight");
  });

  $(".red").on("mousedown", function() {
    if (turnOnOff.turnonoffVal == "on") {
      $(".red").addClass("lighton");
      inputval.push(2);
      sound2.play();
    }
  })
  $(".red").on("mouseup", function() {
    $(".red").removeClass("lighton");
  });

  $(".yellow").on("mousedown", function() {
    if (turnOnOff.turnonoffVal == "on") {
      inputval.push(3);
      sound3.play();
      $(".yellow").addClass("yellowlight");
    }
  });
  $(".yellow").on("mouseup", function() {
    $(".yellow").removeClass("yellowlight");
  });

  $(".green").on("mousedown", function() {
    if (turnOnOff.turnonoffVal == "on") {
      inputval.push(4);
      sound4.play();
      $(".green").addClass("greenlight");
    }
  })
  $(".green").on("mouseup", function() {
    $(".green").removeClass("greenlight");
  });

  $(".b").on("click", function() {
    if (turnOnOff.turnonoffVal == "on" && turnOnOff.startVal == "on") {
      console.log("input: " + inputval);
      check(inputval, numArr);
    }
  })
})