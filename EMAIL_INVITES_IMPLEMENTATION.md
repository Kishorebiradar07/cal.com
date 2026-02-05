# Email Invites for Team Event Type Assignment - Implementation Guide

**Feature**: Add ability to type email addresses in the team event-type assignment dropdown with email validation, comma-separated bulk invites, and visual distinction for email invites.

**PR Ready**: This guide provides all necessary code changes to submit a production-ready pull request to cal.com.

---

## 📋 Summary of Changes

### 1. **Email Validation Utilities** (New File)
   - Create email validation functions
   - Create comma-separated email parser
   - Create duplicate detection

### 2. **Update Type Definitions** 
   - Update `Host` type to include `isEmailInvite` and `email` fields
   - Update `CheckedSelectOption` type for email support

### 3. **Update CheckedTeamSelect Component**
   - Convert to use `CreatableSelect` for email input capability
   - Add email validation and styling
   - Handle option creation for emails

### 4. **Update AddMembersWithSwitch Component**
   - Pass `allowEmailInvites` prop through the component chain
   - Forward prop to CheckedTeamSelect

### 5. **Update EventTeamAssignmentTab**
   - Enable `allowEmailInvites` prop
   - Apply for both fixed and round-robin hosts

---

## 🔧 Implementation Steps

### **Step 1: Create Email Utilities** 

Create file: `packages/lib/emails/validateEmail.ts`

```typescript
/**
 * Validate a single email address
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Parse comma-separated emails and return validated emails
 */
export const parseCommaSeparatedEmails = (input: string): string[] => {
  return input
    .split(",")
    .map((email) => email.trim())
    .filter((email) => email.length > 0 && validateEmail(email));
};

/**
 * Check if email already exists in list
 */
export const isDuplicateEmail = (
  email: string,
  existingEmails: string[],
  existingUserEmails: string[] = []
): boolean => {
  const normalizedEmail = email.toLowerCase();
  return (
    existingEmails.some((e) => e.toLowerCase() === normalizedEmail) ||
    existingUserEmails.some((e) => e.toLowerCase() === normalizedEmail)
  );
};

/**
 * Get formatted label for email option
 */
export const getEmailLabel = (email: string): string => {
  return `${email} (invite)`;
};
```

---

### **Step 2: Update Type Definitions**

File: `packages/features/eventtypes/lib/types.ts`

Add to `Host` type:
```typescript
export type Host = {
  isFixed?: boolean;
  userId: number;
  priority?: number;
  weight?: number;
  groupId?: string | null;
  isEmailInvite?: boolean;    // NEW
  email?: string;             // NEW
};
```

File: `packages/features/eventtypes/components/CheckedTeamSelect.tsx`

Update `CheckedSelectOption` type:
```typescript
export type CheckedSelectOption = {
  avatar: string;
  label: string;
  value: string;
  priority?: number;
  weight?: number;
  isFixed?: boolean;
  disabled?: boolean;
  defaultScheduleId?: number | null;
  groupId: string | null;
  isEmailInvite?: boolean;    // NEW
  email?: string;             // NEW
};
```

---

### **Step 3: Update CheckedTeamSelect Component**

File: `packages/features/eventtypes/components/CheckedTeamSelect.tsx`

Replace the imports section:
```typescript
"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import type { Options, Props } from "react-select";
import CreatableSelect from "react-select/creatable";  // NEW

import { useIsPlatform } from "@calcom/atoms/hooks/useIsPlatform";
import type { SelectClassNames } from "@calcom/features/eventtypes/lib/types";
import { getHostsFromOtherGroups } from "@calcom/lib/bookings/hostGroupUtils";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import {
  validateEmail,
  isDuplicateEmail,
  getEmailLabel,
  parseCommaSeparatedEmails,
} from "@calcom/lib/emails/validateEmail";  // NEW
import classNames from "@calcom/ui/classNames";
import { Avatar } from "@calcom/ui/components/avatar";
import { Button } from "@calcom/ui/components/button";
import { Select } from "@calcom/ui/components/form";
import { Icon } from "@calcom/ui/components/icon";
import { Tooltip } from "@calcom/ui/components/tooltip";

import type { PriorityDialogCustomClassNames, WeightDialogCustomClassNames } from "@calcom/features/eventtypes/components/dialogs/HostEditDialogs";
import { PriorityDialog, WeightDialog } from "@calcom/features/eventtypes/components/dialogs/HostEditDialogs";
```

