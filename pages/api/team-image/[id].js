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

    if (req.method === 'PATCH') {
        try {
            const {newImageUrl} = req.body;
            await knex.from('teams').where({ id: id })
            .update({imagesrc: newImageUrl})
            .then((team) => {
                res.status(204).send("Team picture updated!!")
            })
        } catch (error) {
            res.status(400).json({ error: 'Team not found or updated!', query: req.query })
        }
    }
  }