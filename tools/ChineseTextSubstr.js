function textSubstring(str, n) {
  const r = /[^\x00-\xff]/g;
  if (str.replace(r, '**').length <= n) {
    return str;
  }
  const m = Math.floor(n / 2);
  for (let i = m; i < str.length; i++) {
    if (str.substr(0, i).replace(r, '**').length >= n) {
      return str.substr(0, i) + '...';
    }
  }
  return str;
}
