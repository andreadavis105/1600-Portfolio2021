export function getLastNum(url) {
    let end = url.lastIndexOf("/")
    let start = end - 2
    if (url.charAt(start) === "/") {
        start ++
    }
    return +url.slice (start, end) //unary + operator (converts operand (string etc.) to a number)
}

export function removeChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}