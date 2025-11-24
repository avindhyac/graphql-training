import React from 'react';
import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client/react';

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

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState('');

  // Create User States
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [nationality, setNationality] = useState('');

  const {
    data: userData,
    loading: userLoading,
    refetch,
  } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(QUERY_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (userLoading) {
    return <h2>Loading Users</h2>;
  }

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Name...'
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Username...'
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type='number'
          placeholder='Age...'
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Nationality...'
          onChange={(event) => {
            setNationality(event.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: {
                  name,
                  username,
                  age: Number(age),
                  nationality,
                },
              },
            });
            refetch();
          }}>
          Create User
        </button>
      </div>
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
