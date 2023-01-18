import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import { searchQuery, feedQuery } from '../utils/data';

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
      });
    }
  }, [categoryId]);

  return <div> {pins && <MasonryLayout pins={pins} />} </div>;
};

export default Feed;
