import fs from 'fs'
import { Router } from 'express'
const routes = Router()
fs.readdirSync('./src/routes').forEach(async (file) => {
  const fileName = file.split('.')[0] // Remove a extensão do arquivo
  const [routeName] = fileName.split('/')
  if (fileName === 'index') return // Separa o nome da rotaz do diretório
  const route = await import(`./${file}`)
  routes.use(`/${routeName}`, route.default)
})
export default routes