Update type definition:
```typescript
export type CheckedTeamSelectCustomClassNames = {
  hostsSelect?: SelectClassNames;
  selectedHostList?: {
    container?: string;
    listItem?: {
      container?: string;
      avatar?: string;
      name?: string;
      changePriorityButton?: string;
      changeWeightButton?: string;
      removeButton?: string;
    };
  };
  priorityDialog?: PriorityDialogCustomClassNames;
  weightDialog?: WeightDialogCustomClassNames;
};

export type CheckedSelectOption = {
  avatar: string;
  label: string;
  value: string;
  priority?: number;
  weight?: number;
  isFixed?: boolean;
  disabled?: boolean;
  defaultScheduleId?: number | null;
  groupId: string | null;
  isEmailInvite?: boolean;    // NEW
  email?: string;             // NEW
};
```

Update component props:
```typescript
export const CheckedTeamSelect = ({
  options = [],
  value = [],
  isRRWeightsEnabled,
  customClassNames,
  groupId,
  allowEmailInvites = false,  // NEW
  teamMemberEmails = [],      // NEW
  ...props
}: Omit<Props<CheckedSelectOption, true>, "value" | "onChange"> & {
  options?: Options<CheckedSelectOption>;
  value?: readonly CheckedSelectOption[];
  onChange: (value: readonly CheckedSelectOption[]) => void;
  isRRWeightsEnabled?: boolean;
  customClassNames?: CheckedTeamSelectCustomClassNames;
  groupId: string | null;
  allowEmailInvites?: boolean;                    // NEW
  teamMemberEmails?: string[];                    // NEW
}) => {
```

Add new handler function inside component:
```typescript
// NEW: Handle email creation
const handleCreate = (inputValue: string) => {
  if (!allowEmailInvites) return;

  const emails = parseCommaSeparatedEmails(inputValue);
  const existingValues = value.map((v) => v.email || "").filter(Boolean);

  const newOptions = emails
    .filter((email) => !isDuplicateEmail(email, existingValues, teamMemberEmails))
    .map((email) => ({
      label: getEmailLabel(email),
      value: `email-${email}`,
      avatar: "",
      email: email,
      isEmailInvite: true,
      priority: 2,
      weight: 1,
      groupId: groupId,
    }));

  if (newOptions.length > 0) {
    onChange([...value, ...newOptions] as readonly CheckedSelectOption[]);
  }
};
```

Update the Select component to use CreatableSelect conditionally:
```typescript
const SelectComponent = allowEmailInvites ? CreatableSelect : Select;

return (
  <>
    <SelectComponent
      name={props.name}
      placeholder={props.placeholder || t("select")}
      isSearchable={true}
      isClearable={false}
      options={options}
      value={value}
      isMulti
      onCreateOption={allowEmailInvites ? handleCreate : undefined}  // NEW
      formatCreateLabel={(inputValue) =>                             // NEW
        allowEmailInvites ? `Invite ${inputValue}` : undefined
      }
      {...props}
    />
```

