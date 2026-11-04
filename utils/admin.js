function isGroup(ctx) {
  return ["group", "supergroup"].includes(ctx.chat?.type);
}

async function isAdmin(ctx, userId = ctx.from?.id) {
  if (!isGroup(ctx) || !userId) return false;
  try {
    const member = await ctx.telegram.getChatMember(ctx.chat.id, userId);
    return ["creator", "administrator"].includes(member.status);
  } catch {
    return false;
  }
}

async function requireAdmin(ctx) {
  if (!(await isAdmin(ctx))) {
    await ctx.reply("⛔ এই কমান্ডটি শুধু গ্রুপ অ্যাডমিন ব্যবহার করতে পারবেন।");
    return false;
  }
  return true;
}

function repliedUser(ctx) {
  return ctx.message?.reply_to_message?.from;
}

module.exports = { isGroup, isAdmin, requireAdmin, repliedUser };
