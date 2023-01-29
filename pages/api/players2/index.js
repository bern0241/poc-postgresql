// import knex from '../../lib/utils.js'
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
    
    if (req.method === 'GET') {
        try {
            await knex.from('players').select('*')
            .then((players) => {
                res.status(200).json(players)
            })
        } catch (error) {
            res.status(400).json({ error: 'Teams not found!' })
        }
    }

    // if (req.method === 'GET') {
    //     try {
    //         await knex
    //             .select('*')
    //             .from('players')
    //             .join('teams_players', 'players.id', 'teams_players.player_id')
    //             .join('teams', 'teams.id', 'teams_players.team_id')
    //             .where('teams.id', 1)

    //         .then((players) => {
    //             res.status(200).json(players)
    //         })
    //     } catch (error) {
    //         res.status(400).json({ error: 'Teams not found!' })
    //     }
    // }

    // if (req.method === 'POST') {
    //     try {
    //         const {team} = req.body;
    //         await knex('teams')
    //                 .insert(team)
    //                 // .insert({ first_name: 'Brian', last_name: 'Griffin', email: 'brian@email.com' })
    //         res.status(200).json({ team: "THIS WORKS!" })
    //     } catch (error) {
    //         console.log(error);
    //         // res.status(400).json({ error: 'Team not found!' })
    //     }
    // }
  }
  