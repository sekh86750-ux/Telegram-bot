const { isGroup, isAdmin } = require("../utils/admin");

function linkFilter() {
  return async (ctx, next) => {
    if (!isGroup(ctx) || !ctx.message?.text) return next();

    const hasLink = /(https?:\/\/|www\.|t\.me\/|telegram\.me\/)/i.test(ctx.message.text);
    if (!hasLink || await isAdmin(ctx)) return next();

    try {
      await ctx.deleteMessage();
      await ctx.telegram.sendMessage(
        ctx.chat.id,
        "⚠️ Link পাঠানোর অনুমতি শুধু অ্যাডমিনদের আছে।"
      );
    } catch (error) {
      console.error("Link filter:", error.message);
    }
  };
}

module.exports = { linkFilter };
