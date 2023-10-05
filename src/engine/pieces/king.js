import Square from '../square';
import Piece from './piece';

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {

        const moves = new Array(0);
        let location = board.findPiece(this);
        let directions = [
            { row: 1, col: 0 },
            { row: -1, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: -1 },
            { row: 1, col: 1 },
            { row: 1, col: -1 },
            { row: -1, col: 1 },
            { row: -1, col: -1 }
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
            if (board.getPiece(potentialSquare).player !== this.player) {
                moves.push(potentialSquare);
            }
        }
        return moves
    }
}
