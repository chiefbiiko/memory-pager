import {
  assert,
  assertEquals
} from "https://deno.land/std@v0.38.0/testing/asserts.ts";

import { Pager, Page } from "./mod.ts";

Deno.test({
  name: "get page",
  fn(): void {
    const pages: Pager = new Pager(1024);
    const page: Page = pages.get(0);
    assertEquals(page.offset, 0);
    assertEquals(page.buffer, new Uint8Array(1024));
  }
});

Deno.test({
  name: "get page twice",
  fn(): void {
    const pages: Pager = new Pager(1024);
    assertEquals(pages.length, 0);
    const page: Page = pages.get(0);
    assertEquals(page.offset, 0);
    assertEquals(page.buffer, new Uint8Array(1024));
    assertEquals(pages.length, 1);
    const other: Page = pages.get(0);
    assertEquals(other, page);
  }
});

Deno.test({
  name: "get no mutable page",
  fn(): void {
    const pages: Pager = new Pager(1024);
    assert(!pages.get(141, true));
    assert(!!pages.get(141));
    assert(!!pages.get(141, true));
  }
});

Deno.test({
  name: "get far out page",
  fn(): void {
    const pages: Pager = new Pager(1024);
    const page: Page = pages.get(1000000);
    assertEquals(page.offset, 1000000 * 1024);
    assertEquals(page.buffer, new Uint8Array(1024));
    assertEquals(pages.length, 1000000 + 1);
    const other: Page = pages.get(1);
    assertEquals(other.offset, 1024);
    assertEquals(other.buffer, new Uint8Array(1024));
    assertEquals(pages.length, 1000000 + 1);
    assert(other !== page);
  }
});

Deno.test({
  name: "updates",
  fn(): void {
    const pages: Pager = new Pager(1024);
    assertEquals(pages.lastUpdate(), null);
    const page: Page = pages.get(10);
    page.buffer[42] = 1;
    pages.updated(page);
    assertEquals(pages.lastUpdate(), page);
    assertEquals(pages.lastUpdate(), null);
    page.buffer[42] = 2;
    pages.updated(page);
    pages.updated(page);
    assertEquals(pages.lastUpdate(), page);
    assertEquals(pages.lastUpdate(), null);
  }
});