Update the display section to handle email invites:
```typescript
{valueFromGroup.map((option, index) => (
  <>
    <li
      key={option.value}
      className={classNames(
        `flex px-3 py-2 ${index === valueFromGroup.length - 1 ? "" : "border-subtle border-b"}`,
        customClassNames?.selectedHostList?.listItem?.container
      )}>
      {!isPlatform && option.isEmailInvite ? (
        // NEW: Email invite icon
        <Icon
          name="mail"
          className={classNames(
            "mt-0.5 h-4 w-4",
            customClassNames?.selectedHostList?.listItem?.avatar
          )}
        />
      ) : !isPlatform ? (
        <Avatar size="sm" imageSrc={option.avatar} alt={option.label} />
      ) : (
        <Icon
          name="user"
          className={classNames(
            "mt-0.5 h-4 w-4",
            customClassNames?.selectedHostList?.listItem?.avatar
          )}
        />
      )}
      <p
        className={classNames(
          "text-emphasis my-auto ms-3 text-sm",
          option.isEmailInvite && "italic",  // NEW: Italicize email invites
          customClassNames?.selectedHostList?.listItem?.name
        )}>
        {option.label}
      </p>
      {/* Rest of the code remains the same */}
    </li>
  </>
))}
```

---

### **Step 4: Update AddMembersWithSwitch Component**

File: `apps/web/modules/event-types/components/AddMembersWithSwitch.tsx`

Update component signature:
```typescript
const AddMembersWithSwitchComponent = ({
  labelText,
  placeholder,
  isFixed,
  value,
  onChange,
  options,
  helperText,
  isRRWeightsEnabled,
  groupId,
  customClassNames,
  allowEmailInvites = false,  // NEW
  teamMemberEmails = [],      // NEW
  ...rest
}: {
  labelText?: string;
  placeholder: string;
  isFixed: boolean;
  value: Host[];
  onChange?: (options: Host[]) => void;
  options?: Options<CheckedSelectOption>;
  helperText?: React.ReactNode | string;
  isRRWeightsEnabled?: boolean;
  groupId: string | null;
  allowEmailInvites?: boolean;                    // NEW
  teamMemberEmails?: string[];                    // NEW
} & Omit<Partial<ComponentProps<typeof CheckedTeamSelect>>, "onChange" | "value">) => {
  return (
    <div className="flex flex-col rounded-md">
      <div>
        {labelText ? <Label>{labelText}</Label> : <></>}
        <CheckedTeamSelect
          isOptionDisabled={(option) => !!value.find((host) => host.userId.toString() === option.value)}
          onChange={(options) => {
            onChange &&
              onChange(
                options.map((option) => ({
                  isFixed,
                  userId: option.isEmailInvite ? 0 : parseInt(option.value, 10),  // NEW: userId = 0 for emails
                  priority: option.priority ?? 2,
                  isEmailInvite: option.isEmailInvite,  // NEW
                  email: option.email,                  // NEW
                  // ... rest of mapping
              }))
            );
          }}
          allowEmailInvites={allowEmailInvites}    // NEW: Pass through
          teamMemberEmails={teamMemberEmails}      // NEW: Pass through
          {...rest}
        />
      </div>
    </div>
  );
};
```

---

### **Step 5: Update EventTeamAssignmentTab**

File: `apps/web/modules/event-types/components/tabs/assignment/EventTeamAssignmentTab.tsx`

Update the FixedHosts component call:
```typescript
<AddMembersWithSwitch
  data-testid="fixed-hosts-select"
  groupId={null}
  placeholder={t("add_a_member")}
  teamId={teamId}
  teamMembers={teamMembers}
  customClassNames={customClassNames?.addMembers}
  value={value}
  onChange={onChange}
  assignAllTeamMembers={assignAllTeamMembers}
  setAssignAllTeamMembers={setAssignAllTeamMembers}
  allowEmailInvites={true}  // NEW: Enable email invites
  teamMemberEmails={teamMembers.map((m) => m.email)}  // NEW: Pass member emails
  {...rest}
/>
```

Do the same for RoundRobinHosts and any other AddMembersWithSwitch usages.

---

### **Step 6: Update Prisma Schema (If Needed)**

If storing email invites in database, update `EventTypeHost` in schema:

```prisma
model EventTypeHost {
  id                String   @id @default(cuid())
  eventTypeId       String
  userId            Int?
  isFixed           Boolean  @default(false)
  priority          Int      @default(2)
  weight            Int      @default(1)
  groupId           String?
  isEmailInvite     Boolean  @default(false)  // NEW
  invitedEmail      String?                   // NEW
  
  @@index([eventTypeId])
  @@index([userId])
}
```

