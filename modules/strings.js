exports = module.exports = {};

let lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 Vestibulum eleifend augue vitae lorem iaculis lacinia. Praesent sodales,
 dui eu suscipit tincidunt, ligula turpis posuere nibh, et gravida dui velit non mauris.
 In ipsum diam, sollicitudin eget sem vel, luctus euismod augue. Sed felis enim, egestas
 at eros a, varius dignissim quam. Aliquam lobortis vehicula magna in porta.
 Pellentesque eu sagittis ex, a mollis libero. Nulla facilisi. Etiam feugiat,
 arcu a aliquet volutpat, tellus neque dignissim magna, vel condimentum ipsum massa mattis diam.
 Maecenas viverra blandit dictum. Vestibulum et efficitur dui. Mauris sit amet arcu neque. `;

exports.bothEnds = (string, value) => string.startsWith(value) || string.endsWith(value);

exports.lorem = (count) => count > 0 ? lorem.repeat(count) : '';
