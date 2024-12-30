import User from "../model/user.js";

const userRepository = {
    createUser: async function (data) {
        const newUser = await User.create(data);
        return newUser;
    },

    signUpUser: async function (data) {
        const newUser = new User(data);
        await newUser.save();
        return newUser;
    },

    getUserByEmail: async function (email) {
        const user = await User.findOne({email});
        return user;
    }
}

export default userRepository;