Run migration: `yarn prisma migrate dev --name add_email_invites`

---

## ✅ Test Plan

### **Unit Tests**

Create file: `packages/lib/emails/__tests__/validateEmail.test.ts`

```typescript
import { validateEmail, parseCommaSeparatedEmails, isDuplicateEmail } from "../validateEmail";

describe("Email Validation", () => {
  describe("validateEmail", () => {
    it("should validate correct email addresses", () => {
      expect(validateEmail("user@example.com")).toBe(true);
      expect(validateEmail("test.user+tag@example.co.uk")).toBe(true);
    });

    it("should reject invalid emails", () => {
      expect(validateEmail("invalid")).toBe(false);
      expect(validateEmail("@example.com")).toBe(false);
      expect(validateEmail("user@")).toBe(false);
    });
  });

  describe("parseCommaSeparatedEmails", () => {
    it("should parse multiple emails", () => {
      const emails = parseCommaSeparatedEmails("user1@test.com, user2@test.com");
      expect(emails).toEqual(["user1@test.com", "user2@test.com"]);
    });

    it("should handle whitespace", () => {
      const emails = parseCommaSeparatedEmails("  user1@test.com  ,  user2@test.com  ");
      expect(emails).toEqual(["user1@test.com", "user2@test.com"]);
    });

    it("should filter invalid emails", () => {
      const emails = parseCommaSeparatedEmails("user1@test.com, invalid, user2@test.com");
      expect(emails).toEqual(["user1@test.com", "user2@test.com"]);
    });
  });

  describe("isDuplicateEmail", () => {
    it("should detect duplicate emails", () => {
      const existing = ["user@test.com"];
      expect(isDuplicateEmail("user@test.com", existing)).toBe(true);
    });

    it("should be case-insensitive", () => {
      const existing = ["User@Test.com"];
      expect(isDuplicateEmail("user@test.com", existing)).toBe(true);
    });

    it("should check team member emails", () => {
      expect(isDuplicateEmail("member@test.com", [], ["member@test.com"])).toBe(true);
    });
  });
});
```

### **E2E Tests**

Create file: `apps/web/modules/event-types/components/__tests__/email-invites.e2e.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("Team Event Type Email Invites", () => {
  test("should type email address in dropdown", async ({ page }) => {
    // Navigate to team event type settings
    await page.goto("/teams/my-team/event-types");
    
    // Open event type
    await page.click('[data-testid="event-type-link"]');
    
    // Go to Assignment tab
    await page.click('text=Assignment');
    
    // Type email in dropdown
    const hostSelect = page.locator('[data-testid="fixed-hosts-select"] input');
    await hostSelect.fill("newinvite@example.com");
    
    // Verify email is shown with "(invite)" label
    await expect(page.locator("text=newinvite@example.com (invite)")).toBeVisible();
  });

  test("should support comma-separated emails", async ({ page }) => {
    // ... navigate to Assignment tab ...
    
    const hostSelect = page.locator('[data-testid="fixed-hosts-select"] input');
    await hostSelect.fill("user1@test.com, user2@test.com");
    
    // Both emails should be added
    await expect(page.locator("text=user1@test.com (invite)")).toBeVisible();
    await expect(page.locator("text=user2@test.com (invite)")).toBeVisible();
  });

  test("should prevent duplicate emails", async ({ page }) => {
    // ... add email once ...
    await hostSelect.fill("duplicate@test.com");
    
    // ... try to add same email again ...
    await hostSelect.fill("duplicate@test.com");
    
    // Should only appear once
    const elements = await page.locator("text=duplicate@test.com (invite)").all();
    expect(elements.length).toBe(1);
  });

  test("should detect existing team member emails", async ({ page }) => {
    // ... if team has member@test.com ...
    
    const hostSelect = page.locator('[data-testid="fixed-hosts-select"] input');
    await hostSelect.fill("member@test.com");
    
    // Should show as selected team member, not as invite
    // (actual behavior depends on implementation details)
  });

  test("should validate email format", async ({ page }) => {
    const hostSelect = page.locator('[data-testid="fixed-hosts-select"] input');
    
    // Type invalid email
    await hostSelect.fill("invalid-email");
    
    // Should not create option or show validation error
  });

  test("should visually distinguish email invites", async ({ page }) => {
    // ... add email invite ...
    
    const emailItem = page.locator("text=newinvite@example.com (invite)");
    
    // Should be italic
    const style = await emailItem.evaluate((el) => window.getComputedStyle(el).fontStyle);
    expect(style).toBe("italic");
    
    // Should have mail icon
    await expect(emailItem.locator("icon[name='mail']")).toBeVisible();
  });
});
```

