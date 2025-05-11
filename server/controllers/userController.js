import userModel from "../models/Users.js";


export const getUsers = (req, res) => {
    userModel.find({})
        .then(users => {
            if (users) {
                res.json(users)
            }
            else {
                res.json("No registered User")
            }
        })
        .catch(err => res.json(err))
}


export const getUserbyId = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            status: true,
            message: 'Successfully fetched',
            data: user
        });

    } catch (error) {
        res.status(400).json({ message: 'Error while fetching user', error });
    }
}


export const updateUser = async (req, res) => {
    try {
        const { name, address, userId } = req.body;

        if (!name || !address) {
            return res.status(400).json({ message: 'Name and Address not found' })
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        user.signupFirstName = name;
        user.signupLastName = "";
        user.address = address;

        await user.save();

        res.status(200).json({
            status: true,
            message: 'Successfully updated'
        });

    }
    catch (error) {
        res.status(400).json({ message: 'error while update', error })
    }
}