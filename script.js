{
    const squareList = [];

    setup();

    squareList[0][0].setAttribute("bomb", true);

    game();

    // ゲーム
    function game() {
        const squares = document.getElementsByClassName("square");
        // クリック操作
        Array.from(squares).forEach(square => {
            const y = square.dataset.y;
            const x = square.dataset.x;
            square.addEventListener("click", () => {
                open(y, x);
            });
            square.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                flag(y, x);
            });
        });
    }
    
    // 初期設定
    function setup() {
        for (let i = 0; i < 10; i++) {
            const squareRow = [];
            for (let j = 0; j < 10; j++) {
                const square = document.createElement("div");
                square.classList.add("square");
                square.dataset.y = i;
                square.dataset.x = j;
                square.setAttribute("bomb", false);
                document.getElementById("game").appendChild(square);
                squareRow.push(square);
            }
            squareList.push(squareRow);
        }
    }

    // マスを開く
    function open(y, x) {
        const square = squareList[y][x];
        if (!square.classList.contains("opened") && !square.classList.contains("flag")) {
            square.classList.add("opened");
        }
    }

    // マスに旗を立てる
    function flag(y, x) {
        const square = squareList[y][x];
        if (!square.classList.contains("opened")) {
            square.classList.toggle("flag");
            square.textContent = square.classList.contains("flag") ? "🚩" : "";
        }
    }
}
