# HENU PS IDE - Backend Implementation Contracts

## Current Status
Frontend-only implementation is complete with:
- Landing page with floating file extensions
- Workflow, Blog, and Resources pages with animations
- IDE interface (visual prototype)

## Frontend-Backend Integration Plan

### 1. IDE Workspace APIs

#### File Operations
```
GET /api/files/tree
- Returns file tree structure
- Response: { name, type, children[], path, language }

GET /api/files/content?path=<file_path>
- Returns file content
- Response: { content, language, path }

POST /api/files/create
- Body: { path, content, type }
- Creates new file/folder

PUT /api/files/update
- Body: { path, content }
- Updates file content

DELETE /api/files/delete?path=<file_path>
- Deletes file/folder
```

#### Terminal Operations
```
POST /api/terminal/execute
- Body: { command, workingDir }
- Executes shell command
- Response: { stdout, stderr, exitCode }

WS /api/terminal/stream
- WebSocket connection for real-time terminal interaction
```

### 2. Mocked Data to Replace

Currently in `/app/frontend/src/pages/IDE.jsx`:
- Static file tree (src/, backend/ folders)
- Hardcoded code sample in editor
- Mock terminal output

### 3. Backend Implementation Tasks

1. **File System Service** (`/app/backend/services/file_service.py`)
   - Read/write files in a sandboxed workspace
   - File tree traversal
   - File type detection

2. **Terminal Service** (`/app/backend/services/terminal_service.py`)
   - Execute bash commands safely
   - Stream output via WebSocket
   - Handle working directory context

3. **Models** (`/app/backend/models.py`)
   - FileNode (path, name, type, content)
   - TerminalSession (id, command, output)

4. **API Routes** (`/app/backend/routes/`)
   - file_routes.py
   - terminal_routes.py

### 4. Security Considerations
- Sandbox file operations to `/workspace` directory
- Whitelist allowed commands
- Rate limiting on command execution
- File size limits

### 5. Frontend Integration Changes

Files to update:
- `/app/frontend/src/pages/IDE.jsx` - Connect to real APIs
- Add axios calls for file operations
- Add WebSocket connection for terminal

## AI Assistant
Currently mock UI only. Real implementation would require:
- LLM integration (optional future feature)
- For now, keep as visual mockup
