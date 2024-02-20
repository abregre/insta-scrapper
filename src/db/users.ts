import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false
        },
        salt: {
            type: String,
            select: false
        },
        sessionToken: {
            type: String,
            select: false
        },
    }
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find()
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserByUsername = (username: string) => UserModel.findOne({ username })
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken })

export const getUserById = (id: string) => UserModel.findById(id)
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id)
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)


// const ProfileSchema = new mongoose.Schema({
//     user_name: {
//         type: String,
//         required: false,
//         default: ""
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     biography: {
//         type: String,
//         required: false,
//         default: ""
//     },
//     url: {
//         type: String,
//         required: false,
//         default: ""
//     },
//     followers_count: {
//         type: Number,
//         required: false,
//         default: 0
//     },
//     following_count: {
//         type: Number,
//         required: false,
//         default: 0
//     },
//     media_count: {
//         type: Number,
//         required: false,
//         default: 0
//     },
//     profile_pic_url: {
//         type: String,
//         required: false,
//         default: ""
//     },
// });