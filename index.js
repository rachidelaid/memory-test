let level = 1;
let num = 2;
let arr = [];
let wrong = 0;
let correct = 0;
let clickable = false;
let done = false;

document.querySelector(".start div").addEventListener("click", () => {
  if (!done) {
    document.querySelector(".start").style.display = "none";
    show();
  } else {
    window.location.reload();
  }
});

function highlight(index) {
  return new Promise((res) => {
    document.querySelectorAll("main div")[index].classList.add("clicked");
    setTimeout(() => {
      document.querySelectorAll("main div")[index].classList.remove("clicked");
      res();
    }, 600);
  });
}

async function show() {
  clickable = false;
  arr = [];
  wrong = 0;
  correct = 0;

  for (let i = 0; i < num; i++) {
    if (arr.length == 0) {
      const random = Math.floor(
        Math.random() * document.querySelectorAll("main div").length
      );
      arr.push(random);
      await highlight(random);
    } else {
      let random = Math.floor(
        Math.random() * document.querySelectorAll("main div").length
      );
      while (arr.indexOf(random) >= 0) {
        random = Math.floor(
          Math.random() * document.querySelectorAll("main div").length
        );
      }
      arr.push(random);
      await highlight(random);
    }
  }

  clickable = true;
}

function handleClick() {
  document.querySelectorAll("main div").forEach((elm, i) => {
    elm.addEventListener("click", (e) => {
      if (!clickable) {
        return;
      }

      if (arr.indexOf(i) >= 0) {
        correct++;

        e.target.classList.add("clicked");
      } else {
        wrong++;

        document.querySelector("main").style.borderColor = "red";
        setTimeout(() => {
          document.querySelector("main").style.borderColor = "white";
        }, 500);
      }

      if (wrong == 3) {
        document
          .querySelectorAll("main div")
          .forEach((elm) => elm.classList.remove("clicked"));

        document.querySelector("main").style.borderColor = "red";
        setTimeout(() => {
          document.querySelector("main").style.borderColor = "white";
          show();
        }, 500);
      }

      if (correct == num) {
        level++;
        num++;

        if (level == 4) {
          document.querySelector("main").style.gridTemplateColumns =
            "1fr 1fr 1fr 1fr";
          document.querySelector("main").innerHTML +=
            "<div></div><div></div><div></div><div></div><div></div><div></div><div></div>";
          handleClick();
        } else if (level == 9) {
          document.querySelector("main").style.gridTemplateColumns =
            "1fr 1fr 1fr 1fr 1fr";
          document.querySelector("main").innerHTML +=
            "<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>";
          handleClick();
        } else if (level == 14) {
          done = true;
          document
            .querySelectorAll("main div")
            .forEach((elm) => elm.classList.remove("clicked"));

          document.querySelector(".start").style.display = "flex";
          document.querySelector(".start div").innerText =
            "You Have a Perfect Memory!\n PLAY AGAIN";
        }

        document.querySelector(".details p:nth-child(2)").innerText =
          level + "/14";

        document
          .querySelectorAll("main div")
          .forEach((elm) => elm.classList.remove("clicked"));

        document.querySelector("main").style.borderColor = "green";
        setTimeout(() => {
          document.querySelector("main").style.borderColor = "white";
          show();
        }, 500);
      }
    });
  });
}
handleClick();
