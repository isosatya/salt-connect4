(function() {
  var currentPlayer = "player1";
  var p1 = 0;
  var p2 = 0;
  var audio;
  var allSlots = $(".hole");
  var diagComb = [
    [allSlots.eq(0), allSlots.eq(7), allSlots.eq(14), allSlots.eq(21)],
    [allSlots.eq(1), allSlots.eq(8), allSlots.eq(15), allSlots.eq(22)],
    [allSlots.eq(8), allSlots.eq(15), allSlots.eq(22), allSlots.eq(29)],
    [allSlots.eq(2), allSlots.eq(9), allSlots.eq(16), allSlots.eq(23)],
    [allSlots.eq(14), allSlots.eq(21), allSlots.eq(28), allSlots.eq(35)],
    [allSlots.eq(7), allSlots.eq(14), allSlots.eq(21), allSlots.eq(28)],
    [allSlots.eq(6), allSlots.eq(13), allSlots.eq(20), allSlots.eq(27)],
    [allSlots.eq(13), allSlots.eq(20), allSlots.eq(27), allSlots.eq(34)],
    [allSlots.eq(20), allSlots.eq(27), allSlots.eq(34), allSlots.eq(41)],
    [allSlots.eq(12), allSlots.eq(19), allSlots.eq(26), allSlots.eq(33)],
    [allSlots.eq(19), allSlots.eq(26), allSlots.eq(33), allSlots.eq(40)],
    [allSlots.eq(18), allSlots.eq(25), allSlots.eq(32), allSlots.eq(39)],
    [allSlots.eq(18), allSlots.eq(13), allSlots.eq(8), allSlots.eq(3)],
    [allSlots.eq(24), allSlots.eq(19), allSlots.eq(14), allSlots.eq(9)],
    [allSlots.eq(19), allSlots.eq(14), allSlots.eq(9), allSlots.eq(4)],
    [allSlots.eq(30), allSlots.eq(25), allSlots.eq(20), allSlots.eq(15)],
    [allSlots.eq(25), allSlots.eq(20), allSlots.eq(15), allSlots.eq(10)],
    [allSlots.eq(20), allSlots.eq(15), allSlots.eq(10), allSlots.eq(5)],
    [allSlots.eq(36), allSlots.eq(31), allSlots.eq(26), allSlots.eq(21)],
    [allSlots.eq(31), allSlots.eq(26), allSlots.eq(21), allSlots.eq(16)],
    [allSlots.eq(26), allSlots.eq(21), allSlots.eq(16), allSlots.eq(11)],
    [allSlots.eq(37), allSlots.eq(32), allSlots.eq(27), allSlots.eq(22)],
    [allSlots.eq(32), allSlots.eq(27), allSlots.eq(22), allSlots.eq(17)],
    [allSlots.eq(38), allSlots.eq(33), allSlots.eq(28), allSlots.eq(23)]
  ];

  if (
    localStorage.getItem("pointsp1", p1) > 0 ||
    localStorage.getItem("pointsp1", p2) > 0
  ) {
    p1 = localStorage.getItem("pointsp1", p1);
    p2 = localStorage.getItem("pointsp2", p2);
    $("#pointsp1").text(`${localStorage.getItem("pointsp1", p1)}`);
    $("#pointsp2").text(`${localStorage.getItem("pointsp2", p2)}`);
  }

  $(".column").on("click", function(e) {
    var currCol = $(e.currentTarget).find(".hole");
    audio = document.getElementById("jump");
    audio.play();

    for (var i = 5; i >= 0; i--) {
      if (
        !currCol.eq(i).hasClass("player1") &&
        !currCol.eq(i).hasClass("player2")
      ) {
        currCol.eq(i).addClass(currentPlayer);

        break;
      }
    }

    if (i == -1) {
      return;
    }

    function victory(direction) {
      var count = 0;
      for (i = 0; i < direction.length; i++) {
        if (direction.eq(i).hasClass(currentPlayer)) {
          count++;
          // console.log(count);
          if (count == 4) {
            return true;
          }
        } else {
          count = 0;
        }
      }
    }

    function diagonal(diagComb) {
      for (var i = 0; i < diagComb.length; i++) {
        for (var j = 0; j < diagComb[i].length; j++) {
          if (!diagComb[i][j].hasClass(currentPlayer)) {
            break;
          }
        }
        if (j == 4) {
          return true;
        }
      }
      return null;
    }

    var currRow = $(".row" + i).find(".hole");
    if (victory(currCol)) {
      win();
      return;
    } else if (victory(currRow)) {
      win();
      return;
    } else if (diagonal(diagComb)) {
      win();
      return;
    }

    function win() {
      setTimeout(function() {
        audio = document.getElementById("win");
        audio.play();

        $(".board").addClass("win");

        if (currentPlayer == "player1") {
          p1++;
          localStorage.setItem("pointsp1", p1);
          $("#pointsp1").text(`${p1}`);
        } else {
          p2++;
          localStorage.setItem("pointsp2", p2);
          $("#pointsp2").text(`${p2}`);
        }

        $("#banner")
          .css({
            color: currentPlayer == "player1" ? "#ff00ff" : "#0000ff"
          })
          .html(`<h1>${currentPlayer} wins!!!</h1>`)
          .addClass("on");
        $(".column").off();
      }, 300);

      // setTimeout(function() {
      //     location.reload();
      //     $("#banner").removeClass("on");
      // }, 5800);
    }

    if (currentPlayer == "player1") {
      currentPlayer = "player2";
    } else {
      currentPlayer = "player1";
    }
  });

  $("#reset").on("click", function() {
    audio = document.getElementById("resetsound");
    audio.play();
    setTimeout(function() {
      location.reload();
      localStorage.setItem("pointsp1", 0);
      localStorage.setItem("pointsp2", 0);
    }, 1500);
  });

  $("#again").on("click", function() {
    audio = document.getElementById("playagain");
    audio.play();
    setTimeout(function() {
      location.reload();
    }, 1500);
  });
})();
