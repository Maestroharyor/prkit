import type { PrTemplate } from '$lib/types';

export const BUILTIN_TEMPLATES: PrTemplate[] = [
	{
		id: 'simple',
		name: 'Simple',
		builtin: true,
		content: `## Summary

{{TITLE}}

## Changes

-

## Related Issue

{{TICKET_ID}}
Link: {{LINK}}`
	},
	{
		id: 'engineering',
		name: 'Engineering',
		builtin: true,
		content: `## Problem

{{TITLE}}

## Solution

Describe the approach taken to solve the problem.

## Changes

-

## Testing

- [ ] Unit tests added/updated
- [ ] Manual testing performed

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] No breaking changes

Refs: {{TICKET_ID}}
Link: {{LINK}}
Branch: \`{{BRANCH}}\``
	},
	{
		id: 'open-source',
		name: 'Open Source',
		builtin: true,
		content: `## Summary

{{TITLE}}

## Related Issue

Closes #{{TICKET_ID}}
Link: {{LINK}}

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable)

`
	},
	{
		id: 'bug-fix',
		name: 'Bug Fix',
		builtin: true,
		content: `## Bug Description

{{TITLE}}

## Steps to Reproduce

1.
2.
3.

## Expected Behavior

Describe what should happen.

## Actual Behavior

Describe what actually happens.

## Root Cause

Explain why the bug occurs.

## Fix

Describe the fix applied.

## Testing

- [ ] Verified fix resolves the issue
- [ ] No regression in related functionality
- [ ] Added test to prevent recurrence

Refs: {{TICKET_ID}}
Link: {{LINK}}`
	},
	{
		id: 'hotfix',
		name: 'Hotfix',
		builtin: true,
		content: `## Hotfix

{{TITLE}}

## Severity

- [ ] Critical (system down)
- [ ] High (major feature broken)
- [ ] Medium (degraded experience)

## Impact

Describe the user/system impact.

## Root Cause

Explain the root cause of the issue.

## Fix

Describe the fix applied.

## Rollback Plan

Steps to rollback if the fix causes issues:
1.

## Testing

- [ ] Fix verified in staging
- [ ] Smoke tests passed
- [ ] Monitoring alerts configured

Refs: {{TICKET_ID}}
Link: {{LINK}}
Branch: \`{{BRANCH}}\``
	},
	{
		id: 'refactoring',
		name: 'Refactoring',
		builtin: true,
		content: `## Refactoring

{{TITLE}}

## Motivation

Why is this refactoring needed?

## Before

Describe the current structure/approach.

## After

Describe the new structure/approach.

## Migration Steps

1.

## Checklist

- [ ] No behavior changes
- [ ] All existing tests pass
- [ ] Code is cleaner and more maintainable
- [ ] No breaking changes to public APIs

Refs: {{TICKET_ID}}
Link: {{LINK}}`
	},
	{
		id: 'security',
		name: 'Security',
		builtin: true,
		content: `## Security Fix

{{TITLE}}

## Vulnerability

Describe the vulnerability being addressed.

## Severity

- **CVSS Score**:
- **Classification**: (e.g., XSS, SQL Injection, CSRF)

## Fix

Describe the security fix applied.

## Verification

- [ ] Vulnerability no longer exploitable
- [ ] Security tests added
- [ ] No new attack vectors introduced
- [ ] Dependencies updated if applicable

Refs: {{TICKET_ID}}
Link: {{LINK}}`
	},
	{
		id: 'performance',
		name: 'Performance',
		builtin: true,
		content: `## Performance Improvement

{{TITLE}}

## Metric

What performance metric is being improved? (e.g., response time, memory usage, bundle size)

## Before

- Metric value:

## After

- Metric value:

## Approach

Describe the optimization approach.

## Testing

- [ ] Benchmarks added/updated
- [ ] No regression in other metrics
- [ ] Tested under realistic load

Refs: {{TICKET_ID}}
Link: {{LINK}}`
	},
	{
		id: 'breaking-change',
		name: 'Breaking Change',
		builtin: true,
		content: `## Breaking Change

{{TITLE}}

## What Breaks

Describe what existing functionality will stop working.

## Migration Guide

Steps for consumers to migrate:
1.

## Timeline

- **Deprecation notice**:
- **Removal date**:

## Checklist

- [ ] Migration guide is complete
- [ ] Deprecation warnings added
- [ ] Changelog updated
- [ ] Documentation updated

Refs: {{TICKET_ID}}
Link: {{LINK}}`
	},
	{
		id: 'database-migration',
		name: 'Database Migration',
		builtin: true,
		content: `## Database Migration

{{TITLE}}

## Migration Type

- [ ] Schema change (DDL)
- [ ] Data migration (DML)
- [ ] Both

## Schema Changes

Describe the schema modifications.

## Rollback SQL

\`\`\`sql
-- Rollback steps
\`\`\`

## Data Impact

- **Rows affected**:
- **Estimated duration**:
- **Downtime required**: Yes / No

## Checklist

- [ ] Migration tested on staging
- [ ] Rollback verified
- [ ] Backup taken before migration
- [ ] Indexes reviewed

Refs: {{TICKET_ID}}
Link: {{LINK}}`
	},
	{
		id: 'release',
		name: 'Release',
		builtin: true,
		content: `## Release

**Version**:

## Highlights

{{TITLE}}

-

## Breaking Changes

- None

## Upgrade Steps

1.

## Changelog

### Added
-

### Changed
-

### Fixed
-

### Removed
-

Refs: {{TICKET_ID}}
Link: {{LINK}}`
	},
	{
		id: 'dependency-update',
		name: 'Dependency Update',
		builtin: true,
		content: `## Dependency Update

{{TITLE}}

## Packages Updated

| Package | From | To |
|---------|------|-----|
|  |  |  |

## Breaking Changes

- None

## Changelog Links

-

## Checklist

- [ ] All tests pass with updated dependencies
- [ ] No breaking changes in updated packages
- [ ] Lock file updated
- [ ] Reviewed changelogs for security advisories

Refs: {{TICKET_ID}}
Link: {{LINK}}`
	}
];
