/*
You have an array of integers, and for each index you want to find the product of every integer except the integer at that index.
Write a function getProductsOfAllIntsExceptAtIndex() that takes an array of integers and returns an array of the products.

For example, given:

  [1, 7, 3, 4]

your function would return:

  [84, 12, 28, 21]

by calculating:

  [7 * 3 * 4,  1 * 3 * 4,  1 * 7 * 4,  1 * 7 * 3]

Do not use division in your solution.

Gotchas
Does your function work if the input array contains zeroes? Remember—no division.

We can do this in O(n)O(n) time and O(n)O(n) space!

We only need to allocate one new array of size nn.

Breakdown
A brute force approach would use two loops to multiply the integer at every index by the integer at every nestedIndex, unless index === nestedIndex.

This would give us a runtime of O(n^2)O(n
​2
​​ ). Can we do better?

Well, we’re wasting a lot of time doing the same calculations. As an example, let's take:

  // input array
[1, 2, 6, 5, 9]

// array of the products of all integers
// except the integer at each index:
[540, 270, 90, 108, 60] // [2 * 6 * 5 * 9,  1 * 6 * 5 * 9,  1 * 2 * 5 * 9,  1 * 2 * 6 * 9,  1 * 2 * 6 * 5]

We're doing some of the same multiplications two or three times!

When we calculate [2*6*5*9, 1*6*5*9, 1*2*5*9, 1*2*6*9, 1*2*6*5], we're calculating 5*9 three times: at indices 0, 1, and 2.
Or look at this pattern:

When we calculate [2*6*5*9, 1*6*5*9, 1*2*5*9, 1*2*6*9, 1*2*6*5], we have 1 in index 1, and we calculate 1*2 at index 2, 1*2*6 at index 3, and 1*2*6*5 at index 4.
We’re redoing multiplications when instead we could be storing the results! This would be a great time to use a greedy ↴ approach. We could store the results of each multiplication highlighted in blue, then just multiply by one new integer each time.

So in the last highlighted multiplication, for example, we wouldn’t have to multiply 1*2*61∗2∗6 again. If we stored that value (1212) from the previous multiplication, we could just multiply 12*512∗5.

Can we break our problem down into subproblems so we can use a greedy approach?

Let's look back at the last example:

When we calculate [2*6*5*9, 1*6*5*9, 1*2*5*9, 1*2*6*9, 1*2*6*5], we have 1 in index 1, and we calculate 1*2 at index 2, 1*2*6 at index 3, and 1*2*6*5 at index 4.
What do all the highlighted multiplications have in common?

They are all the integers that are before each index in the input array ([1, 2, 6, 5, 9][1,2,6,5,9]). For example, the highlighted multiplication at index 3 (1*2*61∗2∗6) is all the integers before index 3 in the input array.

In the pattern where we calculate 1*2 at index 2, 1*2*6 at index 3, and 1*2*6*5 at index 4, each calculation is the product of all the numbers before the number at that index. For example, 5 is at index 3, and 1*2*6 is the product of all the numbers before 5 in the input array.
Do all the multiplications that aren't highlighted have anything in common?

Yes, they're all the integers that are after each index in the input array!

Knowing this, can we break down our original problem to use a greedy approach?

The product of all the integers except the integer at each index can be broken down into:

the product of all the integers before each index
the product of all the integers after each index.
To start, let's just get the product of all the integers before each index.

How can we do this? Let's take another example:

  // input array
[3, 1, 2, 5, 6, 4]

// multiplication of all integers before each index
// (we give index 0 a value of 1 since it has no integers before it)
[1, 3,  3 * 1,  3 * 1 * 2,  3 * 1 * 2 * 5,  3 * 1 * 2 * 5 * 6]

// final array of the products of all the integers before each index
[1, 3, 3, 6, 30, 180]

Notice that we're always adding one new integer to our multiplication for each index!

So to get the products of all the integers before each index, we could greedily store each product so far and multiply that by the next integer. Then we can store that new product so far and keep going.

So how can we apply this to our input array?

Let’s make an array productsOfAllIntsBeforeIndex:

  var productsOfAllIntsBeforeIndex = [];

// for each integer, find the product of all the integers
// before it, storing the total product so far each time
var productSoFar = 1;
for (var i = 0; i < intArray.length; i++) {
    productsOfAllIntsBeforeIndex[i] = productSoFar;
    productSoFar *= intArray[i];
}

So we solved the subproblem of finding the products of all the integers before each index. Now, how can we find the products of all the integers after each index?

It might be tempting to make a new array of all the values in our input array in reverse, and just use the same function we used to find the products before each index.

Is this the best way?

This method will work, but:

We'll need to make a whole new array that's basically the same as our input array. That's another O(n)O(n) memory cost!
To keep our indices aligned with the original input array, we'd have to reverse the array of products we return. That's two reversals, or two O(n)O(n) operations!
Is there a cleaner way to get the products of all the integers after each index?

We can just walk through our array backwards! So instead of reversing the values of the array, we'll just reverse the indices we use to iterate!

  var productsOfAllIntsAfterIndex = [];

var productSoFar = 1;
for (var i = intArray.length - 1; i >= 0; i--) {
    productsOfAllIntsAfterIndex[i] = productSoFar;
    productSoFar *= intArray[i];
}

Now we've got productsOfAllIntsAfterIndex, but we’re starting to build a lot of new arrays. And we still need our final array of the total products. How can we save space?

Let’s take a step back. Right now we’ll need three arrays:

productsOfAllIntsBeforeIndex
productsOfAllIntsAfterIndex
productsOfAllIntsExceptAtIndex
To get the first one, we keep track of the total product so far going forwards, and to get the second one, we keep track of the total product so far going backwards. How do we get the third one?

Well, we want the product of all the integers before an index and the product of all the integers after an index. We just need to multiply every integer in productsOfAllIntsBeforeIndex with the integer at the same index in productsOfAllIntsAfterIndex!

Let's take an example. Say our input array is [2, 4, 10][2,4,10]:

We'll calculate productsOfAllIntsBeforeIndex as:

If the input array is [2, 4, 10], the product of all the numbers before each index is [1, 2, 8]
And we'll calculate productsOfAllIntsAfterIndex as:

If the input array is [2, 4, 10], the product of all the numbers after each index is [40, 10, 1]
If we take these arrays and multiply the integers at the same indices, we get:

The product of all the numbers before an index times the product of all the numbers after an index is the product of the numbers at all other indices: 1*40=40, 2*10=20, 8*1=8.
And this gives us what we're looking for—the products of all the integers except the integer at each index.

Knowing this, can we eliminate any of the arrays to reduce the memory we use?

Yes, instead of building the second array productsOfAllIntsAfterIndex, we could take the product we would have stored and just multiply it by the matching integer in productsOfAllIntsBeforeIndex!

So in our example above, when we calculated our first (well, "0th") "product after index" (which is 40), we’d just multiply that by our first "product before index" (1) instead of storing it in a new array.

How many arrays do we need now?

Just one! We create an array, populate it with the products of all the integers before each index, and then multiply those products with the products after each index to get our final result!

productsOfAllIntsBeforeIndex now contains the products of all the integers before and after every index, so we can call it productsOfAllIntsExceptAtIndex!

Almost done! Are there any edge cases we should test?

What if the input array contains zeroes? What if the input array only has one integer?

We'll be fine with zeroes.

But what if the input array has fewer than two integers?

Well, there won't be any products to return because at any index there are no “other” integers. So let's throw an exception.

Solution
To find the products of all the integers except the integer at each index, we'll go through our array greedily ↴ twice. First we get the products of all the integers before each index, and then we go backwards to get the products of all the integers after each index.

When we multiply all the products before and after each index, we get our answer—the products of all the integers except the integer at each index!

  function getProductsOfAllIntsExceptAtIndex(intArray) {

    if (intArray.length < 2) {
        throw new Error('Getting the product of numbers at other indices requires at least 2 numbers');
    }

    var productsOfAllIntsExceptAtIndex = [];

    // for each integer, we find the product of all the integers
    // before it, storing the total product so far each time
    var productSoFar = 1;
    for (var i = 0; i < intArray.length; i++) {
        productsOfAllIntsExceptAtIndex[i] = productSoFar;
        productSoFar *= intArray[i];
    }

    // for each integer, we find the product of all the integers
    // after it. since each index in products already has the
    // product of all the integers before it, now we're storing
    // the total product of all other integers
    productSoFar = 1;
    for (var j = intArray.length - 1; j >= 0; j--) {
        productsOfAllIntsExceptAtIndex[j] *= productSoFar;
        productSoFar *= intArray[j];
    }

    return productsOfAllIntsExceptAtIndex;
}

Complexity
O(n)O(n) time and O(n)O(n) space. We make two passes through our input an array, and the array we build always has the same length as the input array.

Bonus
What if you could use division? Careful—watch out for zeroes!

What We Learned
Another question using a greedy ↴ approach. The tricky thing about this one: we couldn't actually solve it in one pass. But we could solve it in two passes!

This approach probably wouldn't have been obvious if we had started off trying to use a greedy approach.

Instead, we started off by coming up with a slow (but correct) brute force solution and trying to improve from there. We looked at what our solution actually calculated, step by step, and found some repeat work. Our final answer came from brainstorming ways to avoid doing that repeat work.

So that's a pattern that can be applied to other problems:

Start with a brute force solution, look for repeat work in that solution, and modify it to only do that work once.
*/



////////////////////     SOLUTION     ////////////////////



// function getProductsOfAllIntsExceptAtIndex (arr) {
//   // set a variable to an empty array to store the values;
//   var products = [];
//   // set variables for left and right;
//   // these values will be used as our counter by setting and multipling by values as we move;
//   var productsLeft = 1;
//   var productsRight = 1;

//   // iterate array from left to right; 
//   // each value in the products array will be set to the product of all values to it's left;
//   // after this loop the products array should look like:
//   // [1, 1, 7, 21];
//   for (var i = 0; i < arr.length; i++) {
//     arr[i] = productsLeft;
//     productsLeft *= arr[i];
//   }

//   // iterate array from right to left;
//   // each value in the products array will be to it's current value times all the values to its right;
//   // after this loop the products array should look like:
//   // [84, 12, 28, 21];
//   for (var j = arr.length - 1; j >= 0; j--) {
//     products[j] *= productsRight;
//     productsRight *= arr[j];
//   }
//   // return the array containing the product of all values except at the index;
//   return products;
// }



////////////////////     PRACTICE     ////////////////////



var values = [1, 7, 3, 4];
// answer: [84, 12, 28, 21]

console.log(getProductsOfAllIntsExceptAtIndex(values));
