import React, { useState, useEffect } from "react";
import classes from "./Feed.module.css";
import SingleFeed from "./SingleFeed/SingleFeed";
import { db } from "../../firebase"; // Adjust the path to your firebase.js file
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { setFollowing } from "../../store/FollowingSlice";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/UserSlice";

function Feed() {
  const [createNewPost, setCreateNewPost] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [myArray, setMyArray] = useState([]);

  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    for (let l = 0; l < userLogged.posts.length; l++) {
      let newPostDetail = {
        displayName: userLogged.displayName,
        postDetail: userLogged.posts[l].postDetail,
      };
      setPosts((prevPosts) => [...prevPosts, newPostDetail]);
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

  const handlePostChange = (e) => {
    e.preventDefault();
    setNewPost(e.target.value);
  };
  const handleAddNewPost = async () => {
    try {
      if (userLogged) {
        const userDocRef = doc(db, "users", userLogged.id);

        // Update the user information
        const postCreated = {
          postDetail: { post: newPost, time: new Date().toISOString() },
        };
        await updateDoc(userDocRef, {
          posts: [...userLogged.posts, postCreated], // Add other fields you want to update
        });
        dispatch(
          setUser({
            ...userLogged,
            posts: [...userLogged.posts, postCreated],
          })
        );
        setCreateNewPost(false);
        setNewPost("");
        console.log("User updated successfully");
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };
  const submitnewPost = (e) => {
    e.preventDefault();
    if (newPost.length) {
      handleAddNewPost();
    }
  };
  const uniquePostsSet = new Set();

  // Iterate through the posts array and add unique posts to the Set
  const uniquePosts = posts.filter((post) => {
    const postKey = `${post.displayName}-${JSON.stringify(post.postDetail)}`;
    if (!uniquePostsSet.has(postKey)) {
      uniquePostsSet.add(postKey);
      return true;
    }
    return false;
  });
  const sortedPosts = [...uniquePosts].sort((a, b) => {
    const timeA = new Date(a.postDetail.time);
    const timeB = new Date(b.postDetail.time);

    return timeB - timeA;
  });
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
          <button className={classes.postButton} onClick={handleAddNewPost}>
            Post
          </button>
        </div>
      )}
      {console.log(uniquePosts)}
      {sortedPosts.map((post) => (
        <SingleFeed
          postDetail={post.postDetail.post}
          name={post.displayName}
          time={post.postDetail.time}
        ></SingleFeed>
      ))}
    </div>
  );
}

export default Feed;
