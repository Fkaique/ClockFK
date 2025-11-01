

function createClock() {
    const clock = document.createElement("div")
    const hour = document.createElement("div")
    const minute = document.createElement("div")
    clock.className = "clock";
    hour.className = "pointer";
    minute.className = "pointer";
    clock.append(hour, minute)
    setAngle(clock, positions[" "])
    return clock
}

/**
 * 
 * @param {HTMLDivElement} clock 
 * @param {[number,number]} angle
 */
function setAngle(clock, angle) {
    /** @type {NodeListOf<HTMLDivElement>}*/
    const pointers = clock.querySelectorAll(".pointer")
    for (let i = 0; i < pointers.length; i++) {
        pointers[i].style.rotate = angle[i] + "deg";
    }
}

function createGrid() {
    const grid = document.createElement("div")
    grid.className = "grid"
    for (let i = 0; i < 24; i++) {
        grid.append(createClock())
    }
    return grid;
}
/**
 * 
 * @param {HTMLDivElement} grid 
 * @param {string} digit 
 */
function setDigit(grid, digit) {
    /**
     * @type {string}
     */
    let chars = digits[digit]
    if (!chars) return
    for (let i = 0; i < chars.length; i++) {
        let clock = grid.children[i]
        setAngle(clock, positions[chars.charAt(i)])
    }
    
}

const positions = {
    "│": [270, 90],
    "─": [0, 180],
    "└": [270, 0],
    "┘": [270, 180],
    "┌": [0, 90],
    "┐": [90, 180],
    " ": [135, 135]
}

const digits = {
    "0": [
        "┌──┐",
        "│┌┐│",
        "││││",
        "││││",
        "│└┘│",
        "└──┘",
    ].join(""),
    "1": [
        "┌─┐ ",
        "└┐│ ",
        " ││ ",
        " ││ ",
        "┌┘└┐",
        "└──┘",
    ].join(""),
    "2": [
        "┌──┐",
        "└─┐│",
        "┌─┘│",
        "│┌─┘",
        "│└─┐",
        "└──┘",
    ].join(""),
    "3": [
        "┌──┐",
        "└─┐│",
        "┌─┘│",
        "└─┐│",
        "┌─┘│",
        "└──┘",
    ].join(""),
    "4": [
        "┌┐┌┐",
        "││││",
        "│└┘│",
        "└─┐│",
        "  ││",
        "  └┘",
    ].join(""),
    "5": [
        "┌──┐",
        "│┌─┘",
        "│└─┐",
        "└─┐│",
        "┌─┘│",
        "└──┘",
    ].join(""),
    "6": [
        "┌──┐",
        "│┌─┘",
        "│└─┐",
        "│┌┐│",
        "│└┘│",
        "└──┘",
    ].join(""),
    "7": [
        "┌──┐",
        "└─┐│",
        "  ││",
        "  ││",
        "  ││",
        "  └┘",
    ].join(""),
    "8": [
        "┌──┐",
        "│┌┐│",
        "│└┘│",
        "│┌┐│",
        "│└┘│",
        "└──┘",
    ].join(""),
    "9": [
        "┌──┐",
        "│┌┐│",
        "│└┘│",
        "└─┐│",
        "┌─┘│",
        "└──┘"
    ].join(""),
}

let clock = Array.from({ length: 6 }, createGrid)

setInterval(() => {
    const date = new Date().toLocaleTimeString("pt-BR",{
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }).replace(/\D/g,"")
    for(let i=0;i<date.length;i++){
        setDigit(clock[i],date.charAt(i))
    }
}, 250)

const clocks = document.getElementById("clocks")

clocks.append(...clock)