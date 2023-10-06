import Square from '../square';
import Piece from './piece';
import King from './king';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {

        const moves = new Array(0);
        let location = board.findPiece(this);
        let directions = [
            { row: 2, col: 1 },
            { row: 2, col: -1 },
            { row: -2, col: 1 },
            { row: -2, col: -1 },
            { row: 1, col: 2 },
            { row: 1, col: -2 },
            { row: -1, col: 2 },
            { row: -1, col: -2 }
        ]

        for (let direction of directions) {
            let potentialSquare = Square.at(location.row + direction.row, location.col + direction.col);
            if (!Square.onBoard(potentialSquare)) {
                continue;
            }
            if (!board.getPiece(potentialSquare)) {
                moves.push(potentialSquare);
                continue;
            }
            if (board.getPiece(potentialSquare).player !== this.player &&
                !(board.getPiece(potentialSquare) instanceof King)) {
                moves.push(potentialSquare);
            }
        }
        return moves;
    }
}
