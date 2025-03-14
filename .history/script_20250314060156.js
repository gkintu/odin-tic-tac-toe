const Gameboard = (() => {

    let board  = ["","","","","","","","",""];

    const getBoard = () => board;

    const setMark = (index, mark) {
        if(board[index] ==="") {
            board[index] = mark;
            return true;
        }
        return false;
      
    }
    


})();
