export const problems = {
  three_sum: {
    id: 1,
    name: "Three Sum",
    questions:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    description:
      "You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    inputTestCases: [
      { input: "200 400 6000", output: "6600" },
      { input: "10 20 300", output: "330" },
      { input: "10 20 600", output: "630" },
      { input: "5 5 5", output: "15" },
      { input: "100 200 300", output: "600" },
    ],
    difficulty: "Easy",
  },
  two_sum: {
    id: 1,
    name: "Two Sum",
    questions:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    description:
      "You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    inputTestCases: [
      {
        input: "Sample Input 1: [2,7,11,15], 9",
        output: "Sample Output 1: [0,1]",
      },
      { input: "Sample Input 2: [3,2,4], 6", output: "Sample Output 2: [1,2]" },
      { input: "Sample Input 3: [3,3], 6", output: "Sample Output 3: [0,1]" },
    ],
    difficulty: "Easy",
  },
  reverse_string: {
    id: 2,
    questions:
      "Write a function that reverses a string. The input string is given as an array of characters s. lorem",
    description:
      "You must do this by modifying the input array in-place with O(1) extra memory. If you want to include the problem name in your frontend without changing the format of your existing data rendering, you can do so by adding it directly in your JSX code. This can be achieved by adding a hardcoded label or value for the question name while keeping the existing format for displaying th If you are dynamically rendering different problems and want to include the name from the data, you would need to include the problem name in your data structure and render it accordingly. However, e data.",
    inputTestCases: [
      {
        input: " Sample Input 1: ['h','e','l','l','o']",
        output: "Sample Output 1: ['o','l','l','e','h']",
      },
      {
        input: "Sample Input 2: ['H','a','n','n','a','h']",
        output: "Sample Output 2: ['h','a','n','n','a','H']",
      },
    ],
    difficulty: "Easy",
  },
  palindrome_number: {
    id: 3,
    questions:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",
    description:
      "An integer is a palindrome when it reads the same forward and backward. For example, 121 is a palindrome while 123 is not.",
    inputTestCases: [
      { input: "Sample Input 1:121", output: "true" },
      { input: "-121", output: "false" },
      { input: "10", output: "false" },
    ],
    difficulty: "Easy",
  },
  valid_parentheses: {
    id: 4,
    questions:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    description:
      "An input string is valid if open brackets are closed by the same type of brackets, open brackets are closed in the correct order, and every close bracket has a corresponding open bracket of the same type.",
    inputTestCases: [
      { input: "'()'", output: "true" },
      { input: "'()[]{}'", output: "true" },
      { input: "'(]'", output: "false" },
      { input: "'([)]'", output: "false" },
      { input: "'{[]}'", output: "true" },
    ],
    difficulty: "Hard",
  },
  merge_two_sorted_lists: {
    id: 5,
    questions:
      "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
    description:
      "Given two sorted linked lists, merge them so that the resulting list is also sorted.",
    inputTestCases: [
      { input: "[1,2,4], [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "[], []", output: "[]" },
      { input: "[], [0]", output: "[0]" },
    ],
    difficulty: "Medium",
  },
};
