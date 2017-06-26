/*
Write a function to reverse a string in-place ↴ .
Since strings in JavaScript are immutable ↴ , first convert the string into an array of characters, do the in-place reversal on that array, and re-join that array into a string before returning it. This isn't technically "in-place" and the array of characters will cost O(n)O(n) additional space, but it's a reasonable way to stay within the spirit of the challenge. If you're comfortable coding in a language with mutable strings, that'd be even better!

Breakdown
In general, an " in-place ↴ " algorithm will require swapping elements.

Solution
We swap the first and last characters, then the second and second-to-last characters, and so on until we reach the middle.

  function reverse(string) {

    var stringArray = string.split('');

    var startIndex = 0;
    var endIndex = stringArray.length - 1;

    while (startIndex < endIndex) {

        // swap characters
        var temp = stringArray[startIndex];
        stringArray[startIndex] = stringArray[endIndex];
        stringArray[endIndex] = temp;

        // move towards middle
        startIndex++;
        endIndex--;
    }

    return stringArray.join('');
}

Complexity
O(n)O(n) time and O(1)O(1) space.
*/



////////////////////     SOLUTION     ////////////////////



// function reverseString (str) {
//   var split = str.split("");
//   var leftIdx = 0;
//   var rightIdx = split.length - 1;

//   while (leftIdx < rightIdx) {
//     var temp = split[leftIdx];
//     split[leftIdx] = split[rightIdx];
//     split[rightIdx] = temp;

//     leftIdx++;
//     rightIdx--;
//   }
//   return split.join("");
// }



////////////////////     PRACTICE     ////////////////////





console.log(reverseString("Brunation"));
