"use client";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// import Loader from 'react-Loader-spiner'
import { login, resetRegister } from "./../action/auth";

import { IoIosEyeOff } from "react-icons/io";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const router = useRouter();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const { userName, password } = formData;

  useEffect(() => {
    if (dispatch && dispatch != null && dispatch != undefined)
      dispatch(resetRegister());
  }, []);

  const onChangeUsername = (e) => {
    setFormData({ ...formData, userName: e.target.value });
  };

  const onChangePassword = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (dispatch && dispatch != null && dispatch != undefined)
      dispatch(login(userName, password));
    // console.log(userName,password)
  };

  
  if (typeof window != "undefined" && isAuthenticated) {
    router.push("/allOrder");
  }
  return (
    <>
      <div class="login-container">
        <img
          class="brand-img"
          src="https://qwqwerlogo.s3.ap-south-1.amazonaws.com/dms_pak_logo.png"
        />

        <div className="container">
          <div class="row login-box-row">
            <div class="col-lg-3 bg-mer-theme"></div>
            <div class="col-lg-6">
              <div class="card px-1 text-white">
                <div class="card-body">
                  <div class="card-title text-center ">
                    <h4>Login</h4>
                    <small>If you already have an account login here</small>
                  </div>
                  <form novalidate="" class="ng-touched ng-dirty ng-valid ">
                    <div translate hidden class="alert alert-danger"></div>
                    <div class="form-group pb-3">
                      <label class="d-block">
                        <div class="input-box">
                        <input 
                        type="text"
                        value={userName}
                        onChange={onChangeUsername}
                       formcontrolname="username"
                        autocomplete="username" 
                        autoSave="Allow"
                        class="form-control custom-input ng-dirty ng-valid ng-touched" placeholder="User Name"/>
                          </div>

                        <span hidden translate>
                          User Name
                        </span>
                        <small className="text-error" translate hidden>
                          User Name is required
                        </small>
                      </label>
                    </div>
                    <div class="form-group">
                      <label class="d-block">
                        <div class="input-box">
                          <input
                            minlength="8"
                            maxlength="15"
                            formcontrolname="password"
                            autoSave="Allow"
                        autocomplete="password" 
                            value={password}
                            onChange={onChangePassword}
                            required
                            class="form-control custom-input ng-touched ng-dirty ng-valid"
                            type="password"
                            placeholder="Password"
                          />

                          <div class="py-2 ">
                            <IoIosEyeOff size={20} color={"black"} />
                          </div>
                        </div>
                        <span hidden translate>
                          Password
                        </span>
                        <small className="text-error" translate hidden>
                          Password is required
                        </small>
                      </label>
                    </div>
                    <div class="">
                      <div class="row otp-pwd-login mt-4">
                        <div class="col-5 use-password">
                          <p class="otp-pwd-title">Use Password</p>
                        </div>
                        <div class="col-2 otp-pwd-toggle">
                          <div class="custom-toggle-switch">
                            <label class="switch">
                              <input type="checkbox" />
                              <span class="slider round"></span>
                            </label>
                          </div>
                        </div>
                        <div class="col-5 use-OTP">
                          <p class="otp-pwd-title">Use OTP</p>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      onClick={handleLogin}
                      class="btn-custom w-100"
                    >
                      <span translate>LOGIN</span>
                    </button>
                  </form>
                </div>
              </div>

              <div class="row ">
                <div className="col-5 col-sm-5 col-md-5 col-lg-5 link-custom">
                  <Link href="/forgot-password">
                    <span className="login-footer-text">Forgot password?</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
