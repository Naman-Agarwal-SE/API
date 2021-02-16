module.exports= {
    env: 'development',
    db: "mongodb://127.0.0.1:27017/gossip",
    port: process.env.PORT || 3000,
    link:'http://localhost:3000/api/users/verified',
  }; 