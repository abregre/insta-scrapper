import mongoose from "mongoose";


const ProfileSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: false,
        default: ""
    },
    username: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: false,
        default: ""
    },
    url: {
        type: String,
        required: false,
        default: ""
    },
    followers_count: {
        type: Number,
        required: false,
        default: 0
    },
    following_count: {
        type: Number,
        required: false,
        default: 0
    },
    media_count: {
        type: Number,
        required: false,
        default: 0
    },
    profile_pic_url: {
        type: String,
        required: false,
        default: ""
    },
});

export const ProfileModel = mongoose.model('Profile', ProfileSchema);

export const getProfileByUsername = (username: string) => ProfileModel.findOne({ username })
export const getProfileById = (id: string) => ProfileModel.findById(id)
export const createProfile = (values: Record<string, any>) => new ProfileModel(values).save().then((profile) => profile.toObject())
export const getProfiles = () => ProfileModel.find()
export const deleteProfiles = () => ProfileModel.deleteMany()