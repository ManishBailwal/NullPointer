export const languageTemplates = {
  c: {
    hello_world:
      '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    function:
      '#include <stdio.h>\n\nint my_function() {\n    return 42;\n}\n\nint main() {\n    int result = my_function();\n    printf("Result: %d\\n", result);\n    return 0;\n}',
  },
  cpp: {
    hello_world:
      '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
    function:
      '#include <iostream>\n\nint my_function() {\n    return 42;\n}\n\nint main() {\n    int result = my_function();\n    std::cout << "Result: " << result << std::endl;\n    return 0;\n}',
  },
  python: {
    hello_world: "print('Hello, World!')",
    function:
      "def my_function():\n    return 42\n\nresult = my_function()\nprint(f'Result: {result}')",
  },
  javascript: {
    hello_world: "console.log('Hello, World!');",
    function:
      "function myFunction() {\n    return 42;\n}\n\nconst result = myFunction();\nconsole.log(`Result: ${result}`);",
  },
  java: {
    hello_world:
      'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    function:
      'public class Main {\n    public static int myFunction() {\n        return 42;\n    }\n\n    public static void main(String[] args) {\n        int result = myFunction();\n        System.out.println("Result: " + result);\n    }\n}',
  },
};
