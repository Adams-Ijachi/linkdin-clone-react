import React, {useState} from 'react';
import { auth } from '../firebase';
import "./Login.css";
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();
    const register = () => {
        if (!name) {
            return alert("Please enter full name");
        }
       
        auth.createUserWithEmailAndPassword(email, password)
        const Pic = profilePic ? profilePic : email[0]
        .then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: Pic,
            }).then(() => {
                console.log(userAuth,'register')
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    name: name,
                    profilePic: Pic,
                })) 
            });
        
        })
        .catch((error) => {
            alert(error.message)
        })
    };
    const loginToApp = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then((userAuth) => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                name: userAuth.user.displayName,
                profilePic: userAuth.user.photoURL,
            }))
        })
        .catch((error) => {
            alert(error.message)
        })
    }

        
  
    return (
        <div className="login">
            <img src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks" alt="" />
            <form action="" onSubmit={loginToApp}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name (required if registering)" type="text" />
                <input value={profilePic} onChange={(e) => setProfilePic(e.target.value)} placeholder="Profile Pic Url (optional)" type="text" />
                <input value={email} onChange={(e) => setEmail(e.target.value)}placeholder="Email" type="email" />
                <input value={password} onChange={(e) => setPassword(e.target.value)}placeholder="Password" type="password" />
                <button type="submit" >Sign In</button>
            </form>

            <p>Not a member?{" "}
                <span className="login__register" onClick={register} >Register Now</span>
            </p>
        </div>
    );
}

export default Login
