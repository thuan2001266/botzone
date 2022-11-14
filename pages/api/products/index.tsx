import clientPromise from "../../../lib/connect";

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case "GET": {
            try {
                // connect to the database
                let client = await clientPromise;
                let db = client.db("botzone");
                // fetch the posts
                let posts = await db.collection("products").find({}).toArray();
                // return the posts
                return res.json({
                    message: JSON.parse(JSON.stringify(posts)),
                    success: true,
                });
            } catch (error) {
                // return the error
                return res.json({
                    message: new Error(error).message,
                    success: false,
                });
            }
        }
    }
}
