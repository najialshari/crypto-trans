# crypto-trans CLI Naji

Crypto-trans is an open source CLI program to help crypto investors query their portfolio data from large csv file.

[Try the npm package out in your terminal](https://www.npmjs.com/package/crypto-trans) `npm i crypto-trans -g`

## crypto-trans CLI Video Demo

https://user-images.githubusercontent.com/48621790/182963152-168ea935-7366-4b98-93b1-fcbed3028fef.mov

## Table of Contents

1. [CLI Usage](#CLI-Usage)
2. [CLI Help Info](#CLI-Help-Info)
3. [Usage](#Repo-Usage)
4. [Design](#Design)
    1. [/index.js](/index.js)
    2. [/utils](/utils)
    3. [/lib](/lib)
    4. [/lib/index.js](/lib/index.js)
    5. [/lib/portfolio](/lib/portfolio)
    6. [/lib/portfolio/csv](/lib/portfolio/csv)
    7. [/lib/portfolio/index.js](/lib/portfolio/index.js)
    8. [/lib/portfolio/portfolioBalance.js](/lib/portfolio/portfolioBalance.js)
    9. [/lib/service](/lib/service)
    10. [/lib/api](/lib/api)
    11. [/lib/validation](/lib/validation)
5. [Cache key standard](#Cache-Key-Naming-Conventions)
6. [More Details about crypto-trans](#More-Details-about-crypto-trans)
7. [Upcoming features](#Upcoming-features)

## CLI Usage

```c
  crypto-trans help                      Print help
  crypto-trans                           get all portfolio balances for each token
  crypto-trans -d 2019-10-25 -t ETH      query portfolio by date and token
  crypto-trans -d 2019-10-25             query portfolio by date
  crypto-trans -t BTC                    query portfolio by token
```

## CLI Help Info

<span style="color:green">
USAGE
</span>

```c
crypto-trans <command> [option]
```

<span style="color:blue">
COMMANDS
</span>

```c
  help                                       Print help info
  --token, -t                                query portfolio by token
  --date, -d                                 query portfolio by date
  -----------------------------------------  ---------------------------------------
  EX: crypto-trans                           get all portfolio balances for each token
  EX: crypto-trans -d 2019-10-25 -t ETH      query portfolio by date and token
  EX: crypto-trans -d 2019-10-25             query portfolio by date
  EX: crypto-trans -t BTC                    query portfolio by token
```

<span style="color:orange">
OPTIONS
</span>

```c
  -d, --date       Transaction date value, format: YYYY-MM-DD
  -t, --token      Token symbol value, Ex: BTC
  -c, --clear      Clear the console Default: true
  --noClear        Don't clear the console Default: false
  -debug, --debug  Print debug info Default: false
  -v, --version    Print CLI version Default: false
```

## Repo Usage

-   Clone/download the [repo](https://github.com/AmmarAlkhooly98/crypto-trans).
-   `npm i`
-   `npm link` (this will allow you to use the `crypto-trans` command to run any cli commands in the repo from your terminal). Or, run the CLI using node with project open on the same DIR as the root file [/index.js](/index.js) `node index.js <command> [option]`

*   ## Design
    Architectural and Design patterns.
    -   ### [/index.js](/index.js)
        this is the main CLI root file.
    -   ### [/utils](/utils)
        here we have all the helpers stored in seperate files to be used in anywhere in the [lib](/lib/) DIR.
    -   ### [/lib](/lib)
        here we store all the main logic for the cli program seperated in folders for scalability and maintainability.
    -   ### [/lib/index.js](/lib/index.js)
        here we have the main logic and starting point, as the user writes a command, the `checkCmnd` function will be called by the root [/index.js](/index.js) file that sends along the flag args. And from here, we make the appropriate actions based on the user query input. First thing, we check the user query types along with query data validations. Second, we then check if the query data is already available in cache with the unique cached key to send it right away, otherwise we send the query data to the `readCsvTransStream` function in the [/lib/portfolio/index.js](/lib/portfolio/index.js) file to read the csv file in chunks, and from here we send back the returned data to this file in the `checkCmnd` function that will then send it to the `portfolioBalanceSummary` function in the [/lib/portfolio/portfolioBalance.js](/lib/portfolio/portfolioBalance.js) file that will then show the user portfolio summary in the terminal.
    -   ### [/lib/portfolio](/lib/portfolio)
        here we store the main logic for portfolio related actions and csv file data.
    -   ### [/lib/portfolio/csv](lib/portfolio/csv/)
        here we store all the user csv transaction files to read from it later on in [/lib/portfolio/index.js](/lib/portfolio/index.js).
    -   ### [/lib/portfolio/index.js](/lib/portfolio/index.js)
        here we have we receive the potential query data, and read the large csv file using readStreams in chunks along with the calculations based on many factors like _Deposit_ or _Withdraw_ and then we also use this file to save the query data to the cache using node-cache.
    -   ### [/lib/portfolio/portfolioBalance.js](/lib/portfolio/portfolioBalance.js)
        here we reach the final step in the process where the data is read and passed to this file to display the profile summary data in a table format. Also, we use the cryptocompare API from here [/lib/api](/lib/api) to get the token price for the portfolio calculations.
    -   ### [/lib/service](/lib/service)
        here we have the initial node-cache setup and we can include any business logic here later on.
    -   ### [/lib/api](/lib/api)
        here we use the [_cryptocompare_ ](https://min-api.cryptocompare.com/documentation) API to get info about any cryptocurrency. For example, we used the API here to get the current USD price for the given token dynamically.
    -   ### [/lib/validation](/lib/validation)
        here we have all the user input validations, like checking whether or not the user typed in a valid date or token before reading the csv file. incase of invalid input or missing query data, the CLI willl send feedback to the user.

## Cache Key Naming Conventions

###### As the CSV file can be quite large in size, the best way to store the data after readstream would be to save it in memory cache for easy access for later on when the user uses the same query command again to be retrieved from the cache instead of reading the large file. Please follow the cache key naming conventions below:

-   For **no** query input, the cached key should be `tokens`.
-   For only **token** query input, the cached key should be dynamic. For example, if the user added _BTC_ as the token query, then the cached key should be `token_BTC`. Where as, if the user query was _ETH_, then the cached key should be `token_ETH`.
-   For only **date** query input, the cached key should be dynamic. For example, if the user added _24-10-2019_ as the date query, then the cached key should be `date_24-10-2019`. Where as, if the user query was _10-11-2018_, then the cached key should be `date_10-11-2018`.
-   For **date and token** query input, the cached key should be dynamic. For example, if the user added _24-10-2019_ as the date query and _BTC_ for the token query, then the cached key should be `token_BTC_date_24-10-2019`.

## More Details about crypto-trans

-   Checkout [crypto-trans](https://www.npmjs.com/package/crypto-trans) for further more details about crypto-trans CLI and upcoming releases.

## Upcoming features

-   Allowing the user to type a path to a csv from the terminal (new flag `-csv [csv file path]`) hence, the code can read and query from any file the user wants.
