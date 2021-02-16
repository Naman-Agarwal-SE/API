module.exports= {
    env: 'production',
    db: "mongodb+srv://test:test@cluster0.26fqw.mongodb.net/gossip?retryWrites=true&w=majority",
    port: process.env.PORT || 3000,
    link:'https://gossip-api.herokuapp.com/api/users/verified',
  }; 