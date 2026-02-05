# Email Invites Feature - Git Submission Guide

## 🚀 Quick Submission Commands

Copy-paste these commands in sequence to submit your PR:

```bash
# 1. Create feature branch
git checkout -b feature/email-invites-team-assignment

# 2. Stage all changes
git add -A

# 3. Commit with clear message
git commit -m "feat: add email invites for team event type assignment

- Add email validation utilities
- Extend CheckedTeamSelect with CreatableSelect support
- Enable email invites in fixed and round-robin assignments
- Add visual distinction for email invites (mail icon, italic, (invite) label)
- Support comma-separated bulk email invites
- Include comprehensive unit tests
- Maintain full backwards compatibility"

# 4. Push to remote
git push origin feature/email-invites-team-assignment

# 5. Create PR on GitHub (UI or gh CLI)
gh pr create --title "feat: add email invites for team event type assignment" \
  --body "See EMAIL_INVITES_IMPLEMENTATION_COMPLETE.md for details"
```

---

## ✅ Pre-Submission Checklist

Run these before creating the PR:

```bash
# Type check
yarn type-check

# Lint and fix
yarn lint:fix

# Format code
yarn format

# Run tests
yarn test packages/lib/emails
yarn test packages/features/eventtypes

# Build verification
yarn build
```

---

## 📋 Files Modified Summary

```
NEW FILES:
  packages/lib/emails/validateEmail.ts
  packages/lib/emails/__tests__/validateEmail.test.ts

MODIFIED FILES:
  packages/features/eventtypes/components/CheckedTeamSelect.tsx
  packages/features/eventtypes/lib/types.ts
  apps/web/modules/event-types/components/AddMembersWithSwitch.tsx
  apps/web/modules/event-types/components/tabs/assignment/EventTeamAssignmentTab.tsx

DOCUMENTATION:
  EMAIL_INVITES_IMPLEMENTATION.md (setup guide)
  EMAIL_INVITES_IMPLEMENTATION_COMPLETE.md (final summary)
```

---

## 🔄 Sync with Latest Main

If main branch has updates:

```bash
# Fetch latest
git fetch origin main

# Rebase your changes
git rebase origin/main

# If conflicts, resolve them, then:
git add -A
git rebase --continue

# Force push to your branch
git push origin feature/email-invites-team-assignment -f
```

---

## 🧪 Manual Testing Walkthrough

Before submitting, manually test:

```bash
# 1. Start dev server
yarn dev

# 2. Navigate to:
# http://localhost:3000/teams/[your-team]/event-types

# 3. Click on any event type
# 4. Go to "Assignment" tab
# 5. Test the following:

# Test 1: Single Email
# - Type "test@example.com" in Fixed Hosts dropdown
# - Should appear with "(invite)" label
# - Should be italic
# - Should have mail icon

# Test 2: Multiple Emails
# - Type "user1@test.com, user2@test.com"
# - Both should be added
# - Both should have visual distinction

# Test 3: Invalid Email
# - Type "invalidemail"
# - Should not create option
# - Type "user@test.com, invalid, user2@test.com"
# - Only valid emails should be added

# Test 4: Duplicates
# - Try adding same email twice
# - Second attempt should be ignored
# - No duplicate should appear

# Test 5: Existing Members
# - If team member "john@example.com" exists
# - Try to add "john@example.com" as invite
# - Should prevent or convert appropriately

# Test 6: Save & Reload
# - Add email invites
# - Click Save
# - Reload page
# - Invites should persist
```

---

## 📝 PR Description (Copy-Paste Ready)

