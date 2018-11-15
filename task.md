Your tasks:
1. Adding *Line chart*
    1. Study files index.js and App.js
    2. Add CSF Widgets to App.js (from @nokia-csf-uxr/csfWidgets)
    3. Import csfWidgets.css.
    3. Instead of *Hello World* render *Line Chart* from CSF.
    4. Feed chart with some mock data.
2. Fetching data from REST API
    1. Create new file with *DataFetcher* class
    2. *DataFetcher* class should expose method *fetchUSD*, which uses
        library *fetch* to make request to *http://api.nbp.pl/api/exchangerates/rates/a/usd/last/7/?format=json*
        and returns body of response.
    3. Log response of *fetchUSD* in *componentDidMount* of App.js
3. Rendering real data in chart
    1. Add state to App.js with *data* property.
    2. Move request from *componentDidMount* to *componentWillMount*.
    3. Instead of logging the response, map the rates to object of shape:
        {date, value} and feed that table to state.
    4. Set *data, xDataKey, yDataKey, yLabel, xLabel* props of *LineChart*
        to proper values.
    5. We have few problems now, let's fix them:
        1. Use *yTickFormatter* to change how values are labeled. We need to
            manually parse value to Float.
        2. We should have proper scale on y axis. To do that, use *yDataMin* and *yDataMax*.
4. Adding configuration in form of checkboxes for currencies.
    1. Move code from App.js to class in new file - CurrencyChart.js and make App.js render it.
    2. Create new class - *ChartConfig* which will render two checkboxes - for USD and EUR.
        1. Feed props *label, onChange, value* of checkboxes.
        2. Make checkboxes selectable by introducing state that holds (in some way) which checkboxes are selected.
        3. After every click, component should call one of it's props - *currencyUpdate* with array consisting of strings representing codes of currencies.
        4. Make App.js render *ChartConfig* with logging function as *currencyUpdate*
    3. Make *CurrencyChart* render multiple currencies.
        1. Write function that from prop *currencies* creates data for chart - this data has to have form of array with objects
        {data, currency1, currency2, ...} and feeds it to state.
        2. Use this function in two hooks: *componentDidMount, componentDidUpdate (only if props changed)*
        3. Make property *yDataKey* ready from *currencies* prop.
        4. Write new function for calculating min value.