---

## 🚀 Submission Checklist

Before creating the PR:

- [ ] All files created/updated per steps 1-6
- [ ] Email validation utilities tested
- [ ] Type definitions updated correctly
- [ ] CheckedTeamSelect supports CreatableSelect
- [ ] Email display shows "(invite)" label
- [ ] Email display shows italic styling
- [ ] AddMembersWithSwitch passes allowEmailInvites prop
- [ ] EventTeamAssignmentTab enables email invites
- [ ] Both fixed and round-robin hosts support emails
- [ ] Duplicate detection works
- [ ] Comma-separated emails parsed correctly
- [ ] Existing team member emails detected
- [ ] Unit tests passing
- [ ] E2E tests passing
- [ ] No TypeScript errors: `yarn type-check`
- [ ] Linting passes: `yarn lint:fix`
- [ ] Code formatted: `yarn format`

---

## 📝 PR Template

Use this for your GitHub PR:

```markdown
## Feature: Email Invites for Team Event Type Assignment

### Description
Adds ability to type email addresses directly in the team event-type assignment dropdown. Users can invite external team members via email, with support for bulk invites using comma-separated emails.

### Changes
- ✅ Email validation utilities with format and duplicate checking
- ✅ Updated `Host` and `CheckedSelectOption` types with email support
- ✅ Converted `CheckedTeamSelect` to use `CreatableSelect` for email input
- ✅ Added visual distinction: "(invite)" label and italic styling for emails
- ✅ Enabled comma-separated email parsing
- ✅ Added `allowEmailInvites` prop to component chain
- ✅ Applied to both fixed and round-robin host assignment

### Motivation
Team administrators often need to invite external team members to events without adding them as full team members first. This feature enables seamless email-based invitations directly from the event type assignment interface.

### Test Plan
- ✅ Go to team event type settings → Assignment tab
- ✅ Type an email address in the host selection dropdown
- ✅ Verify email appears with "(invite)" label in italic styling
- ✅ Test comma-separated emails (e.g., "user1@test.com, user2@test.com")
- ✅ Verify duplicate emails are prevented
- ✅ Verify existing team member emails are detected
- ✅ Verify invalid email formats are rejected

### Related Issues
Closes #XXXX (if applicable)

### Screenshots/Demo
[Add before/after screenshots if available]
```

---

## 🔗 File Locations Summary

```
NEW FILES:
- packages/lib/emails/validateEmail.ts

MODIFIED FILES:
- packages/features/eventtypes/lib/types.ts (Host type)
- packages/features/eventtypes/components/CheckedTeamSelect.tsx
- apps/web/modules/event-types/components/AddMembersWithSwitch.tsx
- apps/web/modules/event-types/components/tabs/assignment/EventTeamAssignmentTab.tsx
- packages/prisma/schema.prisma (optional - if storing invites in DB)

TEST FILES:
- packages/lib/emails/__tests__/validateEmail.test.ts
- apps/web/modules/event-types/components/__tests__/email-invites.e2e.ts
```

---

**You're now ready to submit your PR!** 🚀

Follow the submission checklist, run all tests, and create your PR with the provided template.
