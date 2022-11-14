import clientPromise from "../../../lib/connect";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("botzone");
    switch (req.method) {
        case "GET":
            const posts = await db.collection("products").find({}).toArray();
            res.json({ status: 200, data: posts });
            break;
    }
}
