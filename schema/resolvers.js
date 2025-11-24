const { UserList, MovieList } = require('../FakeData');
const _ = require('lodash');

const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id; // The args parameter is always 2nd. Parent would be first.
      const user = _.find(UserList, { id: Number(id) }); // if the key and value 'id' are the same you can also just do { id } instead of {id: id}
      return user;
      /* 
      This is where you would do your logic to SELECT id from your DB, if you are working with one
      */
    },

    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },

  User: {
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      //   const id = args.input.id;
      //   const newUsername = args.input.newUsername;
      const { id, newUsername } = args.input; // destructuring to handle multiple variables in one line, instead of the above
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });
      return userUpdated;
    },
  },
};

module.exports = { resolvers };
