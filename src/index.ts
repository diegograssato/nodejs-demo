import app from './app'

/** Server */
const PORT: number = parseInt(process.env.SERVER_PORT as string, 10) || 3000

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))
