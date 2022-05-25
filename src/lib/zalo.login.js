const { CODE_VERIFIER, ZALO_ID, ZALO_REDIRECT_URI, ZALO_CODE_CHALLENGE, STATE } = process.env

const zaloUrl = `https://oauth.zaloapp.com/v4/permission?app_id=${ZALO_ID}&redirect_uri=${ZALO_REDIRECT_URI}&code_challenge=${ZALO_CODE_CHALLENGE}&state=${STATE}`

module.exports = zaloUrl
