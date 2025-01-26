# JSON Hover Extension for VSCode

![Icon](./img/icon.png)

This is a Visual Studio Code extension that allows you to view and copy parsed JSON from string literals in your Go code. When hovering over a string literal, it will attempt to parse it as JSON and display it in a formatted manner. A "Copy" link will also be provided to easily copy the JSON content to your clipboard.

## Features

- Hover over Go string literals containing JSON data to see a parsed, formatted version of the JSON.
- Click the "Copy" link to copy the JSON value to your clipboard.

## Installation

1. While not published yet, you can install it manually:
   - Clone this repository to your local machine.
   - Open the project in VSCode.
   - Press `F5` to launch a new VSCode window with the extension loaded.

## Usage

1. Open a Go file in VSCode.
2. Hover over a string literal that contains JSON data.
3. A hover popup will appear displaying the parsed JSON with a "Copy" link.
4. Click the "Copy" link to copy the JSON content to your clipboard.

## Development

### Prerequisites

- Node.js
- VSCode

### Running the Extension Locally

1. Clone the repository to your local machine.
2. Open the project in VSCode.
3. Press `F5` to start debugging the extension.
4. This will open a new VSCode window with your extension installed, allowing you to test it.

### Build and Package

1. Run `vsce package` to create a `.vsix` file for distribution.

### Contribution

Feel free to fork the repository, open issues, and submit pull requests.

---

Let me know if you'd like to add anything else to this!


### Planned Features

- Add support for other languages
- Implement edit action for JSON
- Support multiline strings
- Improve JSON parsing
