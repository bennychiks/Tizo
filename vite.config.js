import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'

function systemDataSyncPlugin() {
  return {
    name: 'vite-plugin-system-data-sync',
    configureServer(server) {
      server.middlewares.use('/api/save-system-data', (req, res, next) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              const { sermons, events, prayers, ministries, givingLog, settings } = data

              const fileContent = `// Auto-generated system data updated by Admin Dashboard
export const INITIAL_SERMONS = ${JSON.stringify(sermons, null, 2)}

export const INITIAL_EVENTS = ${JSON.stringify(events, null, 2)}

export const INITIAL_PRAYERS = ${JSON.stringify(prayers, null, 2)}

export const INITIAL_MINISTRIES = ${JSON.stringify(ministries, null, 2)}

export const INITIAL_GIVING_LOG = ${JSON.stringify(givingLog, null, 2)}

export const INITIAL_SETTINGS = ${JSON.stringify(settings, null, 2)}
`

              const filePath = path.resolve(process.cwd(), 'src/data/initialData.js')
              fs.writeFileSync(filePath, fileContent, 'utf-8')

              const jsonPath = path.resolve(process.cwd(), 'src/data/data.json')
              fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8')

              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: true, message: 'System files updated successfully!' }))
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
        } else {
          next()
        }
      })

      server.middlewares.use('/api/git-sync', (req, res, next) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            let commitMsg = 'Admin updated site data in repository'
            try {
              if (body) {
                const parsed = JSON.parse(body)
                if (parsed.message) commitMsg = parsed.message
              }
            } catch (e) {}

            const safeMsg = commitMsg.replace(/"/g, '\\"')
            const cmd = `git add src/data/initialData.js src/data/data.json && git commit -m "${safeMsg}" && git push`
            
            exec(cmd, { cwd: process.cwd() }, (error, stdout, stderr) => {
              if (error) {
                const outputStr = (stdout || '') + ' ' + (stderr || '') + ' ' + error.message
                const isNothingToCommit = outputStr.includes('nothing to commit') || outputStr.includes('clean')
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ 
                  success: isNothingToCommit ? true : false, 
                  committed: !isNothingToCommit,
                  output: stdout || stderr || error.message,
                  warning: error ? error.message : null
                }))
              } else {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ success: true, output: stdout || 'Committed and pushed to GitHub successfully!' }))
              }
            })
          })
        } else {
          next()
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), systemDataSyncPlugin()],
  base: './', // Ensures assets load correctly on GitHub Pages subpaths
})

