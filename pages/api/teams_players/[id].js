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
    
    if (req.method === 'DELETE') {

        try {
            await knex.from('teams_players').where({ player_id: id })
            .del()
            .then((player) => {
                res.status(204).send("Player deleted!")
            })
        } catch (error) {
            res.status(400).json({ error: 'Team not found or deleted!', query: req.query })
        }
    }
  }