import { knex } from "../../../lib/utils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await knex("players")
        .where("id", req.query.id)
        .select()
        .then((players) => {
          // The response is an array, so spreading gives us the player object
          res.status(200).json(...players);
        });
    } catch (error) {
      res.status(400).json({ error: "Player not found!" });
    }
  }
  if (req.method === "PATCH") {
    try {
      const data = await JSON.parse(req.body);
      await knex("players").where("id", req.query.id).update(data);
      res.status(200).json({ message: "Player deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  if (req.method === "DELETE") {
    try {
      await knex("players").where("id", req.query.id).del();
      res.status(200).json({ message: "Player deleted" });
    } catch (error) {
      res.status(400).json({ error: "Player not found!" });
    }
  }
}
