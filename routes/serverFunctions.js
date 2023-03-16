function map2num(str) {
    
        arr = str.split(",").map(Number);
        arr = arr.filter((val) => !isNaN(val) && val !== undefined)
        return arr;
}

module.exports = map2num;