import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { createpost , deletePost, createcomment,likeUnlikePost,getAllPosts,getLikedPosts,getFollowingPosts,getUserPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/all", protectRoute, getAllPosts)
router.get("/likes/:id", protectRoute, getLikedPosts)
router.get("/following", protectRoute, getFollowingPosts)
router.get("/user/:username", protectRoute, getUserPosts)
router.post("/create" , protectRoute ,createpost)
router.post("/like/:id" , protectRoute ,likeUnlikePost)
router.post("/comment/:id" , protectRoute ,createcomment)
router.delete("/:id" , protectRoute ,deletePost)





export default router;