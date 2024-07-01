import mongoose, {Schema, Document} from 'mongoose';

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyExpires: Date;
    isVerified: boolean;
    isAccepting: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Invalid email address',
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    verifyCode: {
        type: String,
        required: [true, 'Verify code is required'],
    },
    verifyExpires: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAccepting: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema],
});

const UesrModel = (mongoose.models.user as mongoose.Model<User>) || mongoose.model<User>("user", UserSchema);

export default UesrModel;