# nextjs-interview / TodoApi

[![Open in Coder](https://dev.crunchloop.io/open-in-coder.svg)](https://dev.crunchloop.io/templates/fly-containers/workspace?param.Git%20Repository=git@github.com:crunchloop/nextjs-interview.git)

This is a simple Todo List API built in Nest JS and Typescript. This project is currently being used for Javascript/Typescript full-stack candidates.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Check integration tests at: (https://github.com/crunchloop/interview-tests)

## Contact

- Martín Fernández (mfernandez@crunchloop.io)

## About Crunchloop

![crunchloop](https://s3.amazonaws.com/crunchloop.io/logo-blue.png)

We strongly believe in giving back :rocket:. Let's work together [`Get in touch`](https://crunchloop.io/#contact).



---

# Project Overview

This project is a NestJS-based backend API designed to manage Todo Lists and integrate with the Claude AI assistant via an MCP (Model-Controller-Plugin) style interface. It allows manipulation of todo items through traditional REST endpoints and also via AI-generated commands.

## Main Components

### 1. Claude Module  
- **ClaudeService**: Handles communication with the Claude API by sending prompts and receiving AI-generated responses.  
- **ClaudeController**: Exposes an endpoint to send prompts to Claude and get responses.

### 2. Todo Items and Todo Lists Services  
- Services managing the core data of todo items and lists (CRUD operations, completion, updates, deletions).

### 3. MCP Module  
- **McpService**: Central service managing available "tools" (functionalities) that can be invoked dynamically.  
- **McpController**: Receives generic prompt-based requests specifying which tool to use and input parameters.  
- **McpToolsController**: Specifically handles AI natural language prompts by converting user text instructions into JSON commands to manipulate todo items.  
- **Tools Factory (`createTools`)**: Defines available tools, such as creating and completing todo items, and a special tool that sends free prompts to Claude.

## How It Works

1. The client sends an HTTP request to the MCP endpoints with a specified tool and input.  
2. The **McpService** dynamically selects the correct tool handler and executes it with the provided input.  
3. For todo item manipulations, the tools call appropriate methods on `TodoItemsService`.  
4. For AI integration, the tool sends prompts to Claude via `ClaudeService`, which communicates with the Claude API.  
5. The **McpToolsController** can receive natural language instructions, format a prompt for Claude to translate those instructions into a JSON command (e.g., create, update, complete, delete todo item), then execute the respective todo item operation.  
6. Results are returned to the client, either as the outcome of todo operations or AI responses.

## Summary

This architecture allows traditional RESTful operations on todo items and lists alongside intelligent AI-powered natural language processing. The AI can interpret commands and translate them into JSON operations to automate todo list management seamlessly.
