import React, { useState, useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, UrlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);
        client.fetch(query).then((res) => setPins(res));
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) return <Spinner message={'Loading'}></Spinner>;

  return (
    <div
      className="flex xl-flex-row flex-col m-auto bg-white"
      style={{ maxWidth: '1500px', borderRadius: '32px' }}
    >
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img
          src={pinDetail?.image && UrlFor(pinDetail.image).url()}
          className="rounded-t-3xl rounded-b-lg"
          alt="user-post"
        />
      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <a href={`${pinDetail.image.asset.url}?dl=`} download>
              <MdDownloadForOffline />
            </a>
          </div>
          <a href={pinDetail?.destination} target="_blank">
            {pinDetail.destination}
          </a>
        </div>
        <div>
          <h1 className="text-4xl font-bold break-workds mt-3">
            {pinDetail.title}
          </h1>
          <p className="mt-3"> {pinDetail.about} </p>
        </div>
        <Link
          to={`user-profile/${pinDetail?.postedBy?._id} `}
          className="flex gap-2 mt-5 items-center bg-white rounded-lg"
        >
          <img
            src={pinDetail?.postedBy.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p className="font-bold">{pinDetail?.postedBy.userName}</p>
        </Link>
        <h2 className="mt-5 text-2xl"> Comments </h2>
        <div className="max-h-370 overflow-y-auto">
          {pinDetail?.comments?.map((item) => (
            <div
              className="flex gap-2 mt-5 items-center bg-white rounded-lg"
              key={item.comment}
            >
              <img
                src={comment.postedBy.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
