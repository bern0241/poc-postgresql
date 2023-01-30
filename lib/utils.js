export const knex = require("knex")({
  client: "postgresql",
  connection: {
    host: "db.cksknkwgxhanhtilnycs.supabase.co",
    user: "postgres",
    password: "oR2b5sWTQP6qehEk",
    database: "postgres",
  },
  pool: { min: 0, max: 7 },
});
