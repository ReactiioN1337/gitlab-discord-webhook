# gitlab-discord-webhook

A webhook to integrate push events from Gitlab into Discord.

> Development of `gitlab-discord-webhook` takes place in branch `develop`. Do **not** push to the `master` branch!

## Requirements

| Dependency | tested with min. version |
| --- | --- |
| node.js | 12.4 LTS |
| yarn | 1.19.1 |
| TypeScript | 3.5.4 |
| GitLab / GitLab CE | latest / 12.5.2 |

## Usage

After deployment or installation, navigate to <http://localhost:8080> (replace localhost with your server ip). You should receive a `Forbidden` message.

> I recommend to use a reverse-proxy like nginx or traefik (for docker) in order to use a domain instead of your ip.

Navigate to Settings -> Integrations inside your GitLab repository and set <https://example.com/gitlab> as URL and a secret token.

Don't forget to (re)start the application whenever you modify the `settings.json` using `pm2 restart gitlab-discord-webhook` or `docker-compose up -d`.

## Installation

- Clone the repository using `git clone https://github.com/ReactiioN1337/gitlab-discord-webhook`
- Navigate into the directory (`cd gitlab-discord-webhook`)
- Install all dependencies using `yarn`
- Compile the code to native JavaScript using `yarn compile`
- Copy the `package.json` into the `dist` folder (`cp package.json dist/package.json`)
- Deploy the dist folder on your server
- Install all dependencies using `yarn install --production`
- Start the application once to generate your configuration file (`node .`)
- Start the application in background using `pm2 start src/bootstrap.js --name "gitlab-discord-webhook"`

> You may need to install `pm2` first, so run `yarn global add pm2` before the step above.

## Installation using Docker

> The images are based on [mhart/alpine-node](https://github.com/mhart/alpine-node) and are as minimal as possible.

You can also deploy that application using `docker-compose`.

```bash
# create a new directory
mkdir gitlab-discord-webhook

# navigate into the created directory
cd gitlab-discord-webhook

# fetch the latest docker-compose.yml file
wget https://raw.githubusercontent.com/ReactiioN1337/gitlab-discord-webhook/master/docker-compose.yml

# create the configuration file and add the following content
touch settings.json && nano settings.json
```

> **Latest configuration**

```JSON
{
  "version": "1",
  "name": "GitLab",
  "avatar": "https://i.imgur.com/aMaUGGN.png",
  "gitlab": [
    {
      "token": "SOME SUPER SECRET TOKEN",
      "url": "https://discordapp.com/api/webhooks/YOURWEBHOOKDATA"
    }
  ],
  "server": {
    "port": 8080,
    "title": "",
    "proxies": [
      "loopback",
      "linklocal",
      "uniquelocal",
      "173.245.48.0/20",
      "103.21.244.0/22",
      "103.22.200.0/22",
      "103.31.4.0/22",
      "141.101.64.0/18",
      "108.162.192.0/18",
      "190.93.240.0/20",
      "188.114.96.0/20",
      "197.234.240.0/22",
      "198.41.128.0/17",
      "162.158.0.0/15",
      "104.16.0.0/12",
      "172.64.0.0/13",
      "131.0.72.0/22"
    ]
  }
}

```

Start the container using `docker-compose up -d`, that's all.
