const io = new IntersectionObserver(e=>{
  e.forEach(x=>x.isIntersecting&&x.target.classList.remove('opacity-0','translate-y-10'))
},{threshold:.2})

document.querySelectorAll('.lazy').forEach(el=>io.observe(el))



//xo
const cells = document.querySelectorAll("#tl,#tm,#tr,#ml,#mm,#mr,#bl,#bm,#br")
const xIcon = document.getElementById("x")
const oIcon = document.getElementById("o")

let turn = "X"
let board = ["","","","","","","","",""]

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

cells.forEach((cell, i) => {
  cell.addEventListener("click", () => play(cell, i))
})

function play(cell, index) {
  if (board[index]) return

  const currentPlayer = turn

  board[index] = currentPlayer
  cell.innerHTML = currentPlayer === "X"
    ? xIcon.outerHTML
    : oIcon.outerHTML

  if (checkWin(currentPlayer)) {
    setTimeout(() => alert(`${currentPlayer} wins!`), 100)
    reset()
    return
  }

  if (board.every(cell => cell !== "")) {
    setTimeout(() => alert("Draw!"), 100)
    reset()
    return
  }

  turn = currentPlayer === "X" ? "O" : "X"
}



function checkWin() {
  return winPatterns.some(p => p.every(i => board[i] === turn))
}

function reset() {
  board.fill("")
  cells.forEach(c => c.innerHTML = "")
  turn = "X"
}
