let array = [];
let bars = [];


const exampleArrays = {
    bubbleSort: [50, 70, 30, 90, 60, 20, 80, 10, 40, 100], 
    insertionSort: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10], 
    selectionSort: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], 
    mergeSort: [50, 20, 90, 40, 10, 80, 60, 30, 70, 100], 
    quickSort: [50, 70, 30, 90, 60, 20, 80, 10, 40, 100], 
    heapSort: [3, 19, 1, 14, 8, 7, 9, 2, 4, 10], 
    cocktailSort: [100, 50, 80, 30, 70, 60, 10, 40, 90, 20], 
    gnomeSort: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10] 
};

function generateBars() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    bars = [];
    
    array.forEach(value => {
        let bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = value + 'px';
        container.appendChild(bar);
        bars.push(bar);
    });
}


function loadExample(exampleName) {
    array = [...exampleArrays[exampleName]];
    generateBars();
}


function startBubbleSort() {
    loadExample('bubbleSort');
    bubbleSort([...array]);
}

function startInsertionSort() {
    loadExample('insertionSort');
    insertionSort([...array]);
}

function startSelectionSort() {
    loadExample('selectionSort');
    selectionSort([...array]);
}

function startMergeSort() {
    loadExample('mergeSort');
    mergeSort([...array]);
}

function startQuickSort() {
    loadExample('quickSort');
    quickSort([...array], 0, array.length - 1);
}

function startHeapSort() {
    loadExample('heapSort');
    heapSort([...array]);
}

function startCocktailSort() {
    loadExample('cocktailSort');
    cocktailSort([...array]);
}

function startGnomeSort() {
    loadExample('gnomeSort');
    gnomeSort([...array]);
}

// Bubble Sort Algorithm
async function bubbleSort(arr) {
    generateBars();
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];  
                updateBars(arr);
                await sleep(200);  
            }
        }
    }
}


async function insertionSort(arr) {
    generateBars();
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            updateBars(arr);
            await sleep(200);
            j--;
        }
        arr[j + 1] = key;
        updateBars(arr);
        await sleep(200);
    }
}


async function selectionSort(arr) {
    generateBars();
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];  // Swap
        updateBars(arr);
        await sleep(500);
    }
}


async function mergeSort(arr) {
    generateBars();
    await mergeSortHelper(arr, 0, arr.length - 1);
}

async function mergeSortHelper(arr, left, right) {
    if (left < right) {
        let mid = Math.floor((left + right) / 2);
        await mergeSortHelper(arr, left, mid);
        await mergeSortHelper(arr, mid + 1, right);
        await merge(arr, left, mid, right);
    }
}

async function merge(arr, left, mid, right) {
    let n1 = mid - left + 1;
    let n2 = right - mid;

    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
        updateBars(arr);
        await sleep(200);
    }

    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
        updateBars(arr);
        await sleep(200);
    }

    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
        updateBars(arr);
        await sleep(200);
    }
}


async function quickSort(arr, low, high) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            updateBars(arr);
            await sleep(200);
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    updateBars(arr);
    await sleep(200);

    return i + 1;
}


async function heapSort(arr) {
    generateBars();
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];  // Swap
        await heapify(arr, i, 0);
        updateBars(arr);
        await sleep(500);
    }
}

async function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        await heapify(arr, n, largest);
    }
}


async function cocktailSort(arr) {
    generateBars();
    let n = arr.length;
    let swapped = true;
    let start = 0;
    let end = n - 1;

    while (swapped) {
        swapped = false;

        for (let i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                updateBars(arr);
                await sleep(200);
                swapped = true;
            }
        }

        if (!swapped) break;

        swapped = false;
        end--;

        for (let i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                updateBars(arr);
                await sleep(200);
                swapped = true;
            }
        }

        start++;
    }
}


async function gnomeSort(arr) {
    generateBars();
    let index = 0;
    while (index < arr.length) {
        if (index === 0 || arr[index] >= arr[index - 1]) {
            index++;
        } else {
            [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
            updateBars(arr);
            await sleep(200);
            index--;
        }
    }
}


function updateBars(arr) {
    arr.forEach((value, index) => {
        bars[index].style.height = value + 'px';
    });
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


generateBars();
