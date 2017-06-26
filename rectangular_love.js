/*
A crack team of love scientists from OkEros (a hot new dating site) have devised a way to represent dating profiles as rectangles on a two-dimensional plane.
They need help writing an algorithm to find the intersection of two users' love rectangles. They suspect finding that intersection is the key to a matching algorithm so powerful it will cause an immediate acquisition by Google or Facebook or Obama or something.

Two rectangles overlapping a little. It must be love.
Write a function to find the rectangular intersection of two given love rectangles.

As with the example above, love rectangles are always "straight" and never "diagonal." More rigorously: each side is parallel with either the x-axis or the y-axis.

They are defined as objects ↴ like this:

  var myRectangle = {

    // coordinates of bottom-left corner
    leftX: 1,
    bottomY: 5,

    // width and height
    width: 10,
    height: 4,

};

Your output rectangle should use this format as well.

Gotchas
What if there is no intersection? Does your function do something reasonable in that case?

What if one rectangle is entirely contained in the other? Does your function do something reasonable in that case?

What if the rectangles don't really intersect but share an edge? Does your function do something reasonable in that case?

Do some parts of your function seem very similar? Can they be refactored so you repeat yourself less?

Breakdown
Let's break this problem into subproblems. How can we divide this problem into smaller parts?

We could look at the two rectangles’ "horizontal overlap" or "x overlap" separately from their "vertical overlap" or "y overlap."

Lets start with a helper function findXOverlap().

Need help finding the x overlap?

Since we’re only working with the x dimension, we can treat the two rectangles' widths as ranges on a 1-dimensional number line.

What are the possible cases for how these ranges might overlap or not overlap? Draw out some examples!

There are four relevant cases:

1) The ranges partially overlap:

Two horizontal parallel lines. The right half of the top line overlaps the left half of the bottom line.
2) One range is completely contained in the other:

Two horizontal parallel lines. The bottom line is longer than the top line and extends farther out to the left and right.
3) The ranges don't overlap:

Two horizontal parallel lines. The right end of the bottom line is to the left of the left end of the top line.
4) The ranges "touch" at a single point:

Two horizontal parallel lines. The right end of the bottom line is directly below the left end of the top line.
Let's start with the first 2 cases. How do we compute the overlapping range?

One of our ranges starts "further to the right" than the other. We don't know ahead of time which one it is, but we can check the starting points of each range to see which one has the highestStartPoint. That highestStartPoint is always the left-hand side of the overlap, if there is one.

Not convinced? Draw some examples!

Similarly, the right-hand side of our overlap is always the lowestEndPoint. That may or may not be the end point of the same input range that had the highestStartPoint—compare cases (1) and (2).

This gives us our x overlap! So we can handle cases (1) and (2). How do we know when there is no overlap?

If highestStartPoint > lowestEndPoint, the two rectangles do not overlap.

But be careful—is it just greater than or is it greater than or equal to?

It depends how we want to handle case (4) above.

If we use greater than, we treat case (4) as an overlap. This means we could end up returning a rectangle with zero width, which ... may or may not be what we're looking for. You could make an argument either way.

Let's say a rectangle with zero width (or zero height) isn't a rectangle at all, so we should treat that case as "no intersection."

Can you finish findXOverlap()?

Here's one way to do it:

  function findXOverlap(x1, width1, x2, width2) {

    // find the highest ("rightmost") start point and lowest ("leftmost") end point
    var highestStartPoint = Math.max(x1, x2);
    var lowestEndPoint = Math.min(x1 + width1, x2 + width2);

    // return null overlap if there is no overlap
    if (highestStartPoint >= lowestEndPoint) {
        return {startPoint: null, width: null};
    }

    // compute the overlap width
    var overlapWidth = lowestEndPoint - highestStartPoint;

    return {startPoint: highestStartPoint, width: overlapWidth};
}

How can we adapt this for the rectangles’ ys and heights?

Can we just make one findRangeOverlap() function that can handle x overlap and y overlap?

Yes! We simply use more general parameter names:

  function findRangeOverlap(point1, length1, point2, length2) {

    // find the highest start point and lowest end point.
    // the highest ("rightmost" or "upmost") start point is
    // the start point of the overlap.
    // the lowest end point is the end point of the overlap.
    var highestStartPoint = Math.max(point1, point2);
    var lowestEndPoint = Math.min(point1 + length1, point2 + length2);

    // return null overlap if there is no overlap
    if (highestStartPoint >= lowestEndPoint) {
        return {startPoint: null, overlapLength: null};
    }

    // compute the overlap length
    var overlapLength = lowestEndPoint - highestStartPoint;

    return {startPoint: highestStartPoint, overlapLength: overlapLength};
}

We've solved our subproblem of finding the x and y overlaps! Now we just need to put the results together.

Solution
We divide the problem into two halves:

The intersection along the x-axis
The intersection along the y-axis
Both problems are basically the same as finding the intersection of two "ranges" on a 1-dimensional number line.

So we write a helper function findRangeOverlap() that can be used to find both the x overlap and the y overlap, and we use it to build the rectangular overlap:

  function findRangeOverlap(point1, length1, point2, length2) {

    // find the highest start point and lowest end point.
    // the highest ("rightmost" or "upmost") start point is
    // the start point of the overlap.
    // the lowest end point is the end point of the overlap.
    var highestStartPoint = Math.max(point1, point2);
    var lowestEndPoint = Math.min(point1 + length1, point2 + length2);

    // return null overlap if there is no overlap
    if (highestStartPoint >= lowestEndPoint) {
        return {startPoint: null, overlapLength: null};
    }

    // compute the overlap length
    var overlapLength = lowestEndPoint - highestStartPoint;

    return {startPoint: highestStartPoint, overlapLength: overlapLength};
}

function findRectangularOverlap(rect1, rect2) {

    // get the x and y overlap points and lengths
    var xOverlap = findRangeOverlap(rect1.leftX, rect1.width, rect2.leftX, rect2.width);
    var yOverlap = findRangeOverlap(rect1.bottomY, rect1.height, rect2.bottomY, rect2.height);

    // return null rectangle if there is no overlap
    if (!xOverlap.overlapLength || !yOverlap.overlapLength) {
        return {
            leftX: null,
            bottomY: null,
            width: null,
            height: null,
        };
    }

    return {
        leftX: xOverlap.startPoint,
        bottomY: yOverlap.startPoint,
        width: xOverlap.overlapLength,
        height: yOverlap.overlapLength,
    };
}

Complexity
O(1)O(1) time and O(1)O(1) space.

Bonus
What if we had an array of rectangles and wanted to find all the rectangular overlaps between all possible pairs of two rectangles within the array? Note that we'd be returning an array of rectangles.

What if we had an array of rectangles and wanted to find the overlap between all of them, if there was one? Note that we'd be returning a single rectangle.

What We Learned
This is an interesting one because the hard part isn't the time or space optimization—it's getting something that works and is readable.

For problems like this, I often see candidates who can describe the strategy at a high level but trip over themselves when they get into the details.

Don't let it happen to you. To keep your thoughts clear and avoid bugs, take time to:

Think up and draw out all the possible cases. Like we did with the ways ranges can overlap.
Use very specific and descriptive variable names.
*/



////////////////////     SOLUTION     ////////////////////



// function findOverlap(point1, length1, point2, length2) {
//   var highestStartPoint = Math.max(point1, point2);
//   var lowestEndPoint = Math.min(point1 + length1, point2 + length2);

//   if (highestStartPoint >= lowestEndPoint) {
//     return {startPoint: null, overlapLength: null};
//   }

//   var overlapLength = lowestEndPoint - highestStartPoint;

//   return {startPoint: highestStartPoint, overlapLength: overlapLength};
// }

// function findIntersection (obj1, obj2) {
//   var overlapX = findOverlap(obj1.leftX, obj1.width, obj2.leftX, obj2.width);
//   var overlapY = findOverlap(obj1.bottomY, obj1.height, obj2.bottomY, obj2.height);

//   if (!overlapX.overlapLength || !overlapY.overlapLength) {
//     return {
//       leftIdx: null,
//       bottomY: null,
//       width: null,
//       height: null
//     };
//   }

//   return {
//     leftIdx: overlapX.startPoint,
//     bottomY: overlapY.startPoint,
//     width: overlapX.overlapLength,
//     height: overlapY.overlapLength
//   };
// }



////////////////////     PRACTICE     ////////////////////





var obj1 = {
  leftX: 1,
  bottomY: 1,
  width: 4,
  height: 2
}

var obj2 = {
  leftX: 4,
  bottomY: 1,
  width: 2,
  height: 6
}
// answer: {
//     leftX: 4,
//     bottomY: 1,
//     width: 1,
//     height: 2
// }

var overlap = findIntersection(obj1, obj2);
console.log(JSON.stringify(overlap, null, 4));
