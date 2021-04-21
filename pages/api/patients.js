import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const patients = await db
        .collection("data")
        .find({})
        .toArray();

    res.json(patients)
}