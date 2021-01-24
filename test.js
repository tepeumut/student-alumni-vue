function calcS2(n, m, n1, n2, meanX1, meanX2) {
  return (
    (
      n.reduce((b, a) => b + Math.pow(a-meanX1, 2)) + m.reduce((c, a) => c + Math.pow(a-meanX2, 2))
    ) / (n1 + n2 - 2)
  ).toFixed(4);
}
function t_Test(n, m) {
  let sumx1 = n.reduce((a, b) => a+b);
  let n1 = n.length;
  let sumx2 = m.reduce((a, b) => a+b);
  let n2 = m.length;
  let meanX1 = sumx1/n1;
  let meanX2 = sumx2/n2;
  console.log(meanX2);
  return (
    (meanX1 - meanX2) / (Math.sqrt(Math.pow(calcS2(n,m, n1, n2, meanX1, meanX2), 2)*(1/n1 + 1/n2)))
  )
}
let n = [3,6,9];
let m = [2,4,6,8];
console.log(t_Test(n, m));
