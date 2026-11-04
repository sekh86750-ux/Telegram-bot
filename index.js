require("dotenv").config();

const { Telegraf } = require("telegraf");
const { BOT_NAME } = require("./config");
const { createChatTracker } = require("./middleware/chat-tracker");
const { linkFilter } = require("./middleware/link-filter");
const { registerGeneral } = require("./commands/general");
const { registerModeration } = require("./commands/moderation");
const { registerOwner } = require("./commands/owner");

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("BOT_TOKEN missing. Add it in Render Environment Variables.");
  process.exit(1);
}

const bot = new Telegraf(token);
const chatTracker = createChatTracker();

bot.use(chatTracker.middleware);
bot.use(linkFilter());

registerGeneral(bot);
registerModeration(bot);
registerOwner(bot, chatTracker);

bot.catch((error, ctx) => {
  console.error(`Update ${ctx.update?.update_id} failed:`, error);
});

bot.launch()
  .then(() => console.log(`${BOT_NAME} is running.`))
  .catch((error) => {
    console.error("Bot failed to start:", error);
    process.exit(1);
  });

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
