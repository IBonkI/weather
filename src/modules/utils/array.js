export const mostFrequentString = (arr) => {
  const freq = {};
  let maxCount = 0;
  let mostFrequentStr;

  for (const str of arr) {
    freq[str] = (freq[str] || 0) + 1;
    if (freq[str] > maxCount) {
      maxCount = freq[str];
      mostFrequentStr = str;
    }
  }

  return mostFrequentStr;
};
