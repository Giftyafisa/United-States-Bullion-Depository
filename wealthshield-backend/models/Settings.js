const mongoose = require("mongoose");

const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"];

const SettingsSchema = new mongoose.Schema(
  {
    defaultCurrency: {
      type: String,
      enum: CURRENCIES,
      default: "USD"
    }
  },
  { timestamps: true }
);

SettingsSchema.statics.CURRENCIES = CURRENCIES;

SettingsSchema.statics.getSingleton = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create({ defaultCurrency: "USD" });
  }
  return doc;
};

module.exports = mongoose.model("Settings", SettingsSchema);
