function createChatTracker() {
  const chats = new Set();

  return {
    middleware: async (ctx, next) => {
      if (ctx.chat?.id) chats.add(ctx.chat.id);
      return next();
    },
    getChats: () => [...chats]
  };
}

module.exports = { createChatTracker };
