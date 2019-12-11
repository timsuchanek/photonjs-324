const { Photon } = require('@prisma/photon')
process.env.DEBUG = '*'
const { getPlatform } = require('@prisma/get-platform')
const globby = require('globby')

// const photon = new Photon()

if (false) {
  require('@prisma/photon/runtime/query-engine-rhel-openssl-1.0.x')
}

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const platform = await getPlatform()
    console.log(platform)
    const files = await globby(['node_modules/@prisma/photon/**/*'])
    // const data = await photon.users.findMany()
    // console.log({ data })
    return {
      statusCode: 200,
      body: JSON.stringify({ message: platform, files }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
