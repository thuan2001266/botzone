import { ObjectID } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/connect";
import { Data } from "../../../interface";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const id = req.query.detail;
    try {
        // connect to the database
        let client = await clientPromise;
        let db = client.db("botzone");
        // fetch the posts
        let posts = await db
            .collection("products")
            .find(new ObjectID(id + ""))
            .toArray();
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(posts)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: error + "",
            success: false,
        });
    }
}
