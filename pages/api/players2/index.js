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
  }
  