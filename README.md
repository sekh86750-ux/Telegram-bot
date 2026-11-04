# AriYan-Bot

A starter all-in-one Telegram group bot using JavaScript, Node.js and Telegraf.

## Included commands
- `/start`, `/help`, `/ping`, `/id`, `/rules`
- Welcome and goodbye messages
- Reply to a user's message with `/ban`, `/kick`, `/mute`, `/unmute`
- Reply with `/warn`, `/warnings`, `/resetwarn`
- Owner-only `/broadcast` (temporary in-memory chat list)

## A. Create the bot with BotFather
1. Open Telegram and search for `@BotFather`.
2. Send `/mybots`, choose `AriYan-Bot`, or use `/newbot` if it has not been created yet.
3. Copy the API token privately. Never publish it in GitHub, screenshots, or chats.

## B. Upload this project to GitHub
1. Download and extract the ZIP.
2. Create a new repository named `AriYan-Bot`.
3. Upload the CONTENTS of the extracted `AriYan-Bot` folder (not the ZIP itself).
4. Confirm that `package.json`, `render.yaml`, and `src/` appear at the repository's top level.
5. Do not upload `.env`; `.gitignore` excludes it.

## C. Deploy on Render
1. Sign in to https://render.com/ using GitHub.
2. Select New + -> Blueprint.
3. Select your `AriYan-Bot` repository.
4. Render reads `render.yaml` and creates a Background Worker.
5. In the service's Environment section, set:
   - `BOT_TOKEN`: token from BotFather
   - `OWNER_ID`: your numeric Telegram user ID
6. Deploy and inspect Logs. You should see `AriYan-Bot is running`.

If Blueprint is unavailable, create a Background Worker manually:
- Runtime: Node
- Build command: `npm install`
- Start command: `npm start`
- Add the same two environment variables.

## D. Configure Telegram group permissions
1. Add the bot to your test group.
2. Promote it to admin with only the permissions it needs: delete messages, ban users, restrict members.
3. To let it inspect ordinary group messages, open @BotFather -> `/mybots` -> your bot -> Bot Settings -> Group Privacy -> Turn off. Telegram may require removing and re-adding the bot.
4. Test in a private test group first.

## Notes
- This is a safe starter foundation, not a complete commercial bot.
- Music playback and AI chat need separate APIs/services and are not included yet.
- Warning counts and broadcast chat IDs are held in memory and reset after a restart. Add a database before relying on persistent records.
- Broadcast only sends to chats where the bot has received an update since its latest start.
- Use moderation tools responsibly and follow Telegram rules.
