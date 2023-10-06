import 'chai/register-should';
import Board from '../../../src/engine/board';
import King from '../../../src/engine/pieces/king';
import Knight from '../../../src/engine/pieces/knight';
import Pawn from '../../../src/engine/pieces/pawn';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Rook from '../../../src/engine/pieces/rook';



describe('Knight', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can make knights moves', () => {
        const knight = new Knight(Player.WHITE);
        board.setPiece(Square.at(4, 4), knight);

        const moves = knight.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 5), Square.at(2, 3), Square.at(3, 6), Square.at(3, 2),
            Square.at(5, 6), Square.at(5, 2), Square.at(6, 5), Square.at(6, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const knight = new Knight(Player.WHITE);
        board.setPiece(Square.at(4, 4), knight);

        const moves = knight.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('can jump over other pieces', () => {
        const knight = new Knight(Player.WHITE);
        const firstPawn = new Pawn(Player.WHITE);
        const secondPawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), knight);
        board.setPiece(Square.at(3, 4), firstPawn);
        board.setPiece(Square.at(3, 5), secondPawn);

        const moves = knight.getAvailableMoves(board);

        moves.should.deep.include(Square.at(2, 5));
    });

    it('cannot leave the board', () => {
        const knight = new Knight(Player.WHITE);
        board.setPiece(Square.at(0, 0), knight);

        const moves = knight.getAvailableMoves(board);

        const expectedMoves = [Square.at(1, 2), Square.at(2, 1)];

        moves.should.deep.have.members(expectedMoves);
    });

    it('can take opposing piece but not oppposing King and not npm runmove to own piece squares', () => {
        const knight = new Knight(Player.WHITE);
        board.setPiece(Square.at(4, 4), knight);


        const ownPiece1 = new Rook(Player.WHITE);
        const opposingKingPiece2 = new King(Player.BLACK);
        const capturePiece3 = new Rook(Player.BLACK);
        const ownPiece4 = new Pawn(Player.WHITE);
        const capturePiece5 = new Pawn(Player.BLACK);
        const ownPiece6 = new Pawn(Player.WHITE);
        const capturePiece7 = new Pawn(Player.BLACK);
        const ownPiece8 = new Pawn(Player.WHITE);

        board.setPiece(Square.at(2, 5), ownPiece1);
        board.setPiece(Square.at(2, 3), opposingKingPiece2);
        board.setPiece(Square.at(3, 6), capturePiece3);
        board.setPiece(Square.at(3, 2), ownPiece4);
        board.setPiece(Square.at(5, 6), capturePiece5);
        board.setPiece(Square.at(5, 2), ownPiece6);
        board.setPiece(Square.at(6, 5), capturePiece7);
        board.setPiece(Square.at(6, 3), ownPiece8);

        const moves = knight.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(3, 6),Square.at(5, 6), Square.at(6, 5),
        ];

        moves.should.deep.include.members(expectedMoves);
    });

});
