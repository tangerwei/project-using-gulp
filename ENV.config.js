const inputPath = './demo/sass/*.scss';
const outPath = './build/sass';
const outputSet = {
    outputStyle:'expanded'
}
//outputStyle:'nested'
//outputStyle:'compact'
//outputStyle:'expanded'
//outputStyle:'compressed'
module.exports = {
    src:inputPath,
    output:outPath,
    setting:outputSet
}