import userModel from '../models/user.model.js';



export const createUser = async ({
    email, password, name
}) => {

    if (!email || !password || !name) {
        throw new Error('Email, password and name are required');
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        email,
        password: hashedPassword,
        name
    });

    return user;

}

export const getAllUsers = async ({ userId }) => {
    const users = await userModel.find({
        _id: { $ne: userId }
    });
    return users;
}