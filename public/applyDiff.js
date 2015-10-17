window.applyDiff = function(data, diff) {
  data = _.clone(data, true).map(function(row, index) {
    row._index = index + 1;
    return row;
  });

  var newResults = data.slice();

  diff.removed !== null && diff.removed.forEach(
    function(removed) { newResults[removed._index - 1] = undefined; });

  // Deallocate first to ensure no overwrites
  diff.moved !== null && diff.moved.forEach(
    function(moved) { newResults[moved.old_index - 1] = undefined; });

  diff.copied !== null && diff.copied.forEach(function(copied) {
    var copyRow = _.clone(data[copied.orig_index - 1]);
    copyRow._index = copied.new_index;
    newResults[copied.new_index - 1] = copyRow;
  });

  diff.moved !== null && diff.moved.forEach(function(moved) {
    var movingRow = data[moved.old_index - 1];
    movingRow._index = moved.new_index;
    newResults[moved.new_index - 1] = movingRow;
  });

  diff.added !== null && diff.added.forEach(
    function(added) { newResults[added._index - 1] = added; });

  var result = newResults.filter(function(row) { return row !== undefined; });

  return result.map(function(row) {
    row = _.clone(row);
    delete row._index;
    return row;
  });
}
