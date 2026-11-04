const { requireAdmin, repliedUser } = require("../utils/admin");

function registerModeration(bot) {
  const warningCounts = new Map();
  const keyFor = (chatId, userId) => `${chatId}:${userId}`;

  bot.command("ban", async (ctx) => {
    if (!(await requireAdmin(ctx))) return;
    const user = repliedUser(ctx);
    if (!user) return ctx.reply("সদস্যের মেসেজে reply করে /ban লিখুন।");
    if (user.id === ctx.from.id) return ctx.reply("নিজেকে ban করা যাবে না।");
    try {
      await ctx.telegram.banChatMember(ctx.chat.id, user.id);
      await ctx.reply(`🚫 ${user.first_name} banned.`);
    } catch (e) { await ctx.reply(`করা যায়নি: ${e.message}`); }
  });

  bot.command("kick", async (ctx) => {
    if (!(await requireAdmin(ctx))) return;
    const user = repliedUser(ctx);
    if (!user) return ctx.reply("সদস্যের মেসেজে reply করে /kick লিখুন।");
    try {
      await ctx.telegram.banChatMember(ctx.chat.id, user.id);
      await ctx.telegram.unbanChatMember(ctx.chat.id, user.id, { only_if_banned: true });
      await ctx.reply(`👢 ${user.first_name} removed.`);
    } catch (e) { await ctx.reply(`করা যায়নি: ${e.message}`); }
  });

  bot.command("mute", async (ctx) => {
    if (!(await requireAdmin(ctx))) return;
    const user = repliedUser(ctx);
    if (!user) return ctx.reply("সদস্যের মেসেজে reply করে /mute লিখুন।");
    try {
      await ctx.telegram.restrictChatMember(ctx.chat.id, user.id, {
        permissions: { can_send_messages: false }
      });
      await ctx.reply(`🔇 ${user.first_name} muted.`);
    } catch (e) { await ctx.reply(`করা যায়নি: ${e.message}`); }
  });

  bot.command("unmute", async (ctx) => {
    if (!(await requireAdmin(ctx))) return;
    const user = repliedUser(ctx);
    if (!user) return ctx.reply("সদস্যের মেসেজে reply করে /unmute লিখুন।");
    try {
      await ctx.telegram.restrictChatMember(ctx.chat.id, user.id, {
        permissions: {
          can_send_messages: true,
          can_send_audios: true,
          can_send_documents: true,
          can_send_photos: true,
          can_send_videos: true,
          can_send_video_notes: true,
          can_send_voice_notes: true,
          can_send_polls: true,
          can_send_other_messages: true,
          can_add_web_page_previews: true
        }
      });
      await ctx.reply(`🔊 ${user.first_name} unmuted.`);
    } catch (e) { await ctx.reply(`করা যায়নি: ${e.message}`); }
  });

  bot.command("warn", async (ctx) => {
    if (!(await requireAdmin(ctx))) return;
    const user = repliedUser(ctx);
    if (!user) return ctx.reply("সদস্যের মেসেজে reply করে /warn লিখুন।");
    const key = keyFor(ctx.chat.id, user.id);
    const count = (warningCounts.get(key) || 0) + 1;
    warningCounts.set(key, count);
    await ctx.reply(`⚠️ ${user.first_name}-কে warning দেওয়া হলো। মোট: ${count}`);
  });

  bot.command("warnings", async (ctx) => {
    if (!(await requireAdmin(ctx))) return;
    const user = repliedUser(ctx);
    if (!user) return ctx.reply("সদস্যের মেসেজে reply করে /warnings লিখুন।");
    await ctx.reply(`${user.first_name}-এর warning: ${warningCounts.get(keyFor(ctx.chat.id, user.id)) || 0}`);
  });

  bot.command("resetwarn", async (ctx) => {
    if (!(await requireAdmin(ctx))) return;
    const user = repliedUser(ctx);
    if (!user) return ctx.reply("সদস্যের মেসেজে reply করে /resetwarn লিখুন।");
    warningCounts.delete(keyFor(ctx.chat.id, user.id));
    await ctx.reply(`✅ ${user.first_name}-এর warning reset হয়েছে।`);
  });
}

module.exports = { registerModeration };
