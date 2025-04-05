import mongoose, { Types, Schema } from "mongoose";

interface IGame {
    eventName: string,
    active: boolean
}

const GameSchema = new Schema<IGame>({
    eventName: { type: String, required: true },
    active: {type: Boolean, required: true}
});

GameSchema.index({ eventName: 1 }, { unique: true });

const Game = mongoose.model("Game", GameSchema);

export default Game;
