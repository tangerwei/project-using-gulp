const a = [134, 193, 142, 191, 190, 109, 124, 129];
let b = 0;
for (var i = 0; i < a.length; i++) {
    b = b + a[i];
}
let c = [];
for (var k = 0; k < a.length; k++) {
    c.push((a[k] / b).toFixed(2));
}
console.log(c);