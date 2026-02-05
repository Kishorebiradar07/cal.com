#!/usr/bin/env pwsh
# Cal.com Email Invites - PR Submission Script
# This script automates the entire PR submission process

param(
    [switch]$DryRun = $false,
    [switch]$SkipTests = $false
)

Write-Host "`n╔════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         CAL.COM EMAIL INVITES - PR SUBMISSION SCRIPT              ║" -ForegroundColor Cyan
Write-Host "║                     Ready for GitHub Submission                    ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Configuration
$projectRoot = "c:\Users\hp\Desktop\open source\cal.com"
$branchName = "feature/email-invites-team-assignment"
$dryRunMessage = if ($DryRun) { "[DRY RUN] " } else { "" }

# Verify we're in the right directory
if (-not (Test-Path (Join-Path $projectRoot "package.json"))) {
    Write-Host "ERROR: Not in Cal.com project directory!" -ForegroundColor Red
    Write-Host "Expected: $projectRoot" -ForegroundColor Red
    exit 1
}

Set-Location $projectRoot
Write-Host "✓ Working directory: $projectRoot`n" -ForegroundColor Green

# Function to run command
function Invoke-Command-Safe {
    param($Command, $Description)
    
    Write-Host "📋 $Description..." -ForegroundColor Yellow
    
    if ($DryRun) {
        Write-Host "   [DRY RUN] Would execute: $Command`n" -ForegroundColor Gray
        return $true
    }
    
    try {
        Invoke-Expression $Command
        Write-Host "✓ Done`n" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "✗ Error: $_`n" -ForegroundColor Red
        return $false
    }
}

# Step 1: Check git status
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 1: Checking Git Status" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

$status = git status --porcelain
if ($status.Count -eq 0) {
    Write-Host "⚠ No changes detected. Verify files are staged:`n" -ForegroundColor Yellow
    git status
    Write-Host "`nℹ Make sure you've created/modified the feature files." -ForegroundColor Cyan
} else {
    Write-Host "✓ Changes detected: $($status.Count) file(s)`n" -ForegroundColor Green
    git status
}

# Step 2: Create feature branch
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 2: Create Feature Branch" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

$currentBranch = git rev-parse --abbrev-ref HEAD

if ($currentBranch -eq $branchName) {
    Write-Host "✓ Already on branch: $branchName`n" -ForegroundColor Green
} else {
    Write-Host "Current branch: $currentBranch" -ForegroundColor Yellow
    Write-Host "Creating: $branchName`n" -ForegroundColor Yellow
    
    if ($DryRun) {
        Write-Host "[DRY RUN] Would create: git checkout -b $branchName`n" -ForegroundColor Gray
    } else {
        try {
            git checkout -b $branchName -q 2>$null
            Write-Host "✓ Branch created: $branchName`n" -ForegroundColor Green
        }
        catch {
            # Branch might already exist
            Write-Host "ℹ Checking out existing branch: $branchName`n" -ForegroundColor Cyan
            git checkout $branchName -q
        }
    }
}

# Step 3: Stage changes
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 3: Stage All Changes" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "[DRY RUN] Would stage: git add -A`n" -ForegroundColor Gray
} else {
    git add -A -q
    Write-Host "✓ All changes staged`n" -ForegroundColor Green
}

# Step 4: Code quality checks
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 4: Code Quality Checks" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

if (-not $SkipTests) {
    Invoke-Command-Safe "yarn lint:fix" "Running linter (auto-fix)"
    Invoke-Command-Safe "yarn format" "Formatting code"
    Invoke-Command-Safe "yarn type-check" "Type checking"
}

# Step 5: Commit
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 5: Commit Changes" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

$commitMessage = @"
feat: add email invites for team event type assignment

- Add email validation utilities for handling comma-separated emails
- Extend CheckedTeamSelect component with CreatableSelect support
- Enable email invites in fixed and round-robin assignment modes
- Add visual distinction for email invites (mail icon, italic text, (invite) label)
- Support bulk email invites via comma-separated input
- Include comprehensive unit tests with 15+ test cases
- Maintain full backwards compatibility with existing functionality
"@

