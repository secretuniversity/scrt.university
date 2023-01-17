import compression from 'compression';
import express from 'express';

const app = express();

app.use(compression());
