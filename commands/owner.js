const { OWNER_ID } = require("../config");

function registerOwner(bot, chatTracker) {
  bot.command("broadcast", async (ctx) => {
    if (!OWNER_ID || ctx.from.id !== OWNER_ID) {
      return ctx.reply("⛔ শুধু bot owner এই command ব্যবহার করতে পারবেন।");
    }

    const message = ctx.message.text.replace(/^\/broadcast(@\w+)?\s*/i, "").trim();
    if (!message) return ctx.reply("ব্যবহার: /broadcast আপনার মেসেজ");

    let sent = 0;
    for (const chatId of chatTracker.getChats()) {
      try {
        await ctx.telegram.sendMessage(chatId, message);
        sent++;
      } catch (error) {
        console.error(`Broadcast to ${chatId}:`, error.message);
      }
    }
    await ctx.reply(`✅ ${sent}টি chat-এ broadcast পাঠানো হয়েছে।`);
  });
}

module.exports = { registerOwner };
