import React from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import DBZvideo from '../assets/DBZ video.mp4';
import logo from '../assets/dbzLogoDragon.png';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const createOrGetUser = async (response) => {
    const decoded = jwt_decode(response.credential);

    localStorage.setItem('user', JSON.stringify(decoded));

    const { name, picture, sub } = decoded;

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
      powerLevel: 100,
    };

    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={DBZvideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            {/** I Should add a ternary operator here to check to see if user is already logged in */}
            <GoogleLogin
              onSuccess={createOrGetUser}
              onError={createOrGetUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
