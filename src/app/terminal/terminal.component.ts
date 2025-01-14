import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  standalone: true
})
export class TerminalComponent implements OnInit, OnDestroy {
  terminal: Terminal;
  fitAddon: FitAddon;
  inputBuffer: string = '';
  @Output() terminalClosed: EventEmitter<void> = new EventEmitter();

  constructor() {
    this.terminal = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#000000',
        foreground: '#00ff00',
      },
    });
    this.fitAddon = new FitAddon();
  }

  ngOnInit(): void {
    const terminalElement = document.getElementById('terminal');
    if (terminalElement) {
      this.terminal.loadAddon(this.fitAddon);
      this.terminal.open(terminalElement);
      this.fitAddon.fit();
      this.initializeCommands();
      this.makeTerminalDraggable()
    }
  }

  ngOnDestroy(): void {
    this.terminal.dispose();
  }

  makeTerminalDraggable(): void {
    const terminalWrapper = document.getElementById('terminalWrapper');
    const terminalHeader = document.getElementById('terminalHeader');

    if (terminalWrapper && terminalHeader) {
      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      terminalHeader.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - terminalWrapper.offsetLeft;
        offsetY = event.clientY - terminalWrapper.offsetTop;
        document.body.style.cursor = 'move';
      });

      document.addEventListener('mousemove', (event) => {
        if (isDragging) {
          const newX = event.clientX - offsetX;
          const newY = event.clientY - offsetY;
          terminalWrapper.style.left = `${newX}px`;
          terminalWrapper.style.top = `${newY}px`;
        }
      });

      document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
      });
    }
  }

  initializeCommands(): void {
    const directories: { [key: string]: string[] } = {
      home: ['projects', 'contact'],
      projects: ['Project 1', 'Project 2', 'Project 3'],
      contact: ['Oumaima Zerouali', 'oumaima.zerouali@gmail.com'],
    };

    let currentDirectory = 'home';

    this.terminal.writeln("Welcome to Oumaima's Portfolio Terminal!");
    this.terminal.writeln('Type "help" for a list of commands.');

    const updatePrompt = () => {
      this.terminal.write(`\r\nC:\\Users\\Oumaima\\${currentDirectory}> `);
    };

    updatePrompt();

    this.terminal.onData((input) => {
      if (input === '\r') {
        const command = this.inputBuffer.trim();
        this.inputBuffer = '';
        this.executeCommand(command, directories, currentDirectory);
      } else if (input === '\u007F') {
        this.inputBuffer = this.inputBuffer.slice(0, -1);
        this.terminal.write('\b \b');
      } else {
        this.inputBuffer += input;
        this.terminal.write(input);
      }
    });
  }

  executeCommand(command: string, directories: { [key: string]: string[] }, currentDirectory: string): void {
    switch (command) {
      case 'help':
        this.terminal.writeln('\r\nList of commands:');
        this.terminal.writeln('help - List available commands');
        this.terminal.writeln('ls - List files/directories in the current directory');
        break;

      case 'ls':
        if (directories[currentDirectory]) {
          this.terminal.writeln('\r\n' + directories[currentDirectory].join('\r\n'));
        } else {
          this.terminal.writeln(`\r\nNo files or directories found in ${currentDirectory}`);
        }
        break;

      case 'clear':
        this.terminal.clear();
        break;

      case 'exit':
        this.terminal.dispose();
        this.terminalClosed.emit();
        break;

      default:
        if (command.startsWith('cd ')) {
          const targetDir = command.split(' ')[1];
          if (directories[targetDir]) {
            currentDirectory = targetDir;

            if (targetDir === 'contact') {
              const email = 'oumaima.zerouali@gmail.com';
              window.location.href = `mailto:${email}`;
              this.terminal.writeln(`\r\nOpening email client to: ${email}`);
            }
            else if (targetDir === 'projects') {
              const githubUrl = 'https://github.com/OumaimaZerouali';
              window.open(githubUrl, '_blank');
              this.terminal.writeln(`\r\nOpening GitHub page: ${githubUrl}`);
            } else {
              this.terminal.writeln(`\r\nChanged directory to ${targetDir}`);
            }
          } else {
            this.terminal.writeln(`\r\nDirectory "${targetDir}" not found.`);
          }
        } else {
          this.terminal.writeln(`\r\n'${command}' is not recognized as an internal or external command.`);
        }
        break;
    }

    const updatePrompt = () => {
      this.terminal.write(`\r\nC:\\Users\\Oumaima\\${currentDirectory}> `);
    };

    updatePrompt();
  }
}
