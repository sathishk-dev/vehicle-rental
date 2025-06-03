import favVehicleModel from "../models/Favourite.js";
import vehicleModel from "../models/Vehicles.js";


export const addVehicle = (req, res) => {
    const { vehicleName, category, vehicleDetails, vehicleType, vehicleMode, actualPrice, offerPrice, vehicleImage, fuelCapacity, vehicleCapacity } = req.body;
    vehicleModel.create({ vehicleName, category, details: vehicleDetails, type: vehicleType, mode: vehicleMode, actualPrice, offerPrice, imageUrl: vehicleImage, fuelCapacity, capacity: vehicleCapacity })
        .then(data => {
            res.json({ data: data, message: "Vehicle added successfully!" })
        })
        .catch(err => res.json(err.message))

}

export const getVehicle = async (req, res) => {
    const { userId } = req.body;
    try {
        const vehicles = await vehicleModel.find({});
        if (!userId) {
            return res.json(vehicles)
        }
        const favVehicles = await favVehicleModel.find({ userId: userId });
        const likedVehicleId = new Set(favVehicles.map(veh => veh.vehicleId));
        const updatedVehicles = vehicles.map(vehicle => {
            if (likedVehicleId.has(vehicle._id.toString())) {
                vehicle.isLiked = true;
            }
            return vehicle;
        });

        res.json(updatedVehicles);
    }
    catch (err) {
        console.error("Fetch error:", err);
        res.status(500).json({ message: 'error while fetch vehicles', error: err.message });
    }


}

export const deleteVehicle = (req, res) => {
    const id = req.params.id;
    vehicleModel.findByIdAndDelete({ _id: id })
        .then(data => res.json(data))
        .catch(err => res.json(err))
}

export const updateFav = async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const { toggleLike, userId } = req.body;
        if (toggleLike === true) {
            await favVehicleModel.create({
                userId: userId,
                vehicleId: vehicleId,
                isLiked: toggleLike
            });
            return res.json({ message: 'Successfully Updated' })
        }
        await favVehicleModel.findOneAndDelete({ vehicleId: vehicleId });
        res.json({ message: 'Successfully Removed' });
    }
    catch (err) {
        res.json({ message: 'error while update', err })
    }


}