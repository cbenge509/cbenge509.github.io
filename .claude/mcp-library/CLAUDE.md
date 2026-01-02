# MCP Library

MCP (Model Context Protocol) servers extend Claude's capabilities by providing access to external tools, APIs, and data sources.

## Usage

Generate a custom .mcp.json file with selected MCP servers:

```bash
./generate-mcp-config.sh <mcp-name1> <mcp-name2> ...
```

Available MCPs:

- `21st-dev-magic` - UI/UX development and design
- `zen` - Multi-model AI collaboration platform
- `chrome-devtools` - Interact with Chrome browser to verify fixes, test changes, debug CSS/layout, simulate user activity, and audit performance
- `context7` - Documentation search tool
- `github` - Manage github calls and workflows
- `playwright` - interact with web browsers and let LLM's "see" the UI - used to automate browser interactions programmatically to take screenshots, handle network requests, trace actions for debugging
- `sequential-thinking` - break down complex problems into a series of structured, sequential thoughts, fostering dynamic and reflective problem-solving
- `time` - gets the current date, time, and timezone information
