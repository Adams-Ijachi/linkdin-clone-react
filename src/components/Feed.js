import React, { useEffect} from 'react';
import "../asssets/Feed.css";
import Firebase from 'firebase';
import InputOption from '../components/InputOption';
import ImageIcon from '@material-ui/icons/Image';
import CreateIcon from '@material-ui/icons/Create';
import EventNoteIcon from '@material-ui/icons/EventNote';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import Post from './Post';

import { db } from '../firebase';
import { GetUserFromReduxStore } from './getUser';


function Feed() {
    const [posts, setPosts] = React.useState([]);
    const [message, setMessage] = React.useState({message: ''});

   const user =  GetUserFromReduxStore();
   


    // orderby timestamp firestore db
    useEffect(() => {
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
            setPosts(
                snapshot.docs.map( (doc) => ({
                id   : doc.id,
                data : doc.data(),
            })))
        }
        )
       console.log(posts , 'posts');
        
    },[])

    const handleChange = (event) => {
        const messageState = {...message};
        console.log(event.target.value);
        messageState.message = event.target.value;
        setMessage(messageState);
    }
    // send post to server
    const sendPost = async (post) => {
        post.preventDefault();
        const res = await db.collection('posts').add({
            name: user.name,
            description: user.email,
            message: message.message,
            timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
            photoUrl: user.profilePic,

          });
          
        const messageState = {...message};
        messageState.message = '';
        setMessage(messageState);
    }

    return (
        <div className="feed">
        <div className="feed__inputContainer">
            <div className="feed__input">
                <CreateIcon />
                <form onSubmit={sendPost}>
                    <input name="message" value={message.message} onChange={handleChange}   type="text" />
                    <button type="submit">Send</button>
                </form>
            </div>
            <div className="feed__inputOptions">
                <InputOption Icon={ ImageIcon } title="Photo" color="#70B5F9" />
                <InputOption Icon={ SubscriptionsIcon } title="Video" color="#E7A33E" />
                <InputOption Icon={ EventNoteIcon } title="Event" color="#C0CBCD" />
                <InputOption Icon={ CalendarViewDayIcon } title="Write Article" color="#7FC15E" />
            </div>
        </div>
        {/* Posts */}
        {posts.map(({ id, data: {name, description, message, photoUrl} }) => (
            <Post 
              key={id}
              name={name}
              description={description}
              message={message}
              photoUrl={photoUrl} 
            />
        ))}
        {/* <Post name="Dark Knight" description="This is a test" message="I am surprised this worked" /> */}
    </div>
    )
}

export default Feed 
