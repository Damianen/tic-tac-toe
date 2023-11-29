const displayController = (() => {
    const buttons = document.querySelectorAll(".btn");
    const winnerText = document.querySelector(".winner-text");
    const resetButton = document.querySelector(".reset-btn");
    
    const init = () => {
        buttons.forEach((btn) => {
            btn.addEventListener('click', () => game.playRound(btn));
        });
        resetButton.addEventListener('click', () => {
            reset();
            gameBoard.reset();
            game.reset();
            winnerText.textContent = "Game Ongoing";
        })
    }

    const reset = () => {
        buttons.forEach((btn) => {btn.textContent = ''});
    }

    const setButtonText = (buttonNr, char) => {
        buttons[buttonNr].textContent = char;
    }
    
    const setWinnerText = (char) => {
        winnerText.textContent = `${winner} has won the game!`;
    }
    
    return { 
        initialize: () => init(),
        reset: () => reset(),
        setButtonTxt: (btnNr, char) => setButtonText(btnNr, char),
        setWinnerTxt: (char) => setWinnerText(char)
    }
})();

const game = (() => {
    const players = [createPlayer("X"), createPlayer("O")];
    let currentPlayer = 0;
    let onGoing = true;

    const checkPosition = (btn) => {
        if (!onGoing) { return }; 
        row = parseInt(btn.parentElement.className[3]);
        column = parseInt(btn.classList[1]);
        if (gameBoard.addToBoard(row, column, players[currentPlayer].char)) {
            playRound((row * 3) + column);
        }
    }

    const playRound = (btnNr) => {
        displayController.setButtonTxt(btnNr, players[currentPlayer].char);
        winner = gameBoard.checkForWin();
        if (winner != 0) {
            if (winner === "draw") { winner = "No one"; }
            displayController.setWinnerTxt(winner);
            onGoing = false;
        }
        currentPlayer = (currentPlayer + 1) % 2;
    }

    const reset = () => {
        onGoing = true;
        currentPlayer = 0;
    }

    return { 
        playRound: (btn) => checkPosition(btn),
        reset: () => reset()
    }
})();

const gameBoard = (() => {
    const board = [['', '', ''],['', '', ''],['', '', '']];
    
    const reset = () => {
        for(let i = 0; i < 3; i++) {
            board[i] = ['', '', ''];
        };
    }

    const addBoardPosition = (x, y, char) => {
        if (board[y][x] === '') {
            board[y][x] = char;
            return true;
        } else {
            return false;
        }
    }

    const checkWinCondition = () => {
        for (let j = 0; j < 3; j++) {
            const row = [];
            const col = [];
            for (let i = 0; i < 3; i++) {
                row.push(board[j][i]);
                col.push(board[i][j]);
            }
            if (row.every(val => val === row[0]) && row[0] != '') {
                return row[0];
            }
            if (col.every(val => val === col[0]) && col[0] != '') {
                return col[0];
            }
        }
        
        let diagonals = [[],[]];
        for (let i = 0; i < 3; i++) {
            diagonals[0][i] = board[i][i];
            diagonals[1][i] = board[i][2 - i];
        }
        if (diagonals[0].every(val => val === diagonals[0][0]) && diagonals[0][0] != '') {
            return diagonals[0][0];
        }
        if (diagonals[1].every(val => val === diagonals[1][0]) && diagonals[1][0] != '') {
            return diagonals[1][0];
        }

        if (board.every(val => val.every(value => value != ''))) {
            return "draw";
        }

        return 0;
    }

    return {
        addToBoard: (x, y, char) => addBoardPosition(x, y, char),
        checkForWin: () => checkWinCondition(),
        reset: () => reset()
    }
})();

function createPlayer (character) {
    const char = character;

    return { char }
}

displayController.initialize();