import mongoose, { Types, Schema } from "mongoose";


interface IPersmission {
    all: boolean,
    admin: boolean,
    sender: boolean
}

interface IUser {
    email: string,
    password: string;
    token: string;
    code: string;
    active: boolean,
    permissions: IPersmission
}
const permissionSchema = new Schema<IPersmission>({
    all: { type: Boolean, required: true },
    admin: { type: Boolean, required: true },
    sender: {type: Boolean, required: true}
}, {_id: false})

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
    code: {type: String, required: true},
    active: { type: Boolean, required: true, default: false },
    permissions: {
        type: permissionSchema,
        default: () => ({
            all: false,
            admin: false,
            sender: false
        })
    }
});

const User = mongoose.model("User", UserSchema);

export default User;
