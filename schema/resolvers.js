const { UserList } = require('../FakeData');
const _ = require('lodash');

const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id; // The args parameter is always 2nd. Parent would be first.
      const user = _.find(UserList, { id }); // if the key and value 'id' are the same you can also just do { id } instead of {id: id}
      /* 
      This is where you would do your logic to SELECT id from your DB, if you are working with one
      */
    },
  },
};

module.exports = { resolvers };
