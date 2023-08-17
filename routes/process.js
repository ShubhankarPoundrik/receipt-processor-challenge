import { v4 as uuidv4 } from "uuid";
import { checkInputs } from "../middleware/checkInputs.js";
import { DateTime } from "luxon";

const data = new Object();

const countAlphanumericCharacters = (inputString) => {
  const alphanumericRegex = /[A-Za-z0-9]/g;
  const matches = inputString.match(alphanumericRegex);

  if (matches) {
    return matches.length;
  } else {
    return 0;
  }
};

const isTimeBetween2And4 = (timeStr) => {
  const currentTime = DateTime.fromFormat(timeStr, "hh:mm").setZone("utc");
  const startTime = DateTime.fromObject({
    hour: 14,
    minute: 0,
    second: 0,
  }).setZone("utc");
  const endTime = DateTime.fromObject({
    hour: 16,
    minute: 0,
    second: 0,
  }).setZone("utc");

  return currentTime >= startTime && currentTime < endTime;
};

const getPoints = (retailer, purchaseDate, purchaseTime, total, items) => {
  let points = countAlphanumericCharacters(retailer);

  points += total % 1 === 0 ? 50 : 0;

  points += (total * 100) % 25 === 0 ? 25 : 0;

  let numItems = items.length;
  points += Math.floor(numItems / 2) * 5;

  for (let j = 0; j < items.length; j++) {
    let i = items[j];

    if (i.shortDescription.trim().length % 3 === 0) {
      points += Math.ceil(i.price * 0.2);
    }
  }

  points += parseInt(purchaseDate.substring(8)) % 2 == 1 ? 6 : 0;

  points += isTimeBetween2And4(purchaseTime) ? 10 : 0;

  return points;
};
const process = async (req, res) => {
  const { retailer, purchaseDate, purchaseTime, total, items } = req.body;
  const err = checkInputs(
    ["retailer", "purchaseDate", "purchaseTime", "total", "items"],
    req
  );
  if ("error" in err) {
    return res.status(400).json();
  }

  const id_ = uuidv4();
  data[id_] = getPoints(retailer, purchaseDate, purchaseTime, total, items);
  return res.json({ id: id_ });
};

export { process, data };
