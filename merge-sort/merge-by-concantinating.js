$(document).ready(() => {
  let container = $('.solution');

  $('form').on('submit', function (e) {
    e.preventDefault();
    let values = $(this).serializeArray()[0].value.trim().split(' ');
    console.log(mergeSort(values));
  });

  function mergeSort(unsortedArray, depth) {
      if (!depth) {
        depth = 0
      }
      console.log(depth)
      depth++;

    var row = $(`.row-${depth}`).length ? $(`.row-${depth}`) : createRow(depth);
    row.appendTo(container);
    let part = $('<div/>').addClass('part');
    part.appendTo($(`.row-${depth}`));

    unsortedArray.forEach((val) => {
      $('<div/>').addClass('number').text(val).appendTo(part);
    });

    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }

    const middle = Math.floor(unsortedArray.length / 2);

    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);

    return merge(mergeSort(left, depth), mergeSort(right, depth));
  }

  function merge(left, right) {
    let result = [],
      leftIndex = 0,
      rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  function createRow(level) {
    let row = $('<div/>').addClass('row-' + level);
    // level++;

    return row;
  }
});
