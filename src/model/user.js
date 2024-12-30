import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email already exist'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address'
            ]
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        username: {
            type: String,
            required: [true, 'username is required'],
            unique: [true, 'username already exist'],
            match: [
                /^[a-zA-Z0-9]+$/,
                'Username must contain only letters and numbers'
            ]
        }
    },
    {timestamps:true}
);

//pre save hook
userSchema.pre('save', function saveUser(next) {
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = hashedPassword;
    next();
})

const User = mongoose.model('User', userSchema);

export default User;