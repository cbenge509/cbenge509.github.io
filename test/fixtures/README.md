# Test Fixtures

Shared test data and mock objects for unit and integration tests.

## Directory Structure

```
test/fixtures/
├── content/           # Mock content for schema tests
│   └── (markdown files for testing content collections)
├── props/             # Component prop fixtures
│   ├── index.ts       # Barrel export
│   ├── project.ts     # Project-related fixtures
│   └── education.ts   # Education-related fixtures
└── README.md
```

## Usage

```typescript
import { createMockProject, mockProjects } from '../../test/fixtures/props';

// Use factory function for custom fixtures
const customProject = createMockProject({
  title: 'Custom Title',
  category: 'research',
});

// Use pre-defined fixtures
const builderProject = mockProjects.builder;
```

## Adding New Fixtures

1. Create a new file in the appropriate directory (`props/` or `content/`)
2. Export factory functions for flexible fixture creation
3. Export pre-defined fixtures for common test cases
4. Add export to the barrel file (`index.ts`)
