import 'chai/register-should';
import Board from '../../../src/engine/board';
import King from '../../../src/engine/pieces/king';
import Knight from '../../../src/engine/pieces/knight';
import Pawn from '../../../src/engine/pieces/pawn';
import Player from '../../../src/engine/player';
import Queen from '../../../src/engine/pieces/queen';
import Rook from '../../../src/engine/pieces/rook';
import Square from '../../../src/engine/square';

describe('Queen', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can move laterally and diagonally', () => {
        const queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(1, 2), queen);

        const moves = queen.getAvailableMoves(board);

        const expectedMoves = [
            // Horizontal
            Square.at(1, 0), Square.at(1, 1), Square.at(1, 3), Square.at(1, 4), Square.at(1, 5), Square.at(1, 6), Square.at(1, 7),
            // Vertical
            Square.at(0, 2), Square.at(2, 2), Square.at(3, 2), Square.at(4, 2), Square.at(5, 2), Square.at(6, 2), Square.at(7, 2),
            // Forwards diagonal
            Square.at(0, 1), Square.at(2, 3), Square.at(3, 4), Square.at(4, 5), Square.at(5, 6), Square.at(6, 7),
            // Backwards diagonal
            Square.at(0, 3), Square.at(2, 1), Square.at(3, 0),
        ];
        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(1, 2), queen);

        const moves = queen.getAvailableMoves(board);

        moves.should.have.length(23);
    });

    it('cannot move through friendly pieces', () => {
        const queen = new Queen(Player.WHITE);
        const opposingPiece = new Knight(Player.WHITE);
        
        board.setPiece(Square.at(1, 2), queen);
        board.setPiece(Square.at(5, 6), opposingPiece);

        const moves = queen.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(6, 7));
    });

    it('cannot move through opposing pieces', () => {
        const queen = new Queen(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        
        board.setPiece(Square.at(1, 2), queen);
        board.setPiece(Square.at(5, 6), opposingPiece);

        const moves = queen.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(6, 7));
    });

    it('can take opposing pieces', () => {
        const queen = new Queen(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        
        board.setPiece(Square.at(1, 2), queen);
        board.setPiece(Square.at(5, 6), opposingPiece);

        const moves = queen.getAvailableMoves(board);

        moves.should.deep.include(Square.at(5, 6));
    });


    it('cannot take friendly pieces', () => {
        const queen = new Queen(Player.WHITE);
        const opposingPiece = new Knight(Player.WHITE);
        
        board.setPiece(Square.at(1, 2), queen);
        board.setPiece(Square.at(5, 6), opposingPiece);

        const moves = queen.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 6));
    });

    it('cannot take oppossing King ', () => {
        const queen = new Queen(Player.WHITE);
        const opposingPiece = new King(Player.BLACK);
        
        board.setPiece(Square.at(1, 2), queen);
        board.setPiece(Square.at(5, 6), opposingPiece);

        const moves = queen.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 6));
    });

});
