import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
        setPassword("");
        setEmail("");
        postLoginDetails();
    };

    const postLoginDetails = () => {
        fetch("http://localhost:3000/users/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((data) => {
                console.log("inside the two")
                navigate("/verify");
            })
            .catch((err) => console.error(err));
    };

    const gotoSignUpPage = () => navigate("/register");

    const gotoresetpasswordPage = () => {
        alert("Reset password link sent your register email")
        fetch("http://localhost:3000/users/sendmail", {
            method: "POST",
            body:JSON.stringify({email}),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
        .then((data) => {
            console.log("inside the two")
            // localStorage.setItem("email", data.data.email);
            // navigate("/phone/verify");
        })
        .catch((err) => console.error(err));
    };

    return (
        <div className='login__container'>
            <h2>Login </h2>
            <form className='login__form' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    id='email'
                    name='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    minLength={8}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p>
                    <span className='link' onClick={gotoresetpasswordPage}>
                        Forgot Password
                    </span>
                </p>

                <button className='loginBtn'>LOG IN</button>
                <p>
                    Don't have an account?{" "}
                    <span className='link' onClick={gotoSignUpPage}>
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;