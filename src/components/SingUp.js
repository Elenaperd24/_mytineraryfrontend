import React, { useEffect, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import swal from 'sweetalert'
import bannerSignUP from "../image/banner/bannerSignUP.jpg";
import axios from "axios";
import bannerSignin from "../image/banner/bannerSignin.jpg";
import { _url } from "./envairoment";


//<MaterialIcon className="icon-login" icon="account_circle" size='large' color="black" />//

//<img src={login} className="login" alt="login" />//

function SignUp() {
    useEffect(() => {
        window.scrollTo(0, 0);       
    }, [])


    const responseGoogle = async (response) => {
        console.log(response)
        const NuevoUsuario = {
            img: response.profileObj.imageUrl,
            name: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            email: response.profileObj.email,
            password: response.googleId + "Ep",
            from: "Google"
        }
        detectFrom(NuevoUsuario)
    }

/*     const responseFacebook = async (response) => {
        console.log(response)
        const NuevoUsuario = {
            img: response.picture.data.url,
            name: response.name,
            lastName: response.lastName,
            email: response.email,
            password: response.id + "Ep",
            from: "Facebook"
        }
        detectFrom(NuevoUsuario)
    } */
    async function newUser(event) {
        event.preventDefault()
        let name = event.target[0].value
        let lastName = event.target[1].value
        let iniciales = name.charAt(0) + lastName.charAt(0)
        const NuevoUsuario = {
            img: iniciales.toUpperCase(),
            name: event.target[0].value,
            lastName: event.target[1].value,
            email: event.target[2].value,
            password: event.target[3].value,
            from: "MyTineray"
        }
        detectFrom(NuevoUsuario)
    }
    async function detectFrom(NuevoUsuario) {
        await axios.post(`${_url}/api/signup", ${ NuevoUsuario }`)
            .then(response => {
                if (response.data.success === "falseVAL") {
                    let detailsError = response.data.response.error.details
                    console.log(detailsError)
                    detailsError.map(error =>
                        swal({
                            title: " error",
                            icon: "error",
                            text: error.message,
                            buttons: "ok"
                        }))
                }
                else if (response.data.success === true) {
                    console.log(response.data);
                    swal({
                        title: " Login...",
                        icon: "success",
                        text: response.data.response,
                        buttons: "ok"
                    })
                }
                else {
                    console.log(response.data)
                    swal({
                        title: response.data.response,
                        icon: "warning",
                        buttons: "ok"
                    })
                }
            })
    }
    return (
        <>
            <div className=" FormulariosSig  d-flex shadow" style={{ backgroundImage: "url(" + bannerSignin + ")"/* , whidth: "100%", height: "100vh", justifyContent: "right", alignItems: "center"*/ }} >
                <div className="desespero">
                    <form onSubmit={newUser} className="container-md form-SignUP">
                        <div className="d-flex">
                            <div className="mb-3 container-md">
                                <label for="exampleInputName" className="form-label">Name</label>
                                <input type="name" className="form-control" id="exampleInputName" aria-describedby="emailHelp" />
                                <div id="exampleInputName" className="form-text">Please enter your Name.</div>
                            </div>
                            <div className="mb-3 container-md">
                                <label for="exampleInputName2" className="form-label">Last Name</label>
                                <input type="name" className="form-control" id="exampleInputName2" aria-describedby="emailHelp" />
                                <div id="exampleInputName2" className="form-text">Please enter your Last Name.</div>
                            </div>
                        </div>
                        <div className="mb-3 container-md">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="" className="form-text">Please enter a email.</div>
                        </div>
                        <div className="d-flex passwordSignUp">
                            <div className="mb-3 container-md" >
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                <div id="exampleInputPassword1" className="form-text">Please enter a password.</div>
                            </div>
                          {/*   <div className="mb-3 container-md" >
                                <label for="exampleInputPassword2" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword2" />
                                <div id="exampleInputPassword2" className="form-text">Please enter again your password.</div>
                            </div> */}
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Remember me</label>
                        </div>
                        <div>
                            <input type="submit" className="btn d-flex btn-signUp" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <div style={{ margin: "4px", backgroundColor: "white", borderStyle: "solid", borderColor: "#ff4b4b", borderRadius: "10px", display: "flex", justifyContent: "center" }}>
                                    <GoogleLogin
                                        clientId="800359852680-6rhb9r988gompretejui4b0lmr8ok60i.apps.googleusercontent.com"
                                        buttonText="SignIn with Google Account"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                               {/*  <div style={{ margin: "4px", backgroundColor: "rgb(76, 105, 186)", borderStyle: "solid", borderColor: "#ff4b4b", borderRadius: "10px", display: "flex", justifyContent: "center" }}>
                                    <FacebookLogin
                                        appId="1157819554991138"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        callback={responseFacebook}
                                    />
                                </div> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default SignUp;



