{
    const squareList = [];

    const setup = () => {
        // 爆弾を置くマスを決定
        const bombCount = 10;
        const numbers = Array.from({ length: 100 }, (_, i) => i);
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        const randomList = numbers.slice(0, bombCount);

        // マスを作る
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const square = document.createElement("div");
                square.classList.add("square");
                square.dataset.y = i;
                square.dataset.x = j;
                square.setAttribute("bomb", false);
                square.value = 0;
                square.textContent = square.value;
                document.getElementById("game").appendChild(square);
                squareList.push(square);
            }
        }
        // 爆弾を設置
        randomList.forEach(num => {
            const [y, x] = numToCoordinate(num);
            console.log(y, x);
            const square = squareList[coordinateToNum(y, x)];
            square.setAttribute("bomb", true);
            square.value = "💣";
            square.textContent = square.value;
            // 周囲のマスの値を1増やす
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dy === 0 && dx === 0) continue;
                    const ny = y + dy;
                    const nx = x + dx;
                    if (ny < 0 || ny >= 10 || nx < 0 || nx >= 10) continue;
                    const neighborSquare = squareList[coordinateToNum(ny, nx)];
                    if (neighborSquare.getAttribute("bomb") === "true") continue;
                    neighborSquare.value++;
                    console.log(neighborSquare);
                    neighborSquare.textContent = neighborSquare.value;
                }
            }
        });
    }

    const game = () => {
        const squares = document.getElementsByClassName("square");
        // クリック操作
        Array.from(squares).forEach(square => {
            const y = Number(square.dataset.y);
            const x = Number(square.dataset.x);
            square.addEventListener("click", () => {
                open(y, x);
            });
            square.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                flag(y, x);
            });
        });
    }

    const open = (y, x) => {
        const square = squareList[coordinateToNum(y, x)];
        if (!square.classList.contains("opened") && !square.classList.contains("flag")) {
            square.classList.add("opened");
        }
    }

    const flag = (y, x) => {
        const square = squareList[coordinateToNum(y, x)];
        if (!square.classList.contains("opened")) {
            square.classList.toggle("flag");
            square.textContent = square.classList.contains("flag") ? "🚩" : square.value;
        }
    }

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * max) + min;
    }

    const numToCoordinate = (num) => {
        const y = Math.floor(num / 10);
        const x = num % 10;
        return [y, x];
    }

    const coordinateToNum = (y, x) => {
        return y * 10 + x;
    }

    setup();
    console.log(squareList);
    game();
}
