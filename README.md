# Hacker-Themed Portfolio Terminal

This is a hacker-themed portfolio website with an interactive terminal interface. Visitors can explore different sections of the portfolio (e.g., projects, contact information) using terminal commands. The application is built using **Angular** and styled for a unique, hacker-like experience.

## Features

- **Interactive Terminal Interface**: A terminal-like UI built with `xterm.js`.
- **Command-based Navigation**: Users can type commands like `help`, `ls`, and `cd` to navigate through the portfolio.
- **Draggable Terminal Window**: The terminal can be dragged across the screen for a personalized experience.
- **Custom Commands**:
  - `help`: Displays a list of available commands.
  - `ls`: Lists files/directories in the current directory.
  - `cd <directory>`: Changes the directory (e.g., to `projects` or `contact`).
  - `clear`: Clears the terminal screen.
  - `exit`: Closes the terminal.
- **Dynamic Links**:
  - Navigate to GitHub projects.
  - Open email client for contact.

## Tech Stack

- **Frontend**: Angular
- **Styling**: CSS
- **Terminal Library**: xterm.js
- **Hosting**: GitHub Pages

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/OumaimaZerouali/hacker-themed-portfolio.git
   cd hacker-themed-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application locally:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

## Deployment

This project is hosted on GitHub Pages. To build and deploy:

1. Build the application:
   ```bash
   ng build --configuration=production --output-path=dist/personalpage --base-href=/hacker-themed-portfolio/
   ```

2. Deploy to GitHub Pages:
   ```bash
   npx angular-cli-ghpages --dir=dist/personalpage
   ```

## Usage

### Commands

- `help`: View available commands.
- `ls`: List contents of the current directory.
- `cd <directory>`: Navigate to a specific directory (e.g., `projects`, `contact`).
- `clear`: Clear the terminal screen.
- `exit`: Close the terminal.

### Directory Structure

- **home**: Contains `projects` and `contact` directories.
- **projects**: Links to GitHub repositories.
- **contact**: Displays contact information and opens the email client.

## Known Issues

- Ensure all assets from `xterm.js` are correctly included in the build process.
- Compatibility with different browsers should be tested.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.