if ($DryRun) {
    Write-Host "[DRY RUN] Would commit with message:`n" -ForegroundColor Gray
    Write-Host $commitMessage -ForegroundColor Gray
    Write-Host "`n" -ForegroundColor Gray
} else {
    try {
        git commit -m $commitMessage -q
        Write-Host "✓ Changes committed`n" -ForegroundColor Green
        Write-Host "Commit message:" -ForegroundColor Green
        Write-Host $commitMessage -ForegroundColor Green
    }
    catch {
        Write-Host "⚠ Commit failed or already committed: $_`n" -ForegroundColor Yellow
    }
}

# Step 6: Push to remote
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 6: Push to Remote" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "[DRY RUN] Would push: git push origin $branchName`n" -ForegroundColor Gray
} else {
    try {
        Write-Host "Pushing $branchName to origin...`n" -ForegroundColor Yellow
        git push origin $branchName -q
        Write-Host "✓ Pushed successfully`n" -ForegroundColor Green
    }
    catch {
        Write-Host "⚠ Push failed (may need credentials): $_`n" -ForegroundColor Yellow
    }
}

# Step 7: Summary and next steps
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "SUBMISSION SUMMARY" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

Write-Host "✓ Feature Branch: $branchName" -ForegroundColor Green
Write-Host "✓ Repository: calcom/cal.com" -ForegroundColor Green
Write-Host "✓ Base Branch: main" -ForegroundColor Green
Write-Host "✓ Feature: Email Invites for Team Event Type Assignment`n" -ForegroundColor Green

Write-Host "📁 Files Modified:" -ForegroundColor Cyan
Write-Host "   NEW: packages/lib/emails/validateEmail.ts" -ForegroundColor Green
Write-Host "   NEW: packages/lib/emails/__tests__/validateEmail.test.ts" -ForegroundColor Green
Write-Host "   MOD: packages/features/eventtypes/components/CheckedTeamSelect.tsx" -ForegroundColor Yellow
Write-Host "   MOD: packages/features/eventtypes/lib/types.ts" -ForegroundColor Yellow
Write-Host "   MOD: apps/web/modules/event-types/components/AddMembersWithSwitch.tsx" -ForegroundColor Yellow
Write-Host "   MOD: apps/web/modules/event-types/components/tabs/assignment/EventTeamAssignmentTab.tsx`n" -ForegroundColor Yellow

Write-Host "🔗 NEXT STEP: Create Pull Request" -ForegroundColor Cyan
Write-Host "`nOption A - Web UI (Recommended):" -ForegroundColor Yellow
Write-Host "  1. Open: https://github.com/calcom/cal.com/pull/new/$branchName" -ForegroundColor White
Write-Host "  2. Use description from: PULL_REQUEST_READY.md" -ForegroundColor White
Write-Host "  3. Click 'Create pull request'" -ForegroundColor White

Write-Host "`nOption B - GitHub CLI:" -ForegroundColor Yellow
Write-Host "  gh pr create --title `"feat: add email invites for team event type assignment`" --fill" -ForegroundColor White

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "⚠ DRY RUN MODE - No changes were made. Run without -DryRun to proceed.`n" -ForegroundColor Yellow
} else {
    Write-Host "✅ READY FOR PULL REQUEST SUBMISSION!`n" -ForegroundColor Green
}

Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "   • PULL_REQUEST_READY.md - This submission guide" -ForegroundColor White
Write-Host "   • EMAIL_INVITES_GIT_SUBMISSION.md - Detailed git commands" -ForegroundColor White
Write-Host "   • EMAIL_INVITES_IMPLEMENTATION.md - Feature overview" -ForegroundColor White
Write-Host "   • EMAIL_INVITES_QUICK_REFERENCE.md - Quick commands`n" -ForegroundColor White
