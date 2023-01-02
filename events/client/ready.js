require('colors')

module.exports = async (client) => {
    console.log("Bot".blue + " >> " + `Connecté sur ${client.user.username}`.green)
}