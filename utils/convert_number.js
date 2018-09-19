function number2IntBinary (a) {
  const bin = a.toString(16).padStart(8, '0');
  const result = [];
  for (let i = 0; i < Math.ceil(bin.length / 2); i++) {
    result.unshift(parseInt(bin.substr(i * 2, 2), 16))
  }
  return result
}

function number2Int64Binary (a) {
  const bin = a.toString(16).padStart(16, '0');
  const result = [];
  for (let i = 0; i < Math.ceil(bin.length / 2); i++) {
    result.unshift(parseInt(bin.substr(i * 2, 2), 16))
  }
  return result
}


function intBinary2Number (a) {
  return a[0] + (a[1] << 8) + (a[2] << 16) + (a[3] << 24);
}

function int64Binary2Number (a) {
  if (a[7] || a[6] > 0x1F) return Number.MAX_SAFE_INTEGER;
  return a[0] + (a[1] << 8) + (a[2] << 16) + (a[3] << 24) + (a[4] << 32) + (a[5] << 40) + (a[6] << 48) + (a[7] << 56);
}