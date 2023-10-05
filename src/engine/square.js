import GameSettings from "./gameSettings";

export default class Square {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    static at(row, col) {
        return new Square(row, col);
    }

    equals(otherSquare) {
        return !!otherSquare && this.row === otherSquare.row && this.col === otherSquare.col;
    }

    toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }

    static onBoard(square){
        return  square.row >= 0  && 
                square.row <= GameSettings.BOARD_SIZE - 1 &&
                square.col >= 0  && 
                square.col <= GameSettings.BOARD_SIZE - 1
    }
}
