
const nouns = [
    "house", "car", "computer", "book", "table", "chair",
    "pen", "phone", "tree", "dog", "cat", "school", 
    "city", "ocean", "mountain", "lamp", "window", "key", 
    "pencil", "plane"
]
const grid = document.getElementById("wordle-grid")
const check_button = document.getElementById("check")



let start_game = function(){
    const randomIndex = Math.floor(Math.random() * nouns.length);
    target_word = nouns[randomIndex];
    console.log(target_word)
    wordlen = target_word.length
    numrow= 6
    row_filled = 0
    grid.innerHTML = '';
    for(let i = 0; i<numrow; i++){
        let row = document.createElement("div")
        row.classList.add("row")
        for(let j = 0; j<wordlen; j++){
            const input = document.createElement("input")
            input.type = "text"
            input.disabled = true 
            input.classList.add("cell")
            input.maxLength = 1
            row.appendChild(input)
        }
        grid.appendChild(row)
    }
    main()
}

let input_row = function(row, index, rows){
    const cells = Array.from(row.children)
    let is_row_filled = function() {
        return cells.every(cell => cell.value.trim() !== "");
    };
    cells.forEach((cell, i) => {
        cell.addEventListener("input", function(){
            if(cell.value.length === 1){
                if(i < cells.length - 1){
                    cells[i+1].focus()
                }
            }
        })
        cell.addEventListener("keydown", function(e) {
            if (e.key === "ArrowRight" && i < cells.length - 1) {
                e.preventDefault();  
                cells[i + 1].focus();  
            } else if (e.key === "ArrowLeft" && i > 0) {
                e.preventDefault();  
                cells[i - 1].focus();  
            }
            if (e.key === "Enter" && is_row_filled()) {
                e.preventDefault(); 
                cells.forEach(cell => {
                    cell.disabled = true;  // tắt mỗi ô trong hàng
                });
                let word = cells.map(cell => cell.value).join('');
                row_filled++
                handle_answer(word, row,index,rows)
            }
            if (e.key === "Backspace" && cell.value === "" && i > 0) {
                cells[i - 1].focus();  // Di chuyển con trỏ về ô trước
            }
        });
    })

}
let handle_answer = function(a,row,index,rows){
    let cells = Array.from(row.children)
    let array1 = []; // Mảng 1: a[i] === b[i]
    let array2 = []; // Mảng 2: a[i] tồn tại trong b nhưng không trong mảng 1
    let array3 = []; // Mảng 3: a[i] không tồn tại trong b

    for (let i = 0; i < a.length; i++) {
        if (a[i] === target_word[i]) {
            array1.push(i);
        }
        else if (target_word.indexOf(a[i]) === -1) {
            array3.push(i);
        }
    }
    for (let i = 0; i < a.length; i++) {
        if (array1.indexOf(i) === -1 && target_word.indexOf(a[i]) !== -1) {
            array2.push(i);
        }
    }
    for (let i = 0; i < cells.length; i++) {
        if (array1.includes(i)) {  // Kiểm tra nếu i có trong array1
            cells[i].style.backgroundColor = "green";
        }
        else if (array2.includes(i)) {  // Kiểm tra nếu i có trong array2
            cells[i].style.backgroundColor = "yellow";
        }
        else {
            cells[i].style.backgroundColor = "grey";
        }
    }
    if(row_filled < numrow){
        const cells = Array.from(rows[index+1].children)
        cells.forEach(cell => {
            cell.disabled = false;  // Bật mỗi ô trong hàng
        });
    }
    if (a === target_word) {
        console.log("win")
        grid.innerHTML = '';
    }
    else if(row_filled === numrow){
        console.log("lose")
        grid.innerHTML = '';
    }
    
}
let main = function(){
    let rows = document.getElementsByClassName("row")
    rows = Array.from(rows)
    const cells = Array.from(rows[0].children)
    cells.forEach(cell => {
        cell.disabled = false;  // Bật mỗi ô trong hàng
    });

    rows.forEach((row, index) => {
        input_row(row, index,rows);  // Gọi hàm input_row cho từng hàng
    });
    
}



check_button.addEventListener("click", start_game)




