import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const VIEWPORTS = [
  { name: "1440 × 900", width: 1440, height: 900 },
  { name: "1280 × 800", width: 1280, height: 800 },
  { name: "1024 × 768", width: 1024, height: 768 },
  { name: "768 × 1024", width: 768, height: 1024 },
  { name: "390 × 844", width: 390, height: 844 },
];

const ROUTES = [
  { path: "/", name: "Homepage" },
  { path: "/categories/ui-web-inspiration", name: "Category: UI / Web Inspiration" },
  { path: "/favorites", name: "Favorites Page" },
  { path: "/resources/framer", name: "Resource Detail: Framer" },
];

async function runAudit() {
  console.log(`\n==================================================`);
  console.log(`TASK 8: PLAYWRIGHT DESIGN SYSTEM & COLOR AUDIT`);
  console.log(`Target: ${BASE_URL}`);
  console.log(`==================================================\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = "") {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName} - ${details}`);
      failed++;
    }
  }

  try {
    // 1. Check Root Design System Tokens on DOM
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: "networkidle" });

    console.log(`\n--- 1. DESIGN TOKEN VERIFICATION ---`);
    const rootTokens = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        background: style.getPropertyValue("--background").trim(),
        textPrimary: style.getPropertyValue("--text-primary").trim(),
        textSecondary: style.getPropertyValue("--text-secondary").trim(),
        textMuted: style.getPropertyValue("--text-muted").trim(),
        border: style.getPropertyValue("--border").trim(),
        borderStrong: style.getPropertyValue("--border-strong").trim(),
        accent: style.getPropertyValue("--accent").trim(),
        accentPrimary: style.getPropertyValue("--accent-primary").trim(),
        accentSecondary: style.getPropertyValue("--accent-secondary").trim(),
        semanticSuccess: style.getPropertyValue("--semantic-success").trim(),
        semanticWarning: style.getPropertyValue("--semantic-warning").trim(),
        semanticError: style.getPropertyValue("--semantic-error").trim(),
      };
    });

    console.log("Extracted Root Tokens:", rootTokens);

    assert(["#FFF", "#FFFFFF"].includes(rootTokens.background.toUpperCase()), "Token: --background is #FFFFFF / #FFF", rootTokens.background);
    assert(rootTokens.textPrimary.toUpperCase() === "#0B132B", "Token: --text-primary is Deep Navy #0B132B", rootTokens.textPrimary);
    assert(rootTokens.accent.toUpperCase() === "#00C4CC", "Token: --accent is Cyan #00C4CC", rootTokens.accent);
    assert(rootTokens.accentPrimary.toUpperCase() === "#00C4CC", "Token: --accent-primary is Cyan #00C4CC", rootTokens.accentPrimary);
    assert(rootTokens.border.toUpperCase() === "#E2E8F0", "Token: --border is Light Border #E2E8F0", rootTokens.border);
    assert(rootTokens.semanticSuccess.toUpperCase() === "#10B981", "Token: --semantic-success is #10B981", rootTokens.semanticSuccess);
    assert(rootTokens.semanticWarning.toUpperCase() === "#F59E0B", "Token: --semantic-warning is #F59E0B", rootTokens.semanticWarning);
    assert(rootTokens.semanticError.toUpperCase() === "#E11D48", "Token: --semantic-error is #E11D48", rootTokens.semanticError);

    // 2. Viewport Matrix Checks across all 5 viewports
    console.log(`\n--- 2. RESPONSIVE VIEWPORT SUITE ---`);
    for (const vp of VIEWPORTS) {
      console.log(`\n[Testing Viewport: ${vp.name}]`);
      await page.setViewportSize({ width: vp.width, height: vp.height });

      for (const route of ROUTES) {
        await page.goto(`${BASE_URL}${route.path}`, { waitUntil: "networkidle" });
        await page.waitForTimeout(200);

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
          };
        });

        assert(
          overflow.scrollWidth <= overflow.clientWidth + 2,
          `${vp.name} on ${route.name}: No horizontal overflow (${overflow.scrollWidth} <= ${overflow.clientWidth})`
        );

        // Check header branding presence
        const brand = page.locator('header a[aria-label="Design Resource Vault home"]');
        assert(await brand.isVisible(), `${vp.name} on ${route.name}: Global header brand visible`);
      }
    }

    // 3. Component Interaction & State Checks
    console.log(`\n--- 3. COMPONENT AUDIT & ACCESSIBILITY ---`);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: "networkidle" });

    // Resource card styling check
    const firstCard = page.locator(".resource-card").first();
    assert(await firstCard.isVisible(), "Resource card is rendered");

    // Check Filter popover interaction
    const filterBtn = page.locator("#filters-primary-trigger");
    await filterBtn.click();
    await page.waitForTimeout(200);
    const filterPanel = page.locator("#filters-popover-panel");
    assert(await filterPanel.isVisible(), "Filter popover opens cleanly");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    assert(!(await filterPanel.isVisible()), "Filter popover closes with Escape");

    // Check Command Menu interaction
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(300);
    const commandDialog = page.locator('div[role="dialog"][aria-label="Command Menu Search"]');
    assert(await commandDialog.isVisible(), "Command Menu opens via shortcut");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(350);
    assert(!(await commandDialog.isVisible()), "Command Menu closes with Escape");

    console.log("\n==================================================");
    console.log(`AUDIT RESULTS:`);
    console.log(`  Passed: ${passed}`);
    console.log(`  Failed: ${failed}`);
    console.log("==================================================\n");

  } catch (err) {
    console.error("Test execution encountered an error:", err);
    failed++;
  } finally {
    await browser.close();
  }

  process.exit(failed > 0 ? 1 : 0);
}

runAudit();
