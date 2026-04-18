import Crypto from "../models/Crypto.js";

const normalizeCryptoPayload = (payload) => {
  const parsedChange =
    typeof payload.change24h === "string"
      ? Number.parseFloat(payload.change24h.replace("%", ""))
      : payload.change24h;

  return {
    name: payload.name,
    symbol: payload.symbol,
    price: Number(payload.price),
    image: payload.image,
    change24h: parsedChange,
  };
};

const getAllCryptos = async (_req, res, next) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cryptos.length,
      data: cryptos,
    });
  } catch (error) {
    next(error);
  }
};

const getTopGainers = async (_req, res, next) => {
  try {
    const cryptos = await Crypto.find().sort({ change24h: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cryptos.length,
      data: cryptos,
    });
  } catch (error) {
    next(error);
  }
};

const getNewListings = async (_req, res, next) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      success: true,
      count: cryptos.length,
      data: cryptos,
    });
  } catch (error) {
    next(error);
  }
};

const createCrypto = async (req, res, next) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    if (
      !name ||
      !symbol ||
      price === undefined ||
      !image ||
      change24h === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, symbol, price, image, and 24h change are required",
      });
    }

    const crypto = await Crypto.create(
      normalizeCryptoPayload({ name, symbol, price, image, change24h })
    );

    res.status(201).json({
      success: true,
      message: "Cryptocurrency created successfully",
      data: crypto,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllCryptos, getTopGainers, getNewListings, createCrypto };
