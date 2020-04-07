$(document).ready(() => {
  let logs = $('ol');

  $('#myForm').on('submit', function (e) {
    e.preventDefault();

    let values = $(this)
      .serializeArray()[0]
      .value.trim()
      .split(' ')
      .map((v) => +v);
    let firstList = $('#first');
    let secondList = $('#second');
    firstList.empty();
    secondList.empty();
    logs.empty();

    mergeSort(values, firstList, secondList);
  });

  function createNode(className) {
    let node = $('<li/>').addClass(className);
    let title = $('<div/>').addClass('title').appendTo(node);
    let content = $('<ul/>').addClass('content').appendTo(node);

    return { node, title, content };
  }

  function mergeSort(unsortedArray, parent, reverseParent) {
    let { node: treeNode, title, content } = createNode('part');
    treeNode.appendTo(parent);

    let {
      node: reverseTreeNode,
      title: reverseTreeTitle,
      content: reverseTreeContent,
    } = createNode('reverse-part');
    reverseTreeNode.appendTo(reverseParent);

    unsortedArray.forEach((val) => {
      $('<div/>').addClass('number').text(val).appendTo(title);
    });

    if (unsortedArray.length <= 1) {
      $('<div/>')
        .addClass('number')
        .text(unsortedArray[0])
        .appendTo(reverseTreeTitle);
      return unsortedArray;
    }

    const middle = Math.floor(unsortedArray.length / 2);

    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);

    console.log(`Pass: LEFT ( ${left} ) || RIGHT (${right})`);
    let log = $('<li/>').addClass('log').appendTo(logs);
    let header = $('<div/>').addClass('header').appendTo(log);
    let step = $('<span/>').addClass('step').addClass('pass').text('PASS: ')
    let text = $('<span/>').addClass('text').text(`LEFT ( ${left} ) || RIGHT (${right})`);
    step.appendTo(header)
    text.appendTo(header)

    const res = merge(
      mergeSort(left, content, reverseTreeContent),
      mergeSort(right, content, reverseTreeContent)
    );

    res.forEach((val) => {
      $('<div/>').addClass('number').text(val).appendTo(reverseTreeTitle);
    });

    return res;
  }

  function createTitle(arr) {
    let title = $('<div/>').addClass('title');

    arr.forEach((val) => {
      $('<div/>').addClass('number').text(val).appendTo(title);
    });

    return title;
  }

  function merge(left, right) {
    console.log(`Merge: LEFT: (${left}) || RIGHT (${right})`);
    let log = $('<li/>').addClass('log').appendTo(logs);
    let header = $('<div/>').addClass('header').appendTo(log);
    let step = $('<span/>').addClass('step').addClass('merge').text('MERGE: ')
    let comparisonList = $('<ul/>').addClass('comparison-list').appendTo(log);
    let text = $('<span/>').addClass('text').text(`LEFT: (${left}) || RIGHT (${right})`);
    step.appendTo(header)
    text.appendTo(header)
    let result = [];

    while (left.length && right.length) {
      $('<li/>')
        .addClass('comparison')
        .text(`${left[0]} < ${right[0]}`)
        .appendTo(comparisonList);

      if (left[0] < right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }

    result = [...result, ...left, ...right];

    return result;
  }
});
