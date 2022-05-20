var terminal = document.getElementById("terminal");
console.log = (m) => terminal.innerHTML = terminal.innerHTML + "\n" + m;
