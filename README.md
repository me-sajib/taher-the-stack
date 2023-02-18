<h1 align="center">SoftwareSheba Stack</h1>
<p align="center">The Ultimate Proxy Management & Scraping Stack</p>

**SoftwareSheba Stack** With a user-friendly **GUI** interface inside your browser, you can easily manage all of your proxy servers in one place. Need to rotate your proxies? No problem! This app allows you to get fresh proxies from the **proxy-rotator** dedicated server via URL. Plus, it offers a convenient **Chrome extension** that makes it easy to connect your proxies to your browser. Also it provides the **Scraper API** & **Scraping extension** from chrome browser. Try it out today and enjoy web scraping and anonymous access to the web, regardless of your location.

## Packages

1. [proxy-api](/packages/proxy-api/) - API for proxy management
2. [proxy-dashboard](/packages/proxy-dashboard/) - A client app for managing proxies with GUI
3. [proxy-extension](/packages/proxy-extension/) - Proxy extension to manage proxies
4. [proxy-rotator](/packages/proxy-rotator/) - A proxy rotator server to rotate proxy
5. [scraper-api](/packages/scraper-api/) - API to scrape website with ease
6. [scraper-extension](/packages/scraper-extension/) - A visual web scraper extension
7. [website](/packages/website/) - SoftwareSheba stack official site

## Key features

### User Account Management

- Creating and logging into a personal account
- Editing and updating personal information

### Proxy & Proxy List Management

- Creating multiple lists of proxies with different login credentials through a unique username or Email
- Adding individual proxies to specific lists
- Editing and deleting proxies & proxy lists
- Making bulk changes like edit, delete & recheck proxies and proxy lists
- Searching and filtering proxies and proxy lists by heading
- Checking the status of individual and multiple proxies and proxy lists
- Monitoring the time of the proxy check
- Browsing the internet with rotating proxy of proxy list through the extension
- Browsing the internet through local proxies from any provider users want.

### Web Scraping

- Providing a dedicated API for web web scraping
- Blocking any kind of resource like `jpg, png, gif, mp4` e.t.c. to scrape data blazingly fast.
- Solving captcha through the passed id
- Controlling browser interactions
- Extracting data deeper and deeper through nested scrapping
- Providing a browser configuration feature
- Offering a **Chrome Extension** to scrape websites visually
- Storing all data locally through recipe feature

## Usage

Setup the postgres DB by docker compose

```bash
docker-compose up --build
```

By this command, the PostgreSQL Db will listen on `postgres:1234@localhost:5432/postgresDB`. Now setup all required `env` variables.

Then to install all dependencies just run

```bash
yarn install
```

After installation run the prisma migration

```bash
yarn prisma migrate dev
```

The database will seed once you Include `seed` env variables inside `env` file.

> NOTE: Every seed users hold the same password `Hello12345`

Run & build all apps concurrently through single commands

```bash
yarn dev # run all apps
yarn build # build all apps
```

Visit [package.json](./package.json) `scripts` to see more commands

## Support

If you find any bug or issue with Easy proxy manger, please [submit an issue on GitHub](https://github.com/SoftwareSheba/easy-proxy-manager/issues).
