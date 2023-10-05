import Square from '../square';
import Piece from './piece';
import King from './king'

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let moves = new Array(0);
        let location = board.findPiece(this);
        let directions = [
            { row: 1, col: 0 },
            { row: -1, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: -1 }
        ]

        for (let direction of directions) {
            for (let i = 1; i < 8; i++) {
                let potentialSquare = Square.at(location.row + i * direction.row, location.col + i * direction.col);
                if (!Square.onBoard(potentialSquare)) {
                    break;
                }
                if (!board.getPiece(potentialSquare)) {
                    moves.push(potentialSquare);
                    continue;
                }
                if (board.getPiece(potentialSquare).player !== this.player &&
                    !(board.getPiece(potentialSquare) instanceof King)) {
                    moves.push(potentialSquare);
                    break;
                } else {
                    break
                }
            }
        }
        return moves
    }
}
