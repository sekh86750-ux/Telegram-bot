const { Markup } = require("telegraf");
const { BOT_NAME } = require("../config");

const HELP = `
🤖 ${BOT_NAME} — COMMANDS

/start  - Bot চালু
/help   - সব কমান্ড
/ping   - Bot status
/id     - Telegram ID
/rules  - Group rules

ADMIN (কোনো সদস্যের মেসেজে reply করে ব্যবহার করুন)
/ban
/kick
/mute
/unmute
/warn
/warnings
/resetwarn

OWNER
/broadcast আপনার মেসেজ
`;

function registerGeneral(bot) {
  bot.start((ctx) => ctx.reply(
    `স্বাগতম! 👋 আমি ${BOT_NAME}.\n/help লিখে কমান্ড দেখুন।`,
    Markup.inlineKeyboard([
      Markup.button.url("➕ Add to a group", `https://t.me/${ctx.botInfo.username}?startgroup=true`)
    ])
  ));

  bot.help((ctx) => ctx.reply(HELP));
  bot.command("ping", (ctx) => ctx.reply("🏓 Pong! AriYan-Bot online."));
  bot.command("id", (ctx) => ctx.reply(
    `Your ID: ${ctx.from.id}\nChat ID: ${ctx.chat.id}`
  ));
  bot.command("rules", (ctx) => ctx.reply(
    "📌 GROUP RULES\n1. সবাইকে সম্মান করুন\n2. Spam করবেন না\n3. অনুমতি ছাড়া link দেবেন না\n4. Telegram-এর নিয়ম মানুন"
  ));

  bot.on("new_chat_members", async (ctx) => {
    for (const member of ctx.message.new_chat_members) {
      if (member.id !== ctx.botInfo.id) {
        await ctx.reply(`স্বাগতম, ${member.first_name}! 🎉`);
      }
    }
  });

  bot.on("left_chat_member", (ctx) => {
    const member = ctx.message.left_chat_member;
    return ctx.reply(`বিদায়, ${member.first_name}!`);
  });
}

module.exports = { registerGeneral };
