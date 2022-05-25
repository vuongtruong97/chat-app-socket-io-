const { CODE_VERIFIER, ZALO_ID, ZALO_REDIRECT_URI, ZALO_CODE_CHALLENGE, STATE } = process.env

// const zaloUrl = `https://oauth.zaloapp.com/v4/permission?app_id=${ZALO_ID}&redirect_uri=${ZALO_REDIRECT_URI}&code_challenge=${ZALO_CODE_CHALLENGE}&state=${STATE}`
const zaloUrl = 'https://oauth.zaloapp.com/v4/oa/permission?app_id=1755876041930040542&redirect_uri=https%3A%2F%2Fvuong-chat-app.herokuapp.com%2Foauth%2Fzalo%2Fredirect&code_challenge=G9qt9nnpBBOz6mVLfn2neE8S4CvzIS0JzKRu8IeuN8M'

module.exports = zaloUrl
