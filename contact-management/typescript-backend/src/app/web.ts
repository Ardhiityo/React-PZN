import express from "express";
import exception from "../middleware/exception-middleware";
import publicApi from "../routes/public-api";
import authApi from "../routes/api";
import cors from "cors";

const web = express();

web.use(express.json());
web.use(cors());

web.use(publicApi);
web.use(authApi);

web.use(exception)

export default web;