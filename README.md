# chatrec
ChatRec logs all discord messages(even DM's)
The main point of this app is that I received some messages on Discord, that got deleted instantly, and I didn't have proof to show the messages.

Programming language is Node.JS, and I coded this in 2 hours.

# How to install?

To install it, clone this repository, then run `npm install`.
This command should install the dependencies.

Then, edit index.js

At the end, you should find client.login("<token>");
  
Delete "<token>" from the function call, go to your Discord Client, press CTRL-SHIFT-I toghether, select the Application tab, proceed to Local Storage, https://discordapp.com, and select the token from the box. It should start like this: `"MzMw.................."`.

Copy it entirely(including these ") in the place of "<token>", then save it. And you are ready to run it!

# How to run it?

To run it, you just need to type `node index.js`

# Where are the logs?

The logs are in the logs/ directory. Will be created on first run.

# Want to support this project?

If you want to support this project, then you can add new functions to it by submitting a pull request. I would be happy to aprove it.

Hope you will like this project!

Author: Talnaci Alexandru
