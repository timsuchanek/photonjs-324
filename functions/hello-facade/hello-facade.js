const { Photon } = require('@prisma/photon')
const { getPlatform } = require('@prisma/get-platform')

const photon = new Photon()

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const platform = await getPlatform()
    console.log(platform)
    const data = await photon.users.findMany()
    // console.log({ data })
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
