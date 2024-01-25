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
  const [myArray, setMyArray] = useState([]);

  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    for (let l = 0; l < userLogged.posts.length; l++) {
      let newPost = {
        displayName: userLogged.displayName,
        postDetail: userLogged.posts[l].postDetail,
      };
      setPosts((prevPosts) => [...prevPosts, newPost]);
    }

    for (let i = 0; i < userLogged.following.length; i++) {
      const handleGetSingleUser = () => {
        const fetchUser = async (userId) => {
          try {
            const userDocRef = doc(db, "users", userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              // If the document exists, set the user state
              const followingMember = { ...userDoc.data(), id: userDoc.id };
              let postsNewPosts = [];
              for (let j = 0; j < followingMember.posts.length; j++) {
                let newpost = {
                  displayName: followingMember.displayName,
                  postDetail: followingMember.posts[j].postDetail,
                };
                postsNewPosts.push(newpost);
              }
              setPosts((prevPosts) => [...prevPosts, ...postsNewPosts]);
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
  const uniqueArray = [];
  for (let y = 0; y < posts.length; y = y + 2) {
    uniqueArray.push(posts[y]);
  }
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
     
      {uniqueArray.map((post) => (
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
