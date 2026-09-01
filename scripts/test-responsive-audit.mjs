import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const SCREENSHOT_DIR = path.resolve("./screenshots");

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: "1440x900", width: 1440, height: 900, label: "1440 × 900 (Desktop Benchmark)" },
  { name: "1280x800", width: 1280, height: 800, label: "1280 × 800 (Normal Laptop)" },
  { name: "1024x768", width: 1024, height: 768, label: "1024 × 768 (Tablet Landscape / Small Laptop)" },
  { name: "768x1024", width: 768, height: 1024, label: "768 × 1024 (Tablet Portrait)" },
  { name: "390x844", width: 390, height: 844, label: "390 × 844 (Mobile)" },
];

async function runResponsiveAudit() {
  console.log("\n==================================================================");
  console.log("TASK 9 — COMPREHENSIVE RESPONSIVE & CROSS-VIEWPORT AUDIT");
  console.log(`Target: ${BASE_URL}`);
  console.log(`Screenshots Directory: ${SCREENSHOT_DIR}`);
  console.log("==================================================================\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;
  const resultsByViewport = {};

  function assert(vpName, condition, testName, details = "") {
    if (!resultsByViewport[vpName]) {
      resultsByViewport[vpName] = { passed: 0, failed: 0, issues: [] };
    }
    if (condition) {
      console.log(`  ✅ [PASS] [${vpName}] ${testName}`);
      passed++;
      resultsByViewport[vpName].passed++;
    } else {
      console.error(`  ❌ [FAIL] [${vpName}] ${testName} - ${details}`);
      failed++;
      resultsByViewport[vpName].failed++;
      resultsByViewport[vpName].issues.push({ testName, details });
    }
  }

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n------------------------------------------------------------------`);
      console.log(`AUDITING VIEWPORT: ${vp.label}`);
      console.log(`------------------------------------------------------------------`);

      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);

      // 1. GLOBAL HORIZONTAL OVERFLOW CHECK (HOMEPAGE)
      const homeOverflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          hasOverflow: doc.scrollWidth > doc.clientWidth,
        };
      });
      assert(
        vp.name,
        !homeOverflow.hasOverflow,
        "Zero Horizontal Page Overflow (Home)",
        `scrollWidth=${homeOverflow.scrollWidth}, clientWidth=${homeOverflow.clientWidth}`
      );

      // 2. HEADER CLEARANCE & COLLISION AUDIT
      const headerMetrics = await page.evaluate(() => {
        const header = document.querySelector("header");
        if (!header) return null;
        const leftMenu = header.querySelector("button[aria-label='Open Navigation Index Drawer']");
        const centerBrand = header.querySelector("a[aria-label='Design Resource Vault home']");
        const z20Containers = header.querySelectorAll(".relative.z-20");
        const rightActions = z20Containers.length > 1 ? z20Containers[z20Containers.length - 1] : null;

        const leftBox = leftMenu ? leftMenu.getBoundingClientRect() : null;
        const centerBox = centerBrand ? centerBrand.getBoundingClientRect() : null;
        const rightBox = rightActions ? rightActions.getBoundingClientRect() : null;

        const leftCenterGap = leftBox && centerBox ? centerBox.left - leftBox.right : null;
        const centerRightGap = centerBox && rightBox ? rightBox.left - centerBox.right : null;

        return {
          leftBox,
          centerBox,
          rightBox,
          leftCenterGap,
          centerRightGap,
          noLeftCollision: leftCenterGap !== null ? leftCenterGap > 0 : true,
          noRightCollision: centerRightGap !== null ? centerRightGap > 0 : true,
        };
      });

      assert(
        vp.name,
        headerMetrics && headerMetrics.noLeftCollision && headerMetrics.noRightCollision,
        "Header Brand Zero Collision (Left/Center/Right)",
        `Left-to-Center Gap: ${headerMetrics?.leftCenterGap?.toFixed(1)}px, Center-to-Right Gap: ${headerMetrics?.centerRightGap?.toFixed(1)}px`
      );

      // Capture Screenshot: Home Top
      const screenshotTopPath = path.join(SCREENSHOT_DIR, `${vp.name}_home_top.png`);
      await page.screenshot({ path: screenshotTopPath });
      console.log(`  📸 Saved Screenshot: ${vp.name}_home_top.png`);

      // 3. SCROLLED STATE & HEADER SCROLL-BLENDING
      await page.evaluate(() => window.scrollTo(0, 450));
      await page.waitForTimeout(300);

      const headerScrolledClass = await page.evaluate(() => {
        const header = document.querySelector("header");
        return header ? header.className : "";
      });

      assert(
        vp.name,
        headerScrolledClass.includes("backdrop-blur"),
        "Header Scroll Blending Active on Scroll",
        `Classes: ${headerScrolledClass.slice(0, 60)}...`
      );

      // Capture Screenshot: Home Scrolled
      const screenshotScrolledPath = path.join(SCREENSHOT_DIR, `${vp.name}_home_scrolled.png`);
      await page.screenshot({ path: screenshotScrolledPath });
      console.log(`  📸 Saved Screenshot: ${vp.name}_home_scrolled.png`);

      // 4. CATEGORY GRID AUDIT
      const categoryGridEl = page.locator("#categories");
      if (await categoryGridEl.count() > 0) {
        await categoryGridEl.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        const categoryGridColumns = await page.evaluate(() => {
          const grid = document.querySelector("#categories .category-card-item")?.parentElement;
          if (!grid) return null;
          const styles = getComputedStyle(grid);
          const raw = styles.gridTemplateColumns.trim();
          return raw ? raw.split(/\s+/).length : 0;
        });

        const expectedCols =
          vp.width >= 1280 ? 6 : vp.width >= 768 ? 4 : vp.width >= 640 ? 3 : 2;

        assert(
          vp.name,
          categoryGridColumns === expectedCols,
          `Category Grid Columns (${expectedCols} cols expected, got ${categoryGridColumns})`,
          `Actual columns: ${categoryGridColumns}`
        );

        // Capture Screenshot: Category Grid
        const screenshotCategoryPath = path.join(SCREENSHOT_DIR, `${vp.name}_category_grid.png`);
        await page.screenshot({ path: screenshotCategoryPath });
        console.log(`  📸 Saved Screenshot: ${vp.name}_category_grid.png`);
      }

      // 5. RESOURCE GRID & CARDS AUDIT
      const resourceCards = page.locator(".resource-card");
      const cardCount = await resourceCards.count();
      assert(vp.name, cardCount > 0, `Resource Grid Rendered (${cardCount} cards present)`);

      const cardMetrics = await page.evaluate(() => {
        const card = document.querySelector(".resource-card");
        if (!card) return null;
        const box = card.getBoundingClientRect();
        const title = card.querySelector("h3");
        const domain = card.querySelector("span.truncate");
        return {
          width: box.width,
          height: box.height,
          titleVisible: Boolean(title && title.innerText.trim()),
          domainVisible: Boolean(domain && domain.innerText.trim()),
        };
      });

      assert(
        vp.name,
        cardMetrics && cardMetrics.width >= 140 && cardMetrics.titleVisible && cardMetrics.domainVisible,
        "Resource Card Structure & Readability",
        `Card width=${cardMetrics?.width}px, height=${cardMetrics?.height}px`
      );

      // Capture Screenshot: Resource Grid
      const screenshotResourcePath = path.join(SCREENSHOT_DIR, `${vp.name}_resource_grid.png`);
      await page.screenshot({ path: screenshotResourcePath });
      console.log(`  📸 Saved Screenshot: ${vp.name}_resource_grid.png`);

      // 6. FILTER POPOVER RESPONSIVE AUDIT
      const filterBtn = page.locator("#filters-primary-trigger");
      await filterBtn.scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollBy(0, -120));
      await page.waitForTimeout(250);
      await filterBtn.click();
      await page.waitForTimeout(400);

      const popoverMetrics = await page.evaluate(() => {
        const panel = document.querySelector("#filters-popover-panel");
        if (!panel) return null;
        const box = panel.getBoundingClientRect();
        const docWidth = document.documentElement.clientWidth;
        return {
          width: box.width,
          height: box.height,
          left: box.left,
          right: box.right,
          withinViewport: box.left >= 0 && box.right <= docWidth + 2,
        };
      });

      assert(
        vp.name,
        popoverMetrics && popoverMetrics.withinViewport,
        "Filter Popover Contained Inside Viewport",
        `Left: ${popoverMetrics?.left?.toFixed(1)}px, Right: ${popoverMetrics?.right?.toFixed(1)}px (Viewport Width: ${vp.width}px)`
      );

      // Capture Screenshot: Filter Open
      const screenshotFilterPath = path.join(SCREENSHOT_DIR, `${vp.name}_filter_open.png`);
      await page.screenshot({ path: screenshotFilterPath });
      console.log(`  📸 Saved Screenshot: ${vp.name}_filter_open.png`);

      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      const isFilterPanelOpen = await page.locator("#filters-popover-panel").count();
      if (isFilterPanelOpen > 0) {
        await page.keyboard.press("Escape");
        await page.waitForTimeout(200);
      }

      // Scroll to top for Search & Sidebar
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      // 7. COMMAND MENU / SEARCH RESPONSIVE AUDIT
      if (vp.width < 640) {
        const mobileSearchBtn = page.locator('header button[aria-label="Search"]').first();
        await mobileSearchBtn.click();
      } else {
        await page.keyboard.press("Control+k");
      }
      await page.waitForTimeout(400);

      const commandMetrics = await page.evaluate(() => {
        const dialog = document.querySelector('div[role="dialog"][aria-label="Command Menu Search"] .spotlight-window');
        if (!dialog) return null;
        const box = dialog.getBoundingClientRect();
        const docWidth = document.documentElement.clientWidth;
        return {
          width: box.width,
          left: box.left,
          right: box.right,
          withinViewport: box.left >= 0 && box.right <= docWidth + 2,
        };
      });

      assert(
        vp.name,
        commandMetrics && commandMetrics.withinViewport,
        "Command Menu Search Window Fits Viewport",
        `Left: ${commandMetrics?.left}px, Right: ${commandMetrics?.right}px, Width: ${commandMetrics?.width}px`
      );

      // Capture Screenshot: Search Open
      const screenshotSearchPath = path.join(SCREENSHOT_DIR, `${vp.name}_search_open.png`);
      await page.screenshot({ path: screenshotSearchPath });
      console.log(`  📸 Saved Screenshot: ${vp.name}_search_open.png`);

      await page.keyboard.press("Escape");
      await page.waitForTimeout(350);

      // 8. SIDEBAR / DRAWER RESPONSIVE AUDIT
      const menuBtn = page.locator('header button[aria-label="Open Navigation Index Drawer"]').first();
      await menuBtn.click();
      await page.waitForTimeout(400);

      const sidebarMetrics = await page.evaluate(() => {
        const aside = document.querySelector("aside");
        if (!aside) return null;
        const box = aside.getBoundingClientRect();
        const docWidth = document.documentElement.clientWidth;
        return {
          width: box.width,
          withinViewport: box.width <= docWidth,
        };
      });

      assert(
        vp.name,
        sidebarMetrics && sidebarMetrics.withinViewport,
        "Sidebar Drawer Contained Inside Viewport",
        `Drawer width: ${sidebarMetrics?.width}px <= Viewport: ${vp.width}px`
      );

      // Capture Screenshot: Sidebar Open
      const screenshotSidebarPath = path.join(SCREENSHOT_DIR, `${vp.name}_sidebar_open.png`);
      await page.screenshot({ path: screenshotSidebarPath });
      console.log(`  📸 Saved Screenshot: ${vp.name}_sidebar_open.png`);

      // Close sidebar
      const closeSidebarBtn = page.locator("aside button[aria-label='Close Navigation Drawer']").first();
      if (await closeSidebarBtn.isVisible()) {
        await closeSidebarBtn.click();
      } else {
        await page.keyboard.press("Escape");
      }
      await page.waitForTimeout(350);

      // 9. OTHER ROUTES HORIZONTAL OVERFLOW CHECKS
      const otherRoutes = [
        { path: "/categories/ui-web-inspiration", name: "Category Page" },
        { path: "/favorites", name: "Favorites Page" },
        { path: "/resources/framer", name: "Resource Specification Page" },
      ];

      for (const route of otherRoutes) {
        await page.goto(`${BASE_URL}${route.path}`, { waitUntil: "networkidle" });
        await page.waitForTimeout(200);

        const routeOverflow = await page.evaluate(() => {
          const doc = document.documentElement;
          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            hasOverflow: doc.scrollWidth > doc.clientWidth,
          };
        });

        assert(
          vp.name,
          !routeOverflow.hasOverflow,
          `Zero Horizontal Overflow on ${route.name}`,
          `scrollWidth=${routeOverflow.scrollWidth}, clientWidth=${routeOverflow.clientWidth}`
        );
      }
    }

    console.log("\n==================================================================");
    console.log("FINAL PLAYWRIGHT AUDIT SUMMARY:");
    console.log(`Total Passed: ${passed}`);
    console.log(`Total Failed: ${failed}`);
    for (const [vp, data] of Object.entries(resultsByViewport)) {
      console.log(`  Viewport ${vp}: ${data.failed === 0 ? "PASS ✅" : "FAIL ❌"} (${data.passed} passed, ${data.failed} failed)`);
      if (data.issues.length > 0) {
        data.issues.forEach((iss) => console.log(`    - ${iss.testName}: ${iss.details}`));
      }
    }
    console.log("==================================================================\n");

  } catch (err) {
    console.error("Test suite execution failed:", err);
    failed++;
  } finally {
    await browser.close();
  }

  process.exit(failed > 0 ? 1 : 0);
}

runResponsiveAudit();
