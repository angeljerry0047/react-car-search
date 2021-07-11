import constants from "../constants";

export function generateUrl(data) {
    const ret = [];
    for (let d in data) {
      if (data[d] === "") continue;
      ret.push(encodeURIComponent(d) + "/" + encodeURIComponent(data[d]));
    }
    return constants.PREFIX + ret.join("/") + constants.SUBFIX;
  }