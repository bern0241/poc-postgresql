import { knex } from "../../../lib/utils";

export default async function handler(req, res) {
  // if (req.method === "GET") {
  //   try {
  //     await knex("players")
  //       .where("id", req.query.id)
  //       .select()
  //       .then(async (players) => {
  //         // The response is an array, and since we're only querying 1 player
  //         // the length will always be 1, and this we get the first element
  //         const player = players[0];
  //         // Get the player's teams
  //         // If theres no teams, return an empty array
  //         const playerTeams =
  //           (await knex("teams").whereIn("id", player.teams).select()) || [];
  //         res.status(200).json({
  //           player: player,
  //           playerTeams: playerTeams,
  //         });
  //       });
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // }
  if (req.method === 'GET') {
    try {
        const player = await knex.from('players').where({ id: req.query.id })
        const teams = await knex
                .select('*')
                .from('teams')
                .join('teams_players', 'teams.id', 'teams_players.team_id')
                .join('players', 'players.id', 'teams_players.player_id')
        
        res.status(200).json({
            status: 'success',
            // results: restaurantRatingsData.rows.length,
            data: {
                player: player[0],
                teams: teams
            }
        })
    } catch (error) {
        res.status(400).json({ error: 'Player not found!', query: req.query })
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
