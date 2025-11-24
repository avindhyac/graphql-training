import React from 'react';
import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery, useLazyQuery } from '@apollo/client/react';

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const QUERY_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState('');

  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(QUERY_MOVIE_BY_NAME);

  if (userLoading) {
    return <h2>Loading Users</h2>;
  }

  if (userError) {
    console.log(userError);
  }
  if (movieError) {
    console.log(movieError);
  }

  return (
    <div>
      <div>
        {userData &&
          userData.users.map((user) => {
            return (
              <div>
                <h1>Name: {user.name} </h1>
                <h1>Username: {user.username} </h1>
                <h1>Age: {user.age} </h1>
                <h1>Nationality: {user.nationality} </h1>
              </div>
            );
          })}
      </div>
      {movieData &&
        movieData.movies.map((movie) => {
          return <h1>Name: {movie.name} </h1>;
        })}
      <div>
        <input
          type='text'
          placeholder='Interstellar..'
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        />
        <button
          onClick={() =>
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            })
          }>
          Fetch Movie
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h1>MovieName: {movieSearchedData.movie.name}</h1>
              <h1>
                Year of Publication: {movieSearchedData.movie.yearOfPublication}
              </h1>
            </div>
          )}
          {movieError && (
            <h1>
              There was an error fetching the data for your query:{' '}
              {movieSearched}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
