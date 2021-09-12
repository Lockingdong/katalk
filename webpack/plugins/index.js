const plugins = [];

plugins.push(
    require('./extractPlugin'),
    require('./copyPlugin'),
    ...(require('./htmlPlugin'))
);

module.exports = plugins;