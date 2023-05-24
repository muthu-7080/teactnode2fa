import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Register = () => {
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    // const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewPassword("");
        setConfirmPassword("");
        postResetPasswordDetails();
    };
    // const gotoLoginPage = () => navigate("/");

    const postResetPasswordDetails = () => {
        fetch("http://localhost:3000/users/forgotpassword", {
            method: "POST",
            body: JSON.stringify({
                newpassword,
                confirmpassword
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.error(err));
    };


    return (
        <div className='signup__container'>
            <h2>Reset Password</h2>
            <form className='signup__form' onSubmit={handleSubmit}>
                <label htmlFor='password'>New Password</label>
                <input
                    type='password'
                    name='newpassword'
                    id='newpassword'
                    value={newpassword}
                    minLength={8}
                    maxLength={12}
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor='password'>Confirm Password</label>
                <input
                    type='password'
                    name='confirmpassword'
                    id='confirmpassword'
                    minLength={8}
                    maxLength={12}
                    required
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button className='signupBtn'>RESET</button>

            </form>
        </div>
    );
};

export default Register;