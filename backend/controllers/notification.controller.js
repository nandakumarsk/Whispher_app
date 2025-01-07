import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch notifications for the logged-in user
        const notifications = await Notification.find({ to: userId })
            .populate({
                path: "from",
                select: "username profileImg",
            })
            .sort({ createdAt: -1 }); // Sort by most recent

        // Mark notifications as read
        await Notification.updateMany({ to: userId, read: false }, { read: true });

        res.status(200).json(notifications);
    } catch (error) {
        console.error(`Error in getNotifications controller for user ${req.user._id}:`, error);
        res.status(500).json({ error: "Failed to retrieve notifications." });
    }
};

export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        // Delete all notifications for the user
        await Notification.deleteMany({ to: userId });

        res.status(200).json({ message: "Notifications deleted successfully." });
    } catch (error) {
        console.error(`Error in deleteNotifications controller for user ${req.user._id}:`, error);
        res.status(500).json({ error: "Failed to delete notifications." });
    }
};
