import React from 'react';
import { UrlFor } from '../client';

const Pin = ({ pin: { postedBy, image, _id, destination } }) => {
  return (
    <div>
      <img
        className="rounded-lg w-full"
        alt="user-post"
        src={UrlFor(image).width(150).url()}
      />
    </div>
  );
};

export default Pin;
