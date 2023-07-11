require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
  try {
    await sequelize.authenticate();
    const notes = await sequelize.query('SELECT * FROM blogs', { type: Sequelize.QueryTypes.SELECT });
    notes.forEach(note => {
      console.log(`${note.author}: '${note.title}', ${note.likes} likes`);
    });
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();