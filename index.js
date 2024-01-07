const cron = require("node-cron");
const Tariff = require("./tariffModel");
const { processAllTariffSchemes } = require("./function");

console.log("CRON Jobs Started");

cron.schedule("0 12 1 * *", async () => {
  console.log("Empieza el bot recoge tarifas")
  const data = await processAllTariffSchemes();
  const { PDBT, GDBT, GDMTO, GDMTH, DAC } = data;

  console.log("PDBT")
  for await (const pdbt of PDBT) {
    const { fixed_charge, tariff, region_id, period } = pdbt;
    console.log({ fixed_charge, tariff, region_id, period });

    await Tariff.create({
      region_id,
      fixed_charge,
      tariff,
      period,
      tariff_scheme_id: 1,
    });
  }

  console.log("GDBT");
  for await (const gdbt of GDBT) {
    const { fixed_charge, tariff, distribution, capacity, region_id, period } = gdbt;
    console.log({ fixed_charge, tariff, distribution, capacity, region_id, period });
    
    await Tariff.create({
      region_id,
      fixed_charge,
      tariff,
      distribution,
      capacity,
      period,
      tariff_scheme_id: 5,
    });
  }

  console.log("GMDTO");
  for await (const gdmto of GDMTO) {
    const { fixed_charge, tariff, distribution, capacity, region_id, period } = gdmto;
    console.log({ fixed_charge, tariff, distribution, capacity, region_id, period });

    await Tariff.create({
      region_id,
      fixed_charge,
      distribution,
      capacity,
      tariff,
      period,
      tariff_scheme_id: 4,
    });
  }

  console.log("GDMTH");
  for await (const gdmth of GDMTH) {
    let { base, intermediate, peak } = gdmth;
    const { fixed_charge, distribution, capacity, region_id, period } = gdmth;
    if (!base || isNaN(base)) base = 0;
    if (!intermediate || isNaN(intermediate)) intermediate = 0;
    if (!peak || isNaN(peak)) peak = 0;

    console.log({ fixed_charge, distribution, capacity, region_id, period, base, intermediate, peak });
    await Tariff.create({
      region_id,
      fixed_charge,
      base,
      intermediate,
      peak,
      distribution,
      capacity,
      period,
      tariff_scheme_id: 3,
    });
  }

  console.log("DAC");
  const { fixed_charge, tariff, period } = DAC[0];
  console.log({ fixed_charge, tariff, period });

  await Tariff.create({
    region_id: 10,
    fixed_charge,
    tariff,
    period,
    tariff_scheme_id: 2,
  });

  await Tariff.create({
    region_id: 12,
    fixed_charge,
    tariff,
    period,
    tariff_scheme_id: 2,
  });

  console.log("Tarifas agregadas exitosamente");
});