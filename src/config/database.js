export default {
  database: 'meetapp',
  dialect: 'postgres',
  host: '192.168.99.100',
  port: '5433',
  password: '123456',
  username: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
