import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { baseUrl } from "../../constant/url";

const NotificationPage = () => {
    const queryClient = useQueryClient();

    // Fetch Notifications
    const { data: notifications, isLoading, error } = useQuery({
        queryKey: ["notification"],

        queryFn: async () => {
            const res = await fetch(`${baseUrl}/api/notification`, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});


            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || `Error ${res.status}`);
            }

            return data;
        },
        onError: (err) => {
            console.error("Error fetching notifications:", err.message);
            toast.error(err.message || "Failed to load notifications.");
        },
    });

    // Delete Notifications
    const { mutate: deleteNotifications } = useMutation({
        mutationFn: async () => {
            const res = await fetch(`${baseUrl}/api/notification`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || `Error ${res.status}`);
            }

            return data;
        },
        onError: (err) => {
            console.error("Error deleting notifications:", err.message);
            toast.error(err.message || "Failed to delete notifications.");
        },
        onSuccess: () => {
            toast.success("All notifications deleted successfully!");
            queryClient.invalidateQueries(["notification"]);
        },
    });

    return (
        <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen bg-gray-900 text-gray-300">
    <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <p className="font-bold text-lg">Notifications</p>
        <div className="dropdown">
            <div tabIndex={0} role="button" className="m-1 cursor-pointer">
                <IoSettingsOutline className="w-5 h-5" />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-3 shadow-md bg-gray-900 rounded-md w-52 border border-gray-700"
            >
                <li>
                    <button
                        type="button"
                        onClick={deleteNotifications}
                        className="text-left hover:underline hover-effect"
                    >
                        Delete all notifications
                    </button>
                </li>
            </ul>
        </div>
    </div>

    {isLoading ? (
        <div className="flex justify-center h-screen items-center">
            <LoadingSpinner size="xl" />
        </div>
    ) : error ? (
        <div className="text-center p-4 text-red-500">
            Failed to load notifications. Please try again.
        </div>
    ) : notifications?.length === 0 ? (
        <div className="text-center p-4 font-bold">
          
            No notifications 🤔
        </div>
    ) : (
        notifications.map((notification) => (
            <div
                className="border-b border-gray-700 p-4 hover:bg-gray-800 hover-effect rounded-md flex gap-3 items-center"
                key={notification._id}
            >
                {notification.type === "follow" && (
                    <FaUser className="w-7 h-7 text-primary" />
                )}
                {notification.type === "like" && (
                    <FaHeart className="w-7 h-7 text-red-500" />
                )}
                <Link
                    to={`/profile/${notification.from.username}`}
                    className="flex items-center gap-3"
                >
                    <div className="avatar">
                        <div className="w-8 rounded-full border border-gray-600">
                            <img
                                src={
                                    notification.from.profileImg ||
                                    "/avatar-placeholder.png"
                                }
                                alt="Profile"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold">@{notification.from.username}</span>
                        <span className="text-sm text-gray-400">
                            {notification.type === "follow"
                                ? "followed you"
                                : "liked your post"}
                        </span>
                    </div>
                </Link>
                <span className="text-xs text-gray-500 ml-auto">
                    {new Date(notification.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
        ))
    )}
</div>

    );
};

export default NotificationPage;
