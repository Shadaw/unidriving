import express from 'express';

const app = express();

app.listen(3333, () => {
  console.log(`Server listen on port 3333`);
});
