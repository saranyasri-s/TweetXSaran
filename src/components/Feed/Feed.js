import React, { useState, useEffect } from "react";
import classes from "./Feed.module.css";
import SingleFeed from "./SingleFeed/SingleFeed";
import { db } from "../../firebase"; // Adjust the path to your firebase.js file
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { setFollowing } from "../../store/FollowingSlice";
import { useSelector, useDispatch } from "react-redux";
function Feed() {
  const [createNewPost, setCreateNewPost] = useState(false);
  const [newPost, setNewPost] = useState("");
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const userLogged = useSelector((state) => state.user);
  useEffect(() => {
    for (let i = 0; i < userLogged.following.length; i++) {
      const handleGetSingleUser = () => {
        const fetchUser = async (userId) => {
          try {
            const userDocRef = doc(db, "users", userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              // If the document exists, set the user state
              const followingMember = { ...userDoc.data(), id: userDoc.id };
              for (let j = 0; i < followingMember.posts.length; j++) {
                let newpost = {
                  displayName: followingMember.displayName,
                  postDetail: followingMember.posts[j].postDetail,
                };
                let newposts = posts.concat(newpost);
                setPosts(newposts);
              }
            } else {
              // Handle the case where the user doesn't exist
              console.log("User not found");
            }
          } catch (error) {
            console.error("Error fetching user:", error.message);
          }
        };
        fetchUser(userLogged.following[i]);
      };
      handleGetSingleUser();
    }
  }, [userLogged]);
  const handlePostChange = (e) => {
    e.preventDefault();
    setNewPost(e.target.value);
  };
  const submitnewPost = (e) => {
    e.preventDefault();
    if (newPost.length) {
      // i will  enter code here to put request
    }
    setCreateNewPost(false);
  };
  return (
    <div className={classes.Feed}>
      {console.log(posts)}
      <button
        onClick={() => {
          setCreateNewPost(true);
        }}
        className={classes.write}
      >
        Write
      </button>
      {createNewPost && (
        <div className={classes.newPost}>
          <textarea
            className={classes.NewPostInput}
            type="text"
            value={newPost}
            name="newPost"
            onChange={handlePostChange}
            maxLength={100}
          ></textarea>
          <button className={classes.postButton} onClick={submitnewPost}>
            Post
          </button>
        </div>
      )}
      {posts.map((post) => (
        <SingleFeed
          postDetail={post.postDetail.post}
          name={post.displayName}
          time="10"
        ></SingleFeed>
      ))}
    </div>
  );
}

export default Feed;
