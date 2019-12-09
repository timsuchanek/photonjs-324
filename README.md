# To reproduce

1. Clone this repository
2. Install Netlify CLI
3. Run `netlify deploy --prod`

This fails before the environment variables come into play, but if needed, add a `DB_URL` env var through your netlify UI. 
