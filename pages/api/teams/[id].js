import { useRouter } from 'next/router'

const knex = require('knex')({
    client: 'postgresql',
    connection: {
      host: 'db.cksknkwgxhanhtilnycs.supabase.co',
      user: 'postgres',
      password: 'oR2b5sWTQP6qehEk',
      database: 'postgres'
    },
    pool: { min: 0, max: 7 }
})

export default async function handler(req, res) {
    
    const {id} = req.query;

    if (req.method === 'GET') {
        try {
            const team = await knex.from('teams').where({ id: id })
            const players = await knex
                .select('*')
                .from('players')
                .join('teams_players', 'players.id', 'teams_players.player_id')
                .join('teams', 'teams.id', 'teams_players.team_id')
                .where('teams.id', id)
            
            res.status(200).json({
                status: 'success',
                // results: restaurantRatingsData.rows.length,
                data: {
                    team: team[0],
                    players: players
                }
            })
        } catch (error) {
            res.status(400).json({ error: 'Team not found!', query: req.query })
        }
    }

    if (req.method === 'PATCH') {
        try {
            const {team} = req.body;
            await knex.from('teams').where({ id: id })
            .update(team)
            .then((team) => {
                res.status(204).send("Team updated!!")
            })
        } catch (error) {
            res.status(400).json({ error: 'Team not found or updated!', query: req.query })
        }
    }

    if (req.method === 'DELETE') {
        try {
            await knex.from('teams').where({ id: id })
            .del()
            .then((team) => {
                res.status(204).send("Team deleted!")
            })
        } catch (error) {
            res.status(400).json({ error: 'Team not found or deleted!', query: req.query })
        }
    }
  }