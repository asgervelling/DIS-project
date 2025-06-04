"use strict";
/*
This script should be run prior to seeding the database.

Our dataset is from around 2010. In order to make it a little
easier to work with, we have this script, which will take
as input a CSV file used to seed the database, and output another
CSV file where the dates are more current.
It works like this:

- tc: Current date.
- td_i: i'th date in the dataset
- td_latest: Latest date in the dataset
- Transform every td_i to td_i + (tc - td_latest), so the dates are current.

This will be beneficial for seeing INSERT statements reflected in the dashboard.
*/
function timeOffset(td_latest, tc) {
    return tc.getTime() - td_latest.getTime();
}
