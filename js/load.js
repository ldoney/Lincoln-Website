window.addEventListener('load', function () {
var nano = new TypeIt('#nano', {
	afterComplete: (instance) => {
		document.location.href = "home.html";
	},
	lifeLike: true,
})
.type(' ')
.exec(async () => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve();
    }, 3000)
  });
})
.type('sudo nano "Lincoln Doney"')
.exec(async () => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve();
    }, 1000)
})
});


var ssh = new TypeIt('#ssh', {
	afterComplete: (instance) => {
		document.getElementById("ssh").getElementsByClassName("ti-cursor")[0].style.visibility = "hidden";
		document.getElementById("sshtext").style.visibility = "visible";
		document.getElementById("nanodiv").style.visibility = "visible";
		nano.go();
	},
	lifeLike: true,

})
.type(' ')
.exec(async () => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve();
    }, 1000)
  });
})
.type('ssh user@lincolndoney')
.exec(async () => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve();
    }, 3000)
  });
})



ssh.go();
})
function doc_keyUp(e) {
    if (e.keyCode == 32) {
	document.location.href = "home.html";
    }
}
document.addEventListener('keyup', doc_keyUp, false);
