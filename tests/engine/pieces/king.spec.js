import 'chai/register-should';
import King from '../../../src/engine/pieces/king';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Board from '../../../src/engine/board';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from '../../../src/engine/pieces/rook';
import Queen from '../../../src/engine/pieces/rook';


describe('King', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.deep.have.members(expectedMoves);
    });

    it('cannot move if there is a blocking own piece', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(1, 4), king);

        const blockingPiece1 = new Rook(Player.WHITE);
        const blockingPiece2 = new Queen(Player.WHITE);
        const blockingPiece3 = new Rook(Player.WHITE);
        const blockingPiece4 = new Pawn(Player.WHITE);
        const blockingPiece5 = new Pawn(Player.WHITE);
        const blockingPiece6 = new Pawn(Player.WHITE);
        const blockingPiece7 = new Pawn(Player.WHITE);
        const blockingPiece8 = new Pawn(Player.WHITE);

        board.setPiece(Square.at(0, 3), blockingPiece1);
        board.setPiece(Square.at(0, 4), blockingPiece2);
        board.setPiece(Square.at(0, 5), blockingPiece3);
        board.setPiece(Square.at(1, 3), blockingPiece4);
        board.setPiece(Square.at(1, 5), blockingPiece5);
        board.setPiece(Square.at(2, 3), blockingPiece6);
        board.setPiece(Square.at(2, 4), blockingPiece7);
        board.setPiece(Square.at(2, 5), blockingPiece8);

        const moves = king.getAvailableMoves(board);

        moves.should.be.empty;
    });

    it('can take opposing piece', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(1, 4), king);

        const blockingPiece1 = new Rook(Player.BLACK);
        const blockingPiece2 = new Queen(Player.WHITE);
        const blockingPiece3 = new Rook(Player.WHITE);
        const blockingPiece4 = new Pawn(Player.WHITE);
        const blockingPiece5 = new Pawn(Player.WHITE);
        const blockingPiece6 = new Pawn(Player.WHITE);
        const blockingPiece7 = new Pawn(Player.BLACK);
        const blockingPiece8 = new Pawn(Player.WHITE);

        board.setPiece(Square.at(0, 3), blockingPiece1);
        board.setPiece(Square.at(0, 4), blockingPiece2);
        board.setPiece(Square.at(0, 5), blockingPiece3);
        board.setPiece(Square.at(1, 3), blockingPiece4);
        board.setPiece(Square.at(1, 5), blockingPiece5);
        board.setPiece(Square.at(2, 3), blockingPiece6);
        board.setPiece(Square.at(2, 4), blockingPiece7);
        board.setPiece(Square.at(2, 5), blockingPiece8);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 3), Square.at(2, 4)];

        moves.should.deep.have.members(expectedMoves);
    });

});
