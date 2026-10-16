const mongoose = require("mongoose");

const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"];

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  accountId: String,
  role: { type: String, default: "user" },
  // Per-user currency override. null = inherit the platform default.
  currency: { type: String, enum: CURRENCIES, default: null },
  // Admin-controlled gold storage fields
  totalGold: { type: Number, default: 0 },
  currentValue: { type: Number, default: 0 },
  monthlyFees: { type: Number, default: 0 },
  lastDepositDate: { type: Date, default: null },
  vaultLocation: { type: String, default: "Main Vault" },
  notes: { type: String, default: "" },
  nextOfKin: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
