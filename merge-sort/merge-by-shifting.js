function mergeSort(unsortedArray) {
    if (unsortedArray.length <= 1) {
        return unsortedArray
    }

    const middle = Math.floor(unsortedArray.length/2)

    const left = unsortedArray.slice(0, middle)
    const right = unsortedArray.slice(middle)

    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    let result = [];

    while (left[0] && right[0]) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }

    return [...result, ...left, ...right]
}