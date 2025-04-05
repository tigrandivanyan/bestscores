import { Request, Response } from "express";
import Game from "../models/Game";
import { io } from "..";

export const getGames: (req: Request, res: Response) => Promise<any> = async (req, res) => {
    const { games } = req.body;
    
    let promises = []

    for (const game of games) {
        promises.push(
            (async () => {
                const sameGame = await Game.findOne({ eventName: game.eventName })
                
                if (sameGame && sameGame.active && !game.active) {
                    await Game.findOneAndDelete({ eventName: game.eventName })
                    io.to("room1").emit("game", `Game ${game.eventName} was ended`)
                } else if (game.active) {
                    await new Game({
                        eventName: game.eventName,
                        active: game.active
                    }).save()

                    io.to("room1").emit("game", `Game ${game.eventName} was started`)
                }
            })()
        )      
    }

    await Promise.all(promises)

    res.status(200).send("ok");
};
