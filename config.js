const fs = require('fs');
const path = require('path');
const { getConfig } = require("./lib/configdb");

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ===== BOT CORE SETTINGS =====
    SESSION_ID: process.env.SESSION_ID || "IMMU-MD~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0h0T1JTV2t3bVRyeUdMeENRZ0w2OFBUcCtVbmJ3T1IwNVJUSDhPU3BGdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWJ1RWloenVmbm5QeVl2RkVnMExEdzRGZmYrVENpM0lDQk9vcXlGbWZRbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0TDBGVG8rWUx5bDE3Tnc4YzBGek16RW95OEZBSVhMWlZmMG93TnZ4SG1vPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQ3VyaWlzWmNvS2pqbWUyKy94SDFuOEFranN0ajJKeSt1dUlVV2NyOFI0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFPeU1pQjlEeUxZSlJFZlFNYlRCVkdid0ljalRtMktUMkRIanFVOVB2WE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9UMWZ4a2s0NUdxamZHV250RnF3ODVRc0FoKzNXeTM1QlJuV1MxWnpGRk09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU9Cb1JFSXpqcHVuc3NqeEJLT1dCaHhLM3ZqUDBhNUUwOGRmMGUrTk8xaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidlFaQkxFcUxXbEYyYVJkRkZMc3pFSFZjaDEyMUpYZGhSZ0I3Nk9WbG1Dbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikozb1VzdjVZaEZGNmszZjJtZ3RvcVJjYjVzOGtqVGpNOXZCa0RabjlBQ3lPL0dyZ2grNVhRSGxZQ0EyZ2ZtaEpQQVJhdlpaMlk1aElMWmhQNXpoY0RnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMxLCJhZHZTZWNyZXRLZXkiOiJiSU5lNFBESys2WjN4N3lKYUxTdEIwU2xXbXEzdDhHMlpJQm9veDNoUXFvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6ODEzLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6ODEzLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IldCNFBXNU1GIiwibWUiOnsiaWQiOiIyNjM3NzYyMjE0ODI6NkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJ1bnJlYWxpc3RpYyIsImxpZCI6IjE0NDUxNzYzMDA1NDQ4Mzo2QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTUNyMFhjUTJZVFd6Z1lZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVXMxc29ZYmVFeFBtQy9BY3hCSktzOStVTGs3dDY1bzMvb3Y2aTJuWkFGST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiaHpGOVRPYlBYTWV0Q3U2bFRoZ3lNL3BsZk9KTUwxUTFQK2dvbkF2czAwSm9IcHlOUEVKTi94VWN3ZUd4YXJFM2U0Ym9iLzJyU3pVV3kxQnJoUWxERFE9PSIsImRldmljZVNpZ25hdHVyZSI6IklSVExiSDMyZE1FeFE3V0puWmtlN05IUjM4aGQwUzBIV1RyNUdMY0I0TTROWGk2Ti9wOWRhNVB2TE1VMU15cFFSZ2MybmxROEdMTjZ4bytoaVc5NEFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTQ0NTE3NjMwMDU0NDgzOjZAbGlkIiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZMTmJLR0czaE1UNWd2d0hNUVNTclBmbEM1TzdldWFOLzZMK290cDJRQlMifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElCUWdTIn0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc3NTYwMDIyMywibGFzdFByb3BIYXNoIjoiM21sMWpTIn0=",  // Your bot's session ID (keep it secure)
    PREFIX: getConfig("PREFIX") || ".",  // Command prefix (e.g., "., / ! * - +")
    CHATBOT: getConfig("CHATBOT") || "on", // on/off chat bot 
    BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "Unrealistic Mᴅ",  // Bot's display name
    MODE: getConfig("MODE") || process.env.MODE || "public",        // Bot mode: public/private/group/inbox
    REPO: process.env.REPO || "https://github.com/XRI-DOUBLE07/IMMU-MD/forkhttps://github.com/XRI-DOUBLE07/IMMU-MD/fork",  // Bot's GitHub repo
    BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys",  // Bot's BAILEYS

    // ===== OWNER & DEVELOPER SETTINGS =====
    OWNER_NUMBER: process.env.OWNER_NUMBER || "263776221482",  // Owner's WhatsApp number
    OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "Unrealistic Mᴅ",           // Owner's name
    DEV: process.env.DEV || "263776221482",                     // Developer's contact number
    DEVELOPER_NUMBER: '263776221482@s.whatsapp.net',            // Developer's WhatsApp ID

    // ===== AUTO-RESPONSE SETTINGS =====
    AUTO_REPLY: process.env.AUTO_REPLY || "false",              // Enable/disable auto-reply
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",// Reply to status updates?
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*Iᗰᗰᑌ ᗰᗪ VIEWED YOUR STATUS 🤖*",  // Status reply message
    READ_MESSAGE: process.env.READ_MESSAGE || "false",          // Mark messages as read automatically?
    REJECT_MSG: process.env.REJECT_MSG || "*📞 THIS PERSON NOT ALLOWED CALL*",
    // ===== REACTION & STICKER SETTINGS =====
    AUTO_REACT: process.env.AUTO_REACT || "false",              // Auto-react to messages?
    OWNER_REACT: process.env.OWNER_REACT || "false",              // Auto-react to messages?
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",          // Use custom emoji reactions?
    CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",  // set custom reacts
    STICKER_NAME: process.env.STICKER_NAME || "𝐈ᴍᴍυ Mᴅ",     // Sticker pack name
    AUTO_STICKER: process.env.AUTO_STICKER || "false",          // Auto-send stickers?
    // ===== MEDIA & AUTOMATION =====
    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",      // Auto-record voice notes?
    AUTO_TYPING: process.env.AUTO_TYPING || "false",            // Show typing indicator?
    MENTION_REPLY: process.env.MENTION_REPLY || "false",   // reply on mentioned message 
    MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://i.postimg.cc/sX3jN3p0/immu-md.png",  // Bot's "alive" menu mention image

    // ===== SECURITY & ANTI-FEATURES =====
    ANTI_DELETE: process.env.ANTI_DELETE || "true", // true antidelete to recover deleted messages 
    ANTI_CALL: process.env.ANTI_CALL || "false", // enble to reject calls automatically 
    ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "false",    // Block bad words?
    ANTI_LINK: process.env.ANTI_LINK || "true",    // Block links in groups
    ANTI_VV: process.env.ANTI_VV || "true",   // Block view-once messages
    DELETE_LINKS: process.env.DELETE_LINKS || "true",          // Auto-delete links?
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "same", // inbox deleted messages (or 'same' to resend)
    ANTI_BOT: process.env.ANTI_BOT || "true",
    PM_BLOCKER: process.env.PM_BLOCKER || "true",

    // ===== BOT BEHAVIOR & APPEARANCE =====
    DESCRIPTION: process.env.DESCRIPTION || "*📌 ᴘᴏᴡᴇʀ ʙʏ 𝐌ᴀғɪᴀ 𝐈ᴍᴀᴅ*",  // Bot description
    PUBLIC_MODE: process.env.PUBLIC_MODE || "true",              // Allow public commands?
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",        // Show bot as always online?
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "false", // React to status updates?
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true", // VIEW to status updates?
    AUTO_BIO: process.env.AUTO_BIO || "true", // ture to get auto bio 
    WELCOME: process.env.WELCOME || "false", // true to get welcome in groups 
    GOODBYE: process.env.GOODBYE || "false", // true to get goodbye in groups 
    ADMIN_ACTION: process.env.ADMIN_ACTION || "false", // true if want see admin activity 
};
        
