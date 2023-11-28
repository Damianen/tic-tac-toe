const displayController = (() => {

})();

const game = (() => {
    const players = [createPlayer("X"), createPlayer("O")];

    function init() {
        const btns = document.querySelectorAll('button');
        
        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                
            })
        })
    }

    return { init }
})();

const gameBoard = (() => {
    const board = [['', '', ''],['', '', ''],['', '', '']];
    
    const addBoardPosition = (x, y, char) => {
        if (board[x][y] === '') {
            board[x][y] = char;
        } else {
            return 1;
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

    }

    return {
        addToBoard: (x, y, char) => addBoardPosition(x, y, char),
        checkForWin: () => checkWinCondition()
    }
})();

function createPlayer (character) {
    const char = character;

    return { char }
}

game.init();