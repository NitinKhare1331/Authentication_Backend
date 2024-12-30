import userRepository from "../repository/userRepository.js"
import ValidationError from '../utils/error/validationError.js';
import ClientError from "../utils/error/clientError.js";
import bcrypt from 'bcrypt';
import { StatusCodes } from "http-status-codes";

export const signUpService = async (data) => {
    try {
        const newUser = await userRepository.createUser(data);
        return newUser
    } catch (error) {
        console.log("signUpService error", error);
        if (error.name === 'ValidationError') {
            throw new ValidationError(
            {
                error: error.errors
            },
                error.message
            );
        }

        if (error.name === 'MongoServerError' && error.code === 11000) {
            throw new ValidationError(
            {
                error: ['A user with same email or username already exists']
            },
                'A user with same email or username already exists'
            );
        }
    }
};

export const signInService = async (data) => {
    try {
        const user = await userRepository.getUserByEmail(data.email);

        if(!user){
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'No registered user found with this email',
                statusCode: StatusCodes.BAD_REQUEST
            })
        }

        const isMatch = bcrypt.compareSync(data.password, user.password);

        if(!isMatch) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Invalid password, please try again',
                statusCode: StatusCodes.BAD_REQUEST
            })
        }

        return {
            username: user.username,
            email: user.email,
            _id: user._id,
        };
    } catch (error) {
        console.log('signInService error', error);
    throw error;
    }
}