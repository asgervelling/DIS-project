This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Dashboard for Point-of-Sales Data

- Dataset: [Point-of-sales (POS) data from a café (Kaggle)](https://www.kaggle.com/datasets/ankitverma2010/cafe-data)
  - Dataset used to seed the database, but it will be possible to simulate POS transaction events.
- Task: Create a dashboard that will give the business owner an overview over his sales.

### Transaction Schema

Here are the first two records of the dataset:

| date           | Bill Number | Item Desc                 | Quantity | Rate | Tax   | Discount | Total  | Category |
| -------------- | ----------- | ------------------------- | -------- | ---- | ----- | -------- | ------ | -------- |
| 4/1/2010 13:15 | G0470115    | QUA MINERAL WATER(1000ML) | 1        | 50   | 11.88 | 0        | 61.88  | BEVERAGE |
| 4/1/2010 13:15 | G0470115    | MONSOON MALABAR (AULAIT)  | 1        | 100  | 23.75 | 0        | 123.75 | BEVERAGE |

### E/R Chen Diagram

There are **Transactions**, **Transaction_Items**, **Menu_Items** and **Categories**.

Relations:

- Transactions contain Transaction_Items (1-m)
  - Transaction_Items are weak entities.
- Transaction_Items reference Menu_Items (m-1)
- Menu_Items belong_to Categories (m-1)

Keys:
Don't know the canonical way to express this, but:

- Transactions: `tid` is the primary key
- Transaction_Items is a weak entity set. Composite key: `(tid, line_no (weak))`
- Menu_Items: `iid`
- Categories: `cid`

![er_diagram](readme/dis_project_ER_ver_2.drawio.png)

### Components of the Dashboard

Site will include two pages:

- Dashboard
- New transaction

In 'New transaction', the user can simulate a transaction (a sale). User will choose some items to "buy". The transaction will be reflected in the dashboard.

I have created a wireframe for the dashboard.
It includes a global period picker (24H, 7D, 30D, YTD, 1Y and Max) and

- Four KPIs:
  - Total Revenue
  - Total Cost
  - Total Profit
  - Profit Margin (%)
- Two charts:
  - Sales over time (line chart)
  - Top products by profit (bar chart, top 5)
- Transactions (scrollable list view, by date, descending)

All in rupees, since the dataset is Indian.

Here is the wireframe for the dashboard page:

![dashboard_wireframe](readme/dashboard_wireframe.jpg)
