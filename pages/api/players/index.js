import { knex } from "../../../lib/utils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await knex
        .from("players")
        .select("id", "first_name", "last_name", "email")
        .then((players) => {
          res.status(200).json(players);
        });
    } catch (error) {
      res.status(400).json({ error: "Player not found!" });
    }
  }
  if (req.method === "POST") {
    try {
      const { player } = req.body;
      await knex("players").insert(player);
      res.status(200).json({ message: "Player added" });
    } catch (error) {
      res.status(400).json({ error: "Player not found!" });
    }
  }
}
