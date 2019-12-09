const { Photon } = require('@prisma/photon')
const { spawn } = require('child_process')

const photon = new Photon()

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const os = spawn('cat', ['/etc/os-release'])
    os.stdout.on('data', data => {
      console.log(`stdout: ${data}`)
    })

    os.stderr.on('data', data => {
      console.error(`stderr: ${data}`)
    })

    os.on('close', code => {
      console.log(`child process exited with code ${code}`)
    })

    const data = await photon.users.findMany()
    console.log({ data })
    return {
      statusCode: 200,
      body: JSON.stringify({ message: data }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
