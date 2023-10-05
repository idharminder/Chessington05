import RayPiece from './rayPiece';

export default class Rook extends RayPiece {
    constructor(player) {
        super(player);
        this.directions = [
            { row: 1, col: 0 },
            { row: -1, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: -1 }
        ]
    }
}
