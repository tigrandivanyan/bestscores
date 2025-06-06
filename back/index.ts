import mongoose, { set } from "mongoose";
import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import http from "http";
import { Server } from "socket.io";
import User from "./models/User";
import gameRouter from "./routes/game";
import Game from "./models/Game";
import { eventNames } from "process";

configDotenv();

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "*", // Change this to the actual origin for production
        methods: ["GET", "POST"],
        credentials: true,
    },
});

interface IConnectedUser {
    token: string;
    socketId: string;
}

let connectedUsers: Array<IConnectedUser> = [];

io.use((socket, next) => {
    const token = socket.handshake.query.token;

    if (!token) {
        return next(new Error("Authentication error"));
    }

    (async () => {
        const user = await User.findOne({ token: token });

        //@ts-ignore
        socket.user = user;

        if (user?.permissions.sender || !user?.permissions.sender) {
            next();
        }
        if (!user?.permissions.all && !user?.permissions.sender) {
            return next(new Error("dont have permission"));
        }
    })();
});

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    //@ts-ignore
    const existedUser = connectedUsers.find((user: IConnectedUser) => user.token === socket.user.token);
    if (existedUser) {
        const oldSocket = io.sockets.sockets.get(existedUser.socketId);
        if (oldSocket) {
            console.log("User disconnected from old socket");
            oldSocket.disconnect(true);
        }

        //@ts-ignore
        connectedUsers = connectedUsers.filter((user) => user.token !== socket.user.token);
    }

    socket.join("room1");

    connectedUsers.push({
        //@ts-ignore
        token: socket.user.token,
        socketId: socket.id,
    });

    socket.on("message", (message) => {
        //@ts-ignore
        if (socket.user.permissions.sender) {
            io.to("room1").emit("message", message);
            let eventName;
            try {
                eventName = JSON.parse(message).eventName;
            } catch {
                eventName = message.eventName;
            }
            Game.findOne({ eventName }).then((game) => {
                if (!game) {
                    new Game({ eventName, active: true }).save().then(() => console.log("saved new game " + eventName));
                }
            });
        } else {
            //@ts-ignore
            console.log(`User ${socket.user.id} tried to send a message without permission`);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
    });
});

const PORT = process.env.PORT || 8000;

const MONGO_DB = process.env.MONGO_DB;

if (!MONGO_DB) {
    throw new Error("No MONGO_DB in env");
}

// Connect to MongoDB
mongoose
    .connect(MONGO_DB)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

// Routes
app.use("/api/user", userRouter);
app.use("/api/game", gameRouter);

app.get('/api/111', (req, res) => {
    io.to("room1").emit("message", { "eventName": "P1 - P2 OUR", "signal": 1 });
    res.sendStatus(200)
})

app.get('/api/222', (req, res) => {
    io.to("room1").emit("message", { "eventName": "P1 - P2 OUR", "signal": 2 });
    res.sendStatus(200)
})


// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
