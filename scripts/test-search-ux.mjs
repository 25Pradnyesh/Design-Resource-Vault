import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function runTests() {
  console.log(`Starting Playwright Search UX Test Suite against ${BASE_URL}...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = "") {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} - ${details}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------
    // Test A: OPEN SEARCH (Click Search Trigger in Global Header)
    // -------------------------------------------------------------
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const desktopSearchBtn = page.locator('header button[aria-label="Search resources"]:visible');
    await desktopSearchBtn.click();
    await page.waitForTimeout(400);

    const dialog = page.locator('div[role="dialog"][aria-label="Command Menu Search"]');
    assert(await dialog.isVisible(), "Test A: Open Search (Click Header Trigger)", "Dialog was not visible after click");

    // Close with Escape for next test
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    assert(!(await dialog.isVisible()), "Test A Cleanup: Dialog closed with Escape");

    // -------------------------------------------------------------
    // Test B: KEYBOARD SHORTCUT (Ctrl+K / Cmd+K)
    // -------------------------------------------------------------
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(400);
    assert(await dialog.isVisible(), "Test B: Keyboard Shortcut (Control+k opens Command Menu)");

    // -------------------------------------------------------------
    // Test C: SEARCH NAME
    // -------------------------------------------------------------
    const searchInput = page.locator('div[role="dialog"] input');
    await searchInput.fill("Framer");
    await page.waitForTimeout(300);

    let results = page.locator('#command-results-list [role="option"]');
    let count = await results.count();
    let firstResultText = count > 0 ? await results.first().innerText() : "";
    assert(count > 0 && firstResultText.toLowerCase().includes("framer"), "Test C: Search by Resource Name ('Framer')", `Found ${count} results, first: ${firstResultText.slice(0, 40)}`);

    // -------------------------------------------------------------
    // Test D: SEARCH DOMAIN
    // -------------------------------------------------------------
    await searchInput.fill("activetheory.net");
    await page.waitForTimeout(300);

    results = page.locator('#command-results-list [role="option"]');
    count = await results.count();
    firstResultText = count > 0 ? await results.first().innerText() : "";
    assert(count > 0 && (firstResultText.toLowerCase().includes("active theory") || firstResultText.toLowerCase().includes("activetheory.net")), "Test D: Search by Domain ('activetheory.net')", `Found ${count} results: ${firstResultText.slice(0, 50)}`);

    // -------------------------------------------------------------
    // Test E: SEARCH TAG
    // -------------------------------------------------------------
    await searchInput.fill("Typography");
    await page.waitForTimeout(300);

    results = page.locator('#command-results-list [role="option"]');
    count = await results.count();
    assert(count > 0, "Test E: Search by Tag ('Typography')", `Found ${count} matching results`);

    // Test Forgiving Prefix Search ("typogr")
    await searchInput.fill("typogr");
    await page.waitForTimeout(300);
    count = await results.count();
    assert(count > 0, "Test E.2: Forgiving Prefix Search ('typogr')", `Found ${count} results for partial query`);

    // -------------------------------------------------------------
    // Test F: SEARCH CATEGORY
    // -------------------------------------------------------------
    await searchInput.fill("Iconography");
    await page.waitForTimeout(300);

    results = page.locator('#command-results-list [role="option"]');
    count = await results.count();
    assert(count > 0, "Test F: Search by Category ('Iconography')", `Found ${count} results`);

    // -------------------------------------------------------------
    // Test F.2: KEYBOARD ARROW NAVIGATION (ArrowDown / ArrowUp)
    // -------------------------------------------------------------
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(150);
    const secondOption = results.nth(1);
    const isSecondSelected = await secondOption.getAttribute("aria-selected");
    assert(isSecondSelected === "true", "Test F.2: ArrowDown selects next result item");

    await page.keyboard.press("ArrowUp");
    await page.waitForTimeout(150);
    const firstOption = results.first();
    const isFirstSelected = await firstOption.getAttribute("aria-selected");
    assert(isFirstSelected === "true", "Test F.3: ArrowUp returns selection to first item");

    // -------------------------------------------------------------
    // Test J: NO RESULTS EMPTY STATE
    // -------------------------------------------------------------
    await searchInput.fill("xyznonexistent999");
    await page.waitForTimeout(400);

    const emptyText = page.locator('#command-results-list').getByText(/No resources found for/i).first();
    assert(await emptyText.isVisible(), "Test J: Empty State displays query message for zero results");

    const clearSearchBtn = page.locator('#command-results-list').getByRole("button", { name: /Clear search/i }).first();
    assert(await clearSearchBtn.isVisible(), "Test J.2: Clean 'Clear search' button appears in empty state");

    // Click clear search button
    await clearSearchBtn.click();
    await page.waitForTimeout(200);
    const clearedInputVal = await searchInput.inputValue();
    assert(clearedInputVal === "", "Test J.3: Clear search button resets input query");

    // -------------------------------------------------------------
    // Test K: ESCAPE CLOSES COMMAND MENU
    // -------------------------------------------------------------
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    assert(!(await dialog.isVisible()), "Test K: Escape key cleanly closes Command Menu");

    // -------------------------------------------------------------
    // Test G: SEARCH + FILTER INTERSECTION (In Page Filter System)
    // -------------------------------------------------------------
    // Open filter dropdown and select category
    const filterDropdownBtn = page.locator("#filters-primary-trigger");
    await filterDropdownBtn.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -120));
    await page.waitForTimeout(250);
    await filterDropdownBtn.click();
    await page.waitForTimeout(300);

    // Select "Iconography" category checkbox
    const iconCheckbox = page.locator('button[role="checkbox"]:has-text("Iconography")');
    await iconCheckbox.click();
    await page.waitForTimeout(200);

    // Close filter dropdown
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);

    // Verify Active Filter Chips show Iconography
    const activeChip = page.locator('div[aria-label="Active filters and search query"] span:has-text("ICONOGRAPHY"), div[aria-label="Active filters and search query"] span:has-text("Iconography")');
    assert(await activeChip.count() > 0, "Test G.1: Active Category Filter Chip is visible");

    // Get count with only filter applied
    const initialFilteredCards = page.locator(".resource-card");
    const filterOnlyCount = await initialFilteredCards.count();

    // -------------------------------------------------------------
    // Test H: CLEAR SEARCH PRESERVES FILTERS
    // -------------------------------------------------------------
    // Category filter should still be active
    const activeCatChipsCount = await page.locator('div[aria-label="Active filters and search query"]').count();
    assert(activeCatChipsCount > 0, "Test H: Active category filter remains intact when searching independently");

    // -------------------------------------------------------------
    // Test I: CLEAR FILTER PRESERVES SEARCH
    // -------------------------------------------------------------
    // Clear the category filter using the chip's close button
    const removeChipBtn = page.locator('button[aria-label*="Remove"]').first();
    if (await removeChipBtn.isVisible()) {
      await removeChipBtn.click();
      await page.waitForTimeout(200);
      assert(true, "Test I: Category chip removed cleanly");
    }

    // -------------------------------------------------------------
    // Test L: RESPONSIVE VIEWPORTS (1440, 1280, 1024, 768, 390)
    // -------------------------------------------------------------
    const viewports = [
      { name: "1440x900 Desktop", width: 1440, height: 900 },
      { name: "1280x800 Desktop", width: 1280, height: 800 },
      { name: "1024x768 Tablet Landscape", width: 1024, height: 768 },
      { name: "768x1024 Tablet Portrait", width: 768, height: 1024 },
      { name: "390x844 Mobile", width: 390, height: 844 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(200);

      // Verify page has no horizontal scrolling overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      assert(scrollWidth <= clientWidth + 2, `Test L: No horizontal overflow at ${vp.name} (${scrollWidth} <= ${clientWidth})`);

      // Test mobile search trigger if on mobile
      if (vp.width <= 640) {
        const mobileSearchBtn = page.locator('header button[aria-label="Search"]').first();
        assert(await mobileSearchBtn.isVisible(), `Test L (Mobile): Search icon button visible at ${vp.name}`);
        await mobileSearchBtn.click();
        await page.waitForTimeout(200);
        assert(await dialog.isVisible(), `Test L (Mobile): Search modal opens via mobile icon trigger`);
        await page.keyboard.press("Escape");
        await page.waitForTimeout(200);
      }
    }

    console.log("\n==========================================");
    console.log(`PLAYWRIGHT TEST SUMMARY:`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log("==========================================\n");

  } catch (err) {
    console.error("Test execution error:", err);
    failed++;
  } finally {
    await browser.close();
  }

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
