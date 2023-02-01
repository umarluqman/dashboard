# Anti-Sybil Dashboard for OpenDataHackathon
The visualization of the data in the dashboard are based on two Legos:
- Slaysybil from [0x9simon/slaysybil](https://github.com/0x9simon/slaysybil)
- [Gitcoin Passport](https://github.com/gitcoinco/passport)

There are two pages in this dashboard application:
- Home page
  - The round operator can see the high level view of the all the round or can filter by specific round
- Address page
  - Metrics, Sybil risk, Passport score and grant associated with the address can be view from here.
  
The most data for the dashboard is currenly mocked to show the full presentation on how anti-Sybil dashboard looks like. Some data are directly coming from the Ocean Protocol marketplace like the Fantom grants application, Fantom grants votes and GR15 contributions.

In the future, the mocked data and the missing data will be replace with the on-chain data provided by Pocket Network. 

## Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

