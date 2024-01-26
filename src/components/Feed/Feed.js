import React, { useState, useEffect } from "react";

// css
import classes from "./Feed.module.css";

// child component
import SingleFeed from "./SingleFeed/SingleFeed";

// firebase
import { db } from "../../firebase"; // Adjust the path to your firebase.js file
import { doc, getDoc, updateDoc } from "firebase/firestore";

// redux
import { setFollowing } from "../../store/FollowingSlice";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/UserSlice";

function Feed() {
  const [createNewPost, setCreateNewPost] = useState(false);
  const [newPost, setNewPost] = useState("");
  const userLogged = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    //  adding the posts posted by the logged in user itself to the posts array
    for (let l = 0; l < userLogged.posts.length; l++) {
      let newPostDetail = {
        displayName: userLogged.displayName,
        postDetail: userLogged.posts[l].postDetail,
      };
      setPosts((prevPosts) => [...prevPosts, newPostDetail]);
    }

    // fetching all the users in the "following" list of the logged in user,
    //  using user id and adding  the list of posts they posted to the posts state

    for (let i = 0; i < userLogged.following.length; i++) {
      const handleGetSingleUser = () => {
        const fetchUser = async (userId) => {
          try {
            const userDocRef = doc(db, "users", userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const followingMember = { ...userDoc.data(), id: userDoc.id };
              let postsNewPosts = [];
              for (let j = 0; j < followingMember.posts.length; j++) {
                let newpost = {
                  displayName: followingMember.displayName,
                  postDetail: followingMember.posts[j].postDetail,
                };
                postsNewPosts.push(newpost);
              }
              // If the document exists, set the posts state with the user's posts
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

  // adding new posts by user
  const handlePostChange = (e) => {
    e.preventDefault();
    setNewPost(e.target.value);
  };
  const handleAddNewPost = async () => {
    try {
      if (userLogged) {
        const userDocRef = doc(db, "users", userLogged.id);

        // Update the user information in firebase and the redux state
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

  // sort the posts based on time posted
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
          <button className={classes.postButton} onClick={submitnewPost}>
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
