import Player from '../player';
import Square from '../square';
import Piece from './piece';
import King from './king'

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const moves = new Array(0)

        let location = board.findPiece(this)
        let direction = this.player === Player.WHITE ? 1 : -1;
        let startingRow = this.player === Player.WHITE ? 1 : 6;

        let potentialSquare1 = Square.at(location.row + 1 * direction, location.col);
        let potentialSquare2 = Square.at(location.row + 2 * direction, location.col);
        let potentialSquare3 = Square.at(location.row + 1 * direction, location.col + 1);
        let potentialSquare4 = Square.at(location.row + 1 * direction, location.col - 1);

        if (Square.onBoard(potentialSquare1) && !board.getPiece(potentialSquare1)) {
            moves.push(potentialSquare1)
            if (location.row === startingRow && !board.getPiece(potentialSquare2)) {
                moves.push(potentialSquare2);
            }
        }
        if (Square.onBoard(potentialSquare3) && 
            board.getPiece(potentialSquare3) && 
            board.getPiece(potentialSquare3).player !== this.player &&
            !(board.getPiece(potentialSquare3) instanceof King)) {
            moves.push(potentialSquare3)
        }
        if (Square.onBoard(potentialSquare4) && 
            board.getPiece(potentialSquare4) &&
            board.getPiece(potentialSquare4).player !== this.player &&
            !(board.getPiece(potentialSquare4) instanceof King)) {
            moves.push(potentialSquare4)
        }
        return moves
    }
}
