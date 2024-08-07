const fs = require('fs')
const path = require('path')
const readline = require('readline')

const envFilePath = path.resolve(
  __dirname,
  '.env'
)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('ENV: ', newEnvValue => {
  fs.readFile(
    envFilePath,
    'utf8',
    (err, data) => {
      if (err) {
        console.error('Error reading .env:', err)
        rl.close()
        return
      }

      const updatedEnv = data.replace(
        /ENV=.*/,
        `ENV=${newEnvValue}`
      )

      fs.writeFile(
        envFilePath,
        updatedEnv,
        'utf8',
        err => {
          if (err) {
            console.error(
              'Error reading .env:',
              err
            )
          } else {
            console.log(
              'ENV updated successfully!'
            )
          }
          rl.close()
        }
      )
    }
  )
})
