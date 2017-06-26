/*
Write a function fib() that a takes an integer nn and returns the nnth fibonacci ↴ number.
Let's say our fibonacci series is 0-indexed and starts with 0. So:

fib(0); // => 0
fib(1); // => 1
fib(2); // => 1
fib(3); // => 2
fib(4); // => 3
...

Gotchas
Our solution runs in NN time.

There's a clever, more mathey solution that runs in O(\lg{n})O(lgn) time, but we'll leave that one as a bonus.

If you wrote a recursive function, think carefully about what it does. It might do repeat work, like computing fib(2) multiple times!

We can do this in O(1)O(1) space. If you wrote a recursive function, there might be a hidden space cost in the call stack ↴ !

Breakdown
The nnth fibonacci number is defined in terms of the two previous fibonacci numbers, so this seems to lend itself to recursion.

  fib(n) = fib(n-1) + fib(n-2);

Can you write up a recursive solution?

As with any recursive function, we just need a base case and a recursive case:

Base case: nn is 0 or 1. Return nn.
Recursive case: Return fib(n-1) + fib(n-2).
  function fibRecursive(n) {
    if (n === 0 || n === 1) {
        return n;
    }
    return fibRecursive(n-1) + fibRecursive(n-2);
}

Okay, this'll work! What's our time complexity?

It's not super obvious. We might guess NN, but that's not quite right. Can you see why?

Each call to fib() makes two more calls. Let's look at a specific example. Let's say n=5n=5. If we call fib(5), how many calls do we make in total?

Try drawing it out as a tree where each call has two child calls, unless it's a base case.

Here's what the tree looks like:

A binary tree showing the recursive calls of calling fib of 5. Every fib of n call calls fib of n minus 1 and fib of n minus 2. So calling fib of 5 calls fib of 4 and fib of 3, which keep calling fib of lower numbers until reaching the base cases fib of 1 or fib of 0.
We can notice this is a binary tree ↴ whose height is NN, which means the total number of nodes is O(2^n)O(2
​n
​​ ).

So our total runtime is O(2^n)O(2
​n
​​ ). That's an "exponential time cost," since the nn is in an exponent. Exponential costs are terrible. This is way worse than O(n^2)O(n
​2
​​ ) or even O(n^{100})O(n
​100
​​ ).

Our recurrence tree above essentially gets twice as big each time we add 1 to nn. So as nn gets really big, our runtime quickly spirals out of control.

The craziness of our time cost comes from the fact that we're doing so much repeat work. How can we avoid doing this repeat work?

We can memoize ↴ !

Let's wrap fib() in a class with an instance variable where we store the answer for any nn that we compute:

  function Fibber() {
    this.memo = {};
}

Fibber.prototype.fib = function(n) {

    // edge case: negative index
    if (n < 0) {
        throw new Error('Index was negative. No such thing as a negative index in a series.');
    }

    // base case: 0 or 1
    else if (n === 0 || n === 1) {
        return n;
    }

    // see if we've already calculated this
    if (this.memo.hasOwnProperty(n)) {
        return this.memo[n];
    }

    var result = this.fib(n-1) + this.fib(n-2);

    // memoize
    this.memo[n] = result;

    return result;
};

What's our time cost now?

Our recurrence tree will look like this:

A binary tree showing the memos and recursive calls of calling fib of 5. Starting with the calls for fib of n minus 1, fib of 5 calls fib of 4, which calls fib of 3, which calls fib of 2, which calls fib of 1. then, for the fib of n minus 2 calls, fib of 5 gets the memo fib of 3, fib of 4 gets the memo fib of 2, fib of 3 gets the memo fib of 1, and fib of 2 calls fib of 0.
The computer will build up a call stack with fib(5), fib(4), fib(3), fib(2), fib(1). Then we'll start returning, and on the way back up our tree we'll be able to compute each node's 2nd call to fib() in constant time by just looking in the memo. NN time in total.

What about space? memo takes up NN space. Plus we're still building up a call stack that'll occupy NN space. Can we avoid one or both of these space expenses?

Look again at that tree. Notice that to calculate fib(5) we worked "down" to fib(4), fib(3), fib(2), etc.

What if instead we started with fib(0) and fib(1) and worked "up" to nn?

Solution
We use a bottom-up ↴ approach, starting with the 0th fibonacci number and iteratively computing subsequent numbers until we get to nn.

  function fib(n) {

    // edge cases:
    if (n < 0) {
        throw new Error('Index was negative. No such thing as a negative index in a series.');
    } else if (n === 0 || n === 1) {
        return n;
    }

    // we'll be building the fibonacci series from the bottom up
    // so we'll need to track the previous 2 numbers at each step
    var prevPrev = 0;  // 0th fibonacci
    var prev = 1;      // 1st fibonacci
    var current;       // Declare current

    for (var i = 1; i < n; i++) {

        // Iteration 1: current = 2nd fibonacci
        // Iteration 2: current = 3rd fibonacci
        // Iteration 3: current = 4th fibonacci
        // To get nth fibonacci ... do n-1 iterations.
        current = prev + prevPrev;
        prevPrev = prev;
        prev = current;
    }

    return current;
}

Complexity
NN time and O(1)O(1) space.

Bonus
If you're good with matrix multiplication you can bring the time cost down even further, to O(\lg{n})O(lgn). Can you figure out how?

What We Learned
This one's a good illustration of the tradeoff we sometimes have between code cleanliness and efficiency.

We could use a cute, recursive function to solve the problem. But that would cost O(2^n)O(2
​n
​​ ) time as opposed to NN time in our final bottom-up solution. Massive difference!

In general, whenever you have a recursive solution to a problem, think about what's actually happening on the call stack. An iterative solution might be more efficient.
*/



////////////////////     SOLUTION     ////////////////////



// function nthFibonacci (n) {
//   var prevPrev = 0;
//   var prev = 1;
//   var current;

//   if (n < 0) {
//     throw new Error("no such thing as negative index");
//   } else if (n === 0 || n === 1) {
//     return n;
//   }

//   for (var i = 1; i < n; i++) {
//     current = prev + prevPrev;
//     prevPrev = prev;
//     prev = current;
//   }

//   return current;
// }



////////////////////     PRACTICE     ////////////////////





console.log(nthFibonacci(4));


