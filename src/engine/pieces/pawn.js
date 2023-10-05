import Player from '../player';
import Square from '../square';
import Piece from './piece';

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

        if (!board.getPiece(potentialSquare1)) {
            moves.push(Square.at(location.row + 1 * direction, location.col))
            if (location.row === startingRow && !board.getPiece(potentialSquare2)) {
                moves.push(Square.at(location.row + 2 * direction, location.col))
            }
        }
        return moves
    }
}
