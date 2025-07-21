export function getCardSystem(number) {
  if (/^2\d{0,}$/.test(number)) {
    return "mir";
  }
  if (/^4\d{0,}$/.test(number)) {
    return "visa";
  }
  if (/^5\d{0,}$/.test(number)) {
    return "mastercard";
  }
  if (/^3[47]\d{0,}$/.test(number)) {
    return "amex";
  }
  if (
    /^6011\d{0,}$/.test(number) ||
    /^64[4-9]\d{0,}$/.test(number) ||
    /^65\d{0,}$/.test(number)
  ) {
    return "discover";
  }
  if (/^35\d{0,}$/.test(number)) {
    return "jcb";
  }
  if (
    /^30\d{0,}$/.test(number) ||
    /^36\d{0,}$/.test(number) ||
    /^38\d{0,}$/.test(number)
  ) {
    return "diners";
  }

  return "unknown";
}

export function isValidLuhn(number) {
  const digits = number.replace(/\D/g, "").split("").reverse().map(Number);
  const sum = digits.reduce((acc, d, i) => {
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    return acc + d;
  }, 0);
  return sum % 10 === 0;
}