```markdown
## Feature: Email Invites for Team Event Type Assignment

### Description
Adds the ability to type email addresses directly in the team event-type assignment dropdown, enabling administrators to invite external team members without adding them as full team members first.

### Changes
- ✅ Email validation utilities with RFC 5322 format checking
- ✅ Extended `Host` and `CheckedSelectOption` types with email support  
- ✅ Converted `CheckedTeamSelect` to use `CreatableSelect`
- ✅ Email validation and duplicate prevention
- ✅ Comma-separated email parsing for bulk invites
- ✅ Visual distinction: mail icon + "(invite)" label + italic text
- ✅ Added to both fixed and round-robin host assignments
- ✅ Full unit test coverage

### Features
- 📧 Type emails directly in host selection dropdown
- 🔗 Comma-separated bulk invites: `user1@test.com, user2@test.com`
- ✨ Visual distinction with mail icon and italic styling
- 🛡️ Email validation + duplicate prevention
- 👥 Respects existing team member emails
- 🔄 Works with fixed hosts, round-robin, and host groups

### Type Safety
- ✅ Full TypeScript type safety
- ✅ Extended Host type with isEmailInvite and email fields
- ✅ Zero breaking changes

### Testing
- ✅ 15+ unit tests for validation
- ✅ Tests for comma-separated parsing
- ✅ Tests for duplicate detection
- ✅ Case-insensitive comparison tests

### Files Changed
- `packages/lib/emails/validateEmail.ts` (NEW)
- `packages/lib/emails/__tests__/validateEmail.test.ts` (NEW)
- `packages/features/eventtypes/components/CheckedTeamSelect.tsx`
- `packages/features/eventtypes/lib/types.ts`
- `apps/web/modules/event-types/components/AddMembersWithSwitch.tsx`
- `apps/web/modules/event-types/components/tabs/assignment/EventTeamAssignmentTab.tsx`

### Backwards Compatibility
✅ Fully backwards compatible - feature is additive only

### Related
Closes #XXXX (insert issue number)
```

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
yarn install

# Clear build cache
yarn clean
yarn build
```

### Type Errors
```bash
# Check for missing types
yarn type-check

# TypeScript might need cache clear
rm -rf .next
rm -rf .turbo
yarn build
```

### Test Failures
```bash
# Run specific test file
yarn test packages/lib/emails/validateEmail.test.ts

# Run with verbose output
yarn test --reporter=verbose

# Run with debug
yarn test --inspect-brk
```

### Linting Issues
```bash
# Auto-fix all issues
yarn lint:fix

# Check specific file
yarn lint apps/web/modules/event-types/components/AddMembersWithSwitch.tsx
```

---

## 📞 Quick Reference

**Main Implementation File**:  
`packages/lib/emails/validateEmail.ts`

**Component Integration**:  
`packages/features/eventtypes/components/CheckedTeamSelect.tsx`

**Type Updates**:  
`packages/features/eventtypes/lib/types.ts`

**Assignment Tab**:  
`apps/web/modules/event-types/components/tabs/assignment/EventTeamAssignmentTab.tsx`

**Tests**:  
`packages/lib/emails/__tests__/validateEmail.test.ts`

---

## ✨ Final Checklist

Before clicking "Create Pull Request":

- [ ] All files created/modified
- [ ] `yarn type-check` passes
- [ ] `yarn lint:fix` passes
- [ ] `yarn test` passes
- [ ] `yarn build` succeeds
- [ ] Manual testing completed
- [ ] PR title is clear
- [ ] PR description filled
- [ ] Branch name matches convention
- [ ] No merge conflicts
- [ ] Comments/documentation added
- [ ] No console errors/warnings

---

## 🎉 You're Ready!

Once all checks pass:

1. Push your branch
2. Create the PR on GitHub
3. Describe your changes using the template above
4. Link any related issues
5. Request reviewers (optional)
6. Let the CI pipeline run

**Congratulations on your contribution!** 🚀

---

## 📚 Additional Resources

- **Cal.com Contributing Guide**: https://github.com/calcom/cal.com/blob/main/CONTRIBUTING.md
- **Feature Documentation**: See EMAIL_INVITES_IMPLEMENTATION.md in workspace
- **Email Validation Docs**: packages/lib/emails/validateEmail.ts (inline comments)
- **Component Patterns**: Reference existing CheckedTeamSelect usage

---

## ⚡ Pro Tips

1. **Commit Early**: Push to remote frequently
2. **Keep Branch Updated**: Rebase with main regularly
3. **Clear PR Description**: Helps reviewers understand
4. **Link Issues**: Use "Closes #123" to auto-link
5. **Respond to Feedback**: PR reviews are collaborative

Good luck! 🍀
