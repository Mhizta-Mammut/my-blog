import React, { useState } from "react";
import Router from "next/router";
import Layout from "@components/Layout";

const SignUp: React.FC = ( props ) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const body = { email, password };

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div>
                <form onSubmit={submitData}>
                    <h1>Sign Up</h1><br/>
                    <input
                        autoFocus
                        onChange={(e) => {setName(e.target.value)}}
                        placeholder="Enter your full name"
                        type="text"
                        value={name}
                    />
                    <input
                        autoFocus
                        onChange={(e) => {setEmail(e.target.value)}}
                        placeholder="Enter your Email Address"
                        type="email"
                        value={email}
                    />
                    <input
                        autoFocus
                        onChange={(e) => {setPassword(e.target.value)}}
                        placeholder="Enter your password"
                        type="text"
                        value={password}
                    />
                    <input disabled={!name || !email || !password} type="submit" value="Create" />
                    <a className="back" href="javascript:void();" onClick={() => Router.push('/')}>
                        or Cancel
                    </a>
                </form>
            </div>
            <style jsx>{`
                .page {
                    background: var(--geist-background);
                    padding: 3rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                input[type='text'], input[type='email'], input[type='password']{
                width: 100%;
                padding: 0.5rem;
                margin: 0.5rem 0;
                border-radius: 0.25rem;
                border: 0.125rem solid rgba(0, 0, 0, 0.2);
                }
                input[type='submit'] {
                    background: #ececec;
                    border: 0;
                    padding: 1rem 2rem;
                    }

                    .back {
                    margin-left: 1rem;
                    }
            `}
            </style>
        </Layout>
    );
}

export default SignUp;