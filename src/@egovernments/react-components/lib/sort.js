function mergeSort(unsortedArray, key) {
  if (unsortedArray.length <= 1) {
    return unsortedArray;
  }

  const middle = Math.floor(unsortedArray.length / 2);
  const left = unsortedArray.slice(0, middle);
  const right = unsortedArray.slice(middle);

  return merge(mergeSort(left, key), mergeSort(right, key), key);
}

function merge(left, right, key) {
  let resultArray = [],
    leftIndex = 0,
    rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex][key] < right[rightIndex][key]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function reverseArray(array, last) {
  array.splice(last, 0, array[0]);
  array.shift();
  last = last - 1;
  if (last > 1) {
    return reverseArray(array, last);
  } else {
    last = array.length;
    return array;
  }
}

function sort(dataProp, key, sortBy) {
  switch (sortBy) {
    case "asc":
      return mergeSort(dataProp, key);
    case "desc":
      return reverseArray(dataProp, dataProp.length);
    default:
      console.warn("sortBy attribute should only have asc or desc as default values");
      return dataProp;
  }
}

export default sort;
