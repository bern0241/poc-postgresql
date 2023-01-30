import { knex } from "../../../lib/utils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await knex("players")
        .where("id", req.query.id)
        .select()
        .then(async (players) => {
          // The response is an array, and since we're only querying 1 player
          // the length will always be 1, and this we get the first element
          const player = players[0];
          // Get the player's teams
          // If theres no teams, return an empty array
          const playerTeams =
            (await knex("teams").whereIn("id", player.teams).select()) || [];
          res.status(200).json({
            player: player,
            playerTeams: playerTeams,
          });
        });
    } catch (error) {
      res.status(400).json({ error: error.message });
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
