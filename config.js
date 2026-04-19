const fs = require('fs');
const path = require('path');
const { getConfig } = require("./lib/configdb");

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ===== BOT CORE SETTINGS =====
    SESSION_ID: process.env.SESSION_ID ||"IMMU-MD~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUVtVWVoQ2hTVHBjdGljTzZwK29SMWNhcllWdFoxVDMxdUlEdUxrNUFYZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1UvQ3RXZ29jOGs0TWdMVUFWSGpjMWhaNUJyZHVQSS9ZMGpnN2NsTmoyYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Q0VaL01UdGtiQzJTaHpudDdua0ZyUzM4QUZuemc3Z1JmZHVWWmoyYVZJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQWlWQXdqUGRrMjN0UDUwM1JTaW05WE92MlM5UmhHaHBRN1hQQjd5Y2tNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhFSlF6MG54bHBHc3JXRHJvNUxHQlRQNDdZVDFrRmN5dUkyazl3aXJWMDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitVOEo0RjE1Nnp6bHVqTURKT1RkaTZqSHNFeVFMaXd3YWpBbUZ2d1ZLU1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUQ1Q0ZBVmR0Y3NkNzNtbldVSEJVSms5NllscXpiL0puUVZJZ3MrWHdVST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYng1QmdXbGRjcTNiaUdpQTZtRFlDWjBwL3BHaFBGMVpCcC96cHNCTkdFMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9mK293NGFmRW1WbTFtWkFyME1XSXpvZnladVEvdm5YaG5MV3FwblNtR0hmZG1pcWNpL0pYc0pkakI5YWZQQmtzZklFOVU1dUtJTk1RTE80Sytycmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTQsImFkdlNlY3JldEtleSI6IlY2YzlFNGtOdkFtc0F2RldEQ2RUcFpQaSszSU9pMTJiSTdIdGFTNWJYTms9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjo4MTMsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo4MTMsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiSFdNSktTRTQiLCJtZSI6eyJpZCI6IjI2Mzc3NjIyMTQ4Mjo4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6InVucmVhbGlzdGljIiwibGlkIjoiMTQ0NTE3NjMwMDU0NDgzOjhAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNR3IwWGNRMWMrUnp3WVlBaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJVczFzb1liZUV4UG1DL0FjeEJKS3M5K1VMazd0NjVvMy9vdjZpMm5aQUZJPSIsImFjY291bnRTaWduYXR1cmUiOiJGOGkxWGRjM01aQnhFU01jOVZycEVQK21wOVpBblcveFpqU2VWVXlOL2lTN04xL3NJbnJ2dU9tdHdLQmljTDVOd2R6RnNVd3lLNHJreUlrWmxsRXFEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQi84Y1VwdHZNMHFwanBXa3JvczlhWjg5ZUFtNUx4eVhWKzFEcDdML3V6M2ZzVWg1dW1oaGxYLzNJaG95eVB5YnZYY0llN25wV2Y3VnFQNVVlNmVqaWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIxNDQ1MTc2MzAwNTQ0ODM6OEBsaWQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVkxOYktHRzNoTVQ1Z3Z3SE1RU1NyUGZsQzVPN2V1YU4vNkwrb3RwMlFCUyJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUJRZ1MifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzc2NTc2NDc3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9qWSJ9",  // Your bot's session ID (keep it secure)
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
        
