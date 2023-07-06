const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { TARIFF_SCHEMES, TARIFF_SCHEME_TYPES, DIVISIONS, twoDigitMonths } = require('./objects.js');

const options = new chrome.Options();
options.addArguments('--headless');
options.addArguments('--log-level=3');

let fixed_charge = 0;
let base = 0;
let intermediate = 0;
let peak = 0;
let distribution = 0;
let capacity = 0;
let tariff = 0;

const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

const actualYear = new Date().getFullYear();
const actualMonth = new Date().getMonth() + 1;
const period = `${actualYear}-${twoDigitMonths(actualMonth)}-01`;

const getDACnt = async (_url, _tariff_scheme, _month) => {
    const dataArray = [];
    for (let i = 0; i < DIVISIONS.length; i++) {
        const region_id = DIVISIONS[i].region_id;
        await driver.get(_url)
            .then(() => driver.sleep(5000))
            .then(() => driver.findElement(By.id("ContentPlaceHolder1_Fecha2_ddMes")))
            .then((selectElement) => selectElement.findElements(By.css('option')))
            .then((optionElements) => optionElements[_month].click())
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.id('ContentPlaceHolder1_EdoMpoDiv_ddEstado')))
            .then((selectElement) => selectElement.findElements(By.css('option')))
            .then((optionElements) => optionElements[DIVISIONS[i].estado].click())
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.id('ContentPlaceHolder1_EdoMpoDiv_ddMunicipio')))
            .then((selectElement) => selectElement.findElements(By.css('option')))
            .then((optionElements) => optionElements[DIVISIONS[i].municipio].click())
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.id('ContentPlaceHolder1_EdoMpoDiv_ddDivision')))
            .then((selectElement) => selectElement.findElements(By.css('option')))
            .then((optionElements) => optionElements[1].click())
            .then(() => driver.sleep(2000))
            .then(() => driver.findElements(By.css('table')))
            .then((selectElement) => selectElement[0].findElements(By.css('tbody')))
            .then((selectElement) => selectElement[0].findElements(By.css('tr')))
            .then((selectElement) => selectElement[9].findElements(By.css('td')))
            .then((optionElements) => optionElements[2].findElements(By.css('tr')))
            .then((rows) => {
                return Promise.all(rows.map((row) => {
                    return row.findElements(By.css('td, th'))
                        .then((cells) => Promise.all(cells.map((cell) => cell.getText())));
                }));
            })
            .then((rowsData) => {
                if (_tariff_scheme === TARIFF_SCHEME_TYPES.GDMTH) {
                    rowsData.forEach((rowData, rowIndex) => {
                        if (rowIndex === 1) fixed_charge = Number(rowData.at(-1).replace(/,/g, ''));
                        if (rowIndex === 2) base = Number(rowData.at(-1));
                        if (rowIndex === 3) intermediate = Number(rowData.at(-1));
                        if (rowIndex === 4) peak = Number(rowData.at(-1));
                        if (rowIndex === 5) distribution = Number(rowData.at(-1).replace(/,/g, ''));
                        if (rowIndex === 6) capacity = Number(rowData.at(-1).replace(/,/g, ''));
                    });

                    return { fixed_charge, base, intermediate, peak, distribution, capacity, region_id, period };
                } else if (_tariff_scheme === TARIFF_SCHEME_TYPES.PDBT) {
                    rowsData.forEach((rowData, rowIndex) => {
                        if (rowIndex === 1) fixed_charge = Number(rowData.at(-1).replace(/,/g, ''));
                        if (rowIndex === 2) tariff = Number(rowData.at(-1));
                    });

                    return { fixed_charge, tariff, region_id, period };
                } else {
                    rowsData.forEach((rowData, rowIndex) => {
                        if (rowIndex === 1) fixed_charge = Number(rowData.at(-1).replace(/,/g, ''));
                        if (rowIndex === 2) tariff = Number(rowData.at(-1));
                        if (rowIndex === 3) distribution = Number(rowData.at(-1).replace(/,/g, ''));
                        if (rowIndex === 4) capacity = Number(rowData.at(-1).replace(/,/g, ''));
                    });

                    return { fixed_charge, tariff, distribution, capacity, region_id, period };
                }
            })
            .then((data) => {
                console.log(data);
                dataArray.push(data)
            })
    }

    return dataArray;
}

const getDAC = async (_url, _tariff_scheme, _month) => {
    const dataArray = [];
    await driver.get(_url)
        .then(() => driver.sleep(5000))
        .then(() => driver.findElement(By.id("ContentPlaceHolder1_Fecha1_ddMes")))
        .then((selectElement) => selectElement.findElements(By.css('option')))
        .then((optionElements) => optionElements[_month].click())
        .then(() => driver.sleep(2000))
        .then(() => driver.findElement(By.id('TarifaDacV')))
        .then((selectElement) => selectElement.findElements(By.css('tr')))
        .then((optionElements) => optionElements[4].findElements(By.css('td')))
        .then((rows) => {
            return Promise.all(rows.map((row) => {
                return row.getText();
            }));
        })
        .then((data) => {
            fixed_charge = Number(data[1].replace(/,/g, ''));
            tariff = Number(data[2].replace(/\$/g, ''));
            return { fixed_charge, tariff, period };
        })
        .then((data) => {
            console.log(data);
            dataArray.push(data)
        })

    return dataArray;
}

const getTariffsAndChargesPerTariffScheme = async (_url, _tariff_scheme, _month) => {
    try {
        let data;
        if (_tariff_scheme === TARIFF_SCHEME_TYPES.DAC) {
            data = await getDAC(_url, _tariff_scheme, _month);
        } else {
            data = await getDACnt(_url, _tariff_scheme, _month);
        }

        return data;
    } catch (error) {
        console.error('Error:', error);
        await driver.quit();
    }
};

const processTariffScheme = async (tariffScheme) => {
    const { url, name } = tariffScheme;
    const data = await getTariffsAndChargesPerTariffScheme(url, name, actualMonth);

    return data;
};

const processAllTariffSchemes = async () => {
    try {
        const dataObject = {
            PDBT: [],
            GDBT: [],
            GDMTO: [],
            GDMTH: [],
            DAC: [],
        }

        for (const tariffScheme of TARIFF_SCHEMES) {
            const data = await processTariffScheme(tariffScheme);

            switch (tariffScheme.name) {
                case TARIFF_SCHEME_TYPES.PDBT:
                    dataObject.PDBT = data;
                    break;
                case TARIFF_SCHEME_TYPES.GDBT:
                    dataObject.GDBT = data;
                    break;
                case TARIFF_SCHEME_TYPES.GDMTO:
                    dataObject.GDMTO = data;
                    break;
                case TARIFF_SCHEME_TYPES.GDMTH:
                    dataObject.GDMTH = data;
                    break;
                case TARIFF_SCHEME_TYPES.DAC:
                    dataObject.DAC = data;
                    break;
            }
        }

        return dataObject;
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = { processAllTariffSchemes };

