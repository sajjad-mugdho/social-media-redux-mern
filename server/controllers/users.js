import User from '../models/User.js';

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id, } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {

    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({
                _id, firstName, lastName, picturePath, location, occupation,
            }) => {
                return {
                    _id, firstName, lastName, picturePath, location, occupation,
                }
            }
        )
        res.status(200).json(formattedFriends)
    } catch (error) {

    }
}