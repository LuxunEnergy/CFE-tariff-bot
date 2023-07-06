const TARIFF_SCHEME_TYPES = Object.freeze({
    PDBT: "PDBT",
    GDBT: "GDBT",
    GDMTO: "GDMTO",
    GDMTH: "GDMTH",
    DAC: "DAC",
});

const TARIFF_SCHEME_URL = Object.freeze({
    PDBT: "https://app.cfe.mx/Aplicaciones/CCFE/Tarifas/TarifasCRENegocio/Tarifas/PequenaDemandaBT.aspx",
    GDBT: "https://app.cfe.mx/Aplicaciones/CCFE/Tarifas/TarifasCRENegocio/Tarifas/GranDemandaBT.aspx",
    GDMTO: "https://app.cfe.mx/Aplicaciones/CCFE/Tarifas/TarifasCRENegocio/Tarifas/GranDemandaMTO.aspx",
    GDMTH: "https://app.cfe.mx/Aplicaciones/CCFE/Tarifas/TarifasCRENegocio/Tarifas/GranDemandaMTH.aspx",
    DAC: "https://app.cfe.mx/Aplicaciones/CCFE/Tarifas/TarifasCRECasa/Tarifas/TarifaDAC.aspx",
});

const TARIFF_SCHEMES = [
    {
        name: TARIFF_SCHEME_TYPES.GDMTH,
        url: TARIFF_SCHEME_URL.GDMTH,
    },
    {
        name: TARIFF_SCHEME_TYPES.DAC,
        url: TARIFF_SCHEME_URL.DAC,
    },
    {
        name: TARIFF_SCHEME_TYPES.PDBT,
        url: TARIFF_SCHEME_URL.PDBT,
    },
    {
        name: TARIFF_SCHEME_TYPES.GDBT,
        url: TARIFF_SCHEME_URL.GDBT,
    },
    {
        name: TARIFF_SCHEME_TYPES.GDMTO,
        url: TARIFF_SCHEME_URL.GDMTO,
    },
]

//Estan en el orden de la DB para evitar confusiones
const DIVISIONS = [
    { estado: 2, municipio: 1, region_id: 1 },
    { estado: 3, municipio: 1, region_id: 2 },
    { estado: 1, municipio: 1, region_id: 3 },
    { estado: 9, municipio: 1, region_id: 4 },
    { estado: 14, municipio: 1, region_id: 5 },
    { estado: 11, municipio: 1, region_id: 6 },
    { estado: 28, municipio: 1, region_id: 7 },
    { estado: 8, municipio: 1, region_id: 8 },
    { estado: 15, municipio: 1, region_id: 9 },
    { estado: 25, municipio: 12, region_id: 11 },
    { estado: 6, municipio: 1, region_id: 12 },
    { estado: 30, municipio: 1, region_id: 13 },
    { estado: 4, municipio: 1, region_id: 14 },
    { estado: 5, municipio: 1, region_id: 15 },
    { estado: 7, municipio: 3, region_id: 16 },
    { estado: 7, municipio: 1, region_id: 17 },
    { estado: 7, municipio: 4, region_id: 18 },
]

const twoDigitMonths = (month) => month.toString().padStart(2, "0");

module.exports = { TARIFF_SCHEMES, TARIFF_SCHEME_TYPES, DIVISIONS, twoDigitMonths };

