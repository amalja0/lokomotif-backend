import mongoose from "mongoose";

const lokomotifSchema = new mongoose.Schema({
    kodeLoko: String,
    namaLoko: String,
    dimensiLoko: String,
    status: String,
    createdDate: String,
});

export const Lokomotif = mongoose.model('Lokomotif', lokomotifSchema